import { mutation } from './_generated/server';
import { Payment } from './types';

export default mutation(async ({ db }, body) => {
    const payment: Payment = body;
    await db.insert('payments', payment);
});
