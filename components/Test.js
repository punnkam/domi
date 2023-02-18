import React from 'react';
import { useMutation, useQuery } from '../convex/_generated/react';
import { Text } from 'react-native';

export default function Test() {
    const allPayments = useQuery('getPayments') ?? 0;
    const makePayment = useMutation('makePayment');
    const payment = {
        from: 'testFrom',
        to: 'testTo',
        amount: 1000,
        purpose: 'testTxn'
    }
    // makePayment(payment);
    console.log(allPayments)
    console.log(allPayments[0]._id)
    return <Text>TEST</Text>;
}
