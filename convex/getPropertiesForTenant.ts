import { query } from './_generated/server';

export default query(async ({ db }, tenantId: string) => {
    const properties = await db
        .query('properties')
        .order('desc')
        .filter((q) => q.eq(q.field('tenants'), tenantId))
        .collect();

    if (properties.length === 0) {
        return [];
    }

    return properties;
});
