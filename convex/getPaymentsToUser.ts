import { query } from './_generated/server';

export default query(async ({ db }, userId: number) => {
    return await db
        .query('payments')
        .order('desc')
        .filter((q) => q.eq(q.field('to'), userId))
        .collect();
});
