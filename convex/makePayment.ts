import { mutation } from './_generated/server';

interface Payment {
    amount: number;
}

export default mutation(async ({ db }, body, author) => {
    const message = { body, author };
    await db.insert('messages', message);
});
