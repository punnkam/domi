import { mutation } from './_generated/server';
import { Payment } from '../utils/types';
import { PaymentStatus } from '../utils/types';

export default mutation(async ({ db }, from, to, amount, purpose) => {
    if (from === to) {
        throw new Error('Cannot make a payment to yourself');
    } else if (amount <= 0) {
        throw new Error('Cannot make a payment of $0 or less');
    }

    const payment: Payment = {
        from: from,
        to: to,
        amount: amount,
        purpose: purpose,
        status: PaymentStatus.PENDING,
    };
    await db.insert('payments', payment);
});
