import React, { useState } from "react";
import { Text, Button, View, StyleSheet, TextInput, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { useAction } from "../convex/_generated/react";

const API_URL =
  "https://domi-server-production.up.railway.app/create-payment-intent";

export default function TransactionsScreen() {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState("4242 4242 4242 4242");
  const { confirmPayment, loading } = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async () => {
    console.log("fetchPaymentIntentClientSecret called");
    await axios
      .post(API_URL)
      .then((res) => console.log("res = ", res))
      .catch((err) => console.log(err));
    console.log("Worked!");
  };

  const handlePayPress = async () => {
    console.log("Payment pressed!");
    // 1. Gather the customer's billing information (e.g., email)
    // if (!cardDetails?.complete || !email) {
    //   Alert.alert("Please enter Complete card details and Email");
    //   return;
    // }
    const billingDetails = { email };
    // 2. Fetch the intent client secret from your backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) console.log("Unable to process payment");
      else {
        console.log("within handlePayPress, clientSecret = ", clientSecret);
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (error) {}
    // 3. Confirm the payment with the card details.
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{ number: "4242 4242 4242 4242" }}
        cardStyle={{ backgroundColor: "#FFFFFF", textColor: "#000000" }}
        style={{ width: "100%", height: 50, marginVertical: 30 }}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
        onFocus={(focusedField) => console.log("focusField", focusedField)}
      />
      <Button onPress={handlePayPress} disabled={loading} title="Pay" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "red",
    borderColor: "#000000",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
  },
  cardContainer: {
    height: 50,
    marginalVertical: 30,
    backgroundColor: "red",
  },
});
