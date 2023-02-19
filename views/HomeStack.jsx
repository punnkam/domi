import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProperty from './AddProperty';
import HomeScreen from './HomeScreen';
import Property from './Property';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Properties' component={HomeScreen} />
            <Stack.Screen name='Add Property' component={AddProperty} />
            <Stack.Screen name='Property' component={Property} />
        </Stack.Navigator>
    );
}
