import { mutation } from './_generated/server';
import { Payment } from '../utils/types';
import { PaymentStatus } from '../utils/types';

export default mutation(async ({ db }, from, to, amount, purpose) => {
    const payment: Payment = {
        from: from,
        to: to,
        amount: amount,
        purpose: purpose,
        status: PaymentStatus.PENDING,
    };
    await db.insert('payments', payment);
});
