import { mutation } from './_generated/server';
import { Property } from '../utils/types';
import { apartmentImgIds, houseImgIds } from '../utils/constants';

export default mutation(
    async ({ db }, name, type, address, owner, rent, tenants, imageURI) => {
        // add imageURI to property

        for (const tenant of tenants) {
            const userOrNull = await db
                .query('users')
                .filter((q) => q.eq(q.field('email'), tenant))
                .first();
            if (userOrNull) {
                // TODO: send out email to tenant to tell them to join Domi
            }
        }

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
