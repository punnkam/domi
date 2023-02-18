import { mutation } from './_generated/server';
import { Property } from './types';

export default mutation(
    async ({ db }, name, address, owner, rent, tenants, securityDeposit) => {
        const property: Property = {
            name: name,
            address: address,
            owner: owner,
            rent: rent,
            tenants: tenants,
            securityDeposit: securityDeposit,
        };
        await db.insert('properties', property);
    }
);
