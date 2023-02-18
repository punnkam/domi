import { query } from './_generated/server';

export default query(async ({ db }, user: string) => {
    return await db
        .query('payments')
        .order('desc')
        .filter((q) => q.eq(q.field('to'), user))
        .collect();
});
