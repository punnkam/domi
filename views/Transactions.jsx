import React, { useState, useContext } from 'react';
import { Button, View, StyleSheet, TextInput, Alert } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useQuery, useMutation } from '../convex/_generated/react';
import { AuthContext } from '../context/AuthContext';
import DropDownPicker from 'react-native-dropdown-picker';
import TransactionCard from '../components/TransactionCard';

const API_URL = 'https://domi-server-production.up.railway.app';

export default function TransactionsScreen() {
    const [email, setEmail] = useState('');
    const [cardDetails, setCardDetails] = useState('4242 4242 4242 4242');
    const [amount, setAmount] = useState('');
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        console.log('fetchPaymentIntentClientSecret called');
        const response = await axios
            .post(`${API_URL}/create-payment-intent`)
            .then((res) => res.data)
            .catch((error) => console.log('error = ', error));
        return !response
            ? { error: true }
            : { clientSecret: response.clientSecret };
    };

    const [openDD, setOpenDD] = useState(false);
    const [valueDD, setValueDD] = useState(null);

    const userId = useContext(AuthContext).userId;
    const makePayment = useMutation('makePayment');
    const name = useQuery('getName', userId);
    const paymentsFromUser = useQuery('getPaymentsFromUser', userId);
    const paymentsToUser = useQuery('getPaymentsToUser', userId);

    // combine paymentsFromUser and paymentsToUser by making a new array where the amounts from
    // the paymentsToUser are negative and the amounts from paymentsFromUser are positive
    if (!paymentsFromUser || !paymentsToUser) return null;
    const payments = paymentsFromUser
        .concat(paymentsToUser)
        .map((payment) => {
            if (payment.from === userId) {
                return {
                    ...payment,
                    amount: payment.amount * -1,
                };
            } else {
                return payment;
            }
        })
        .sort((a, b) => b.timestamp - a.timestamp);

    const handlePayPress = async () => {
        console.log('Payment pressed!');
        // 1. Gather the customer's billing information (e.g., email)
        // if (!cardDetails?.complete || !email) {
        //   Alert.alert("Please enter Complete card details and Email");
        //   return;
        // }
        const billingDetails = { email };
        // 2. Fetch the intent client secret from your backend
        try {
            const { clientSecret, error } =
                await fetchPaymentIntentClientSecret();
            if (error) console.log('Unable to process payment');
            else {
                console.log(
                    'within handlePayPress, clientSecret = ',
                    clientSecret
                );
                const { paymentIntent, error } = await confirmPayment(
                    clientSecret,
                    {
                        paymentMethodType: 'Card',
                        billingDetails,
                    }
                );
                console.log('paymentIntent = ', paymentIntent);
                if (error) {
                    Alert.alert(
                        `Payment Confirmation Error ${error.message}. Error code: ${error.code}`
                    );
                } else if (paymentIntent) {
                    Alert.alert('Payment Successful');
                }

                const toUserId = 1;

                makePayment(userId.userId, toUserId, parseInt(amount), 'rent');
            }
        } catch (error) {
            console.log('error from handlePayPress = ', error);
        }
        // 3. Confirm the payment with the card details.
    };

    return userId === 1 ? (
        payments.map((payment, index) => {
            return (
                <TransactionCard
                    key={index}
                    name={payment.purpose}
                    amount={payment.amount}
                    timestamp={payment._creationTime}
                />
            );
        })
    ) : (
        <View style={styles.container}>
            {/* <DropDownPicker
                open={openDD}
                setOpen={setOpenDD}
                value={valueDD}
                setValue={setValueDD}
                items={propertyNames}
                style={{ backgroundColor: '#f5f5f5', textColor: '#000' }}
                placeholder='Select a property'
            /> */}
            <TextInput
                placeholder='Enter an amount'
                keyboardType='numeric'
                onChange={(value) => setAmount(value.nativeEvent.text)}
                style={styles.input}
            />

            <TextInput
                autoCapitalize='none'
                placeholder='Enter recipient email'
                keyboardType='email-address'
                onChange={(value) => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
            <CardField
                postalCodeEnabled={true}
                placeholder={{ number: '4242 4242 4242 4242' }}
                cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
                style={{ width: '100%', height: 50, marginVertical: 30 }}
                onCardChange={(cardDetails) => setCardDetails(cardDetails)}
                onFocus={(focusedField) =>
                    console.log('focusField', focusedField)
                }
            />
            <Button onPress={handlePayPress} disabled={loading} title='Pay' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderColor: '#000000',
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        marginVertical: 10,
    },
    card: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'black',
    },
    cardContainer: {
        height: 50,
        marginalVertical: 30,
        backgroundColor: 'red',
    },
});
