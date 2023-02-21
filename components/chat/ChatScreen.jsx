import React, { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MessageThread from "./MessageThread";
import MessageInput from "./MessageInput";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation } from "../../convex/_generated/react";
import axios from "axios";

const ChatScreen = () => {
  const [isDomiResponding, setIsDomiResponding] = useState(false);
  const sendMessage = useMutation("sendMessage");

  const currentUser = useContext(AuthContext);
  const domiMessages = useQuery("listMessagesByUser", { userId: -1 });
  const userMessages = useQuery("listMessagesByUser", currentUser);
  if (!domiMessages || !userMessages) return <ActivityIndicator />;

  const messages = [...domiMessages, ...userMessages];
  const messagesHistory = messages.map((m) => m.message);

  const askDomiBot = async (message) => {
    const response = await axios
      .post("https://6b4a-171-66-13-193.ngrok.io/chatbot", {
        text: message,
        history: [],
        // history: messagesHistory,
      })
      .then((res) => {
        console.log(res?.data?.answer);
        return res?.data?.answer;
      })
      .catch((error) => console.log(error));
    return !response ? { error: true } : { response };
  };

  const handleSend = async (message) => {
    sendMessage(currentUser, "domibot", message);
    console.log("currentUser = ", currentUser);
    setIsDomiResponding(true);
    const { error, response } = await askDomiBot(message);
    setIsDomiResponding(false);
    if (error)
      sendMessage(
        { userId: -1 },
        "-1",
        "Sorry, I couldn't help you with that. Please contact your landlord for more information"
      );
    else sendMessage({ userId: -1 }, "-1", response);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <MessageThread
            messages={messages}
            user={currentUser}
            isDomiResponding={isDomiResponding}
          />
          <MessageInput onSend={handleSend} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
});

export default ChatScreen;
