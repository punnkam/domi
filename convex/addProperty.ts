import { mutation } from './_generated/server';
import { Property } from '../common/types';
import { apartmentImgIds } from '../common/constants';

export default mutation(
    async (
        { db, storage },
        name,
        type,
        address,
        owner,
        rent,
        tenants,
        securityDeposit
    ) => {
        const totalApartments = await db
            .query('properties')
            .filter((q) => q.eq(q.field('owner'), owner))
            .collect();
        const newURI = await storage.getUrl(
            apartmentImgIds[totalApartments.length % apartmentImgIds.length]
        );
        // add imageURI to property
        const property: Property = {
            name: name,
            type: type,
            address: address,
            owner: owner,
            rent: rent,
            tenants: tenants,
            securityDeposit: securityDeposit,
            imageURI: newURI,
        };
        await db.insert('properties', property);
    }
);
