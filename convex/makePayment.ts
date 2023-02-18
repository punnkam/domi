import { mutation } from './_generated/server';
import { Payment } from '../common/types';

export default mutation(async ({ db }, from, to, amount, purpose) => {
    const payment: Payment = {
        from: from,
        to: to,
        amount: amount,
        purpose: purpose,
    };
    await db.insert('payments', payment);
});
