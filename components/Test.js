import React from 'react';
import { useMutation, useQuery } from '../convex/_generated/react';
import { Text } from 'react-native';

export default function Test() {
    const makePayment = useMutation('makePayment') ?? 0;
    const payment = {
        from: 'testFrom',
        to: 'testTo',
        amount: 1000,
        purpose: 'testTxn'
    }
    makePayment(payment);
    return <Text>TEST</Text>;
}
