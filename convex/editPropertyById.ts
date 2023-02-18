import { mutation } from './_generated/server';
import { Id } from './_generated/dataModel';
import { Property } from '../utils/types';

export default mutation(
    async (
        { db },
        id: Id<string>,
        name,
        address,
        owner,
        rent,
        securityDeposit,
        tenants
    ) => {
        return await db.patch(id, {
            name: name,
            address: address,
            owner: owner,
            rent: rent,
            securityDeposit: securityDeposit,
            tenants: tenants,
        });
    }
);
