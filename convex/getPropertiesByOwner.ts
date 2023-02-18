import { query } from './_generated/server';

export default query(async ({ db }, owner: string) => {
    const properties = await db
        .query('properties')
        .order('desc')
        .filter((q) => q.eq(q.field('owner'), owner))
        .collect();

    if (properties.length === 0) {
        return [];
    }

    return properties;
});
