import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionsScreen from './Transactions';

const Stack = createNativeStackNavigator();

export default function TxnStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Transaction History'
                component={TransactionsScreen}
            />
        </Stack.Navigator>
    );
}
