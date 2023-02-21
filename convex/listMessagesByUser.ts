import { query } from './_generated/server';
import { Message } from '../utils/types';

export default query(async ({ db }, user: string): Promise<Message[]> => {
    return await db
        .query('chats')
        .order('desc')
        .filter((q) => q.eq(q.field('from'), user) || q.eq(q.field('to'), user))
        .collect();
});
