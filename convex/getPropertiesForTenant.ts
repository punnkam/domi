import { query } from './_generated/server';

export default query(async ({ db }, tenantId: number) => {
    const email = await db
        .query('users')
        .filter((q) => q.eq(q.field('userId'), tenantId))
        .collect();
    const properties = await db.query('properties').order('desc').collect();

    const propertiesForTenant: any = [];

    // console.log(tenantId);

    if (email) {
        for (const prop of properties) {
            // if (prop.tenants.includes(email[0].email)) {
            //     console.log(prop);
            //     propertiesForTenant.push(prop);
            // }
        }
    }

    return propertiesForTenant;
});
