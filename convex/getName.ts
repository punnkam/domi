import { query } from './_generated/server';

export default query(async ({ db }, email: string) => {
    return await db
        .query('users')
        .filter((q) => q.eq(q.field('email'), email))
        .unique();
});
