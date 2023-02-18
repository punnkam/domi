import React from 'react';
import { useMutation, useQuery } from '../convex/_generated/react';
import { Text } from 'react-native';

export default function Test() {
    const counter = useQuery('makePayment') ?? 0;
    console.log(counter);
    return <Text>{counter[0].amount}</Text>;
}
