import { mutation } from './_generated/server';
import { Property } from '../utils/types';
import { apartmentImgIds, houseImgIds } from '../utils/constants';

export default mutation(
    async ({ db }, name, type, address, owner, rent, tenants, imageURI) => {
        // add imageURI to property

        const property: Property = {
            name: name,
            type: type,
            address: address,
            owner: owner,
            rent: rent,
            tenants: tenants,
            imageURI: imageURI,
        };
        await db.insert('properties', property);
    }
);
