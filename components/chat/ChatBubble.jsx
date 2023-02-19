import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar } from "@rneui/themed";
import Domi from "../../assets/domi.png";
import TenantProfile from "../../assets/tenant-profile.png";

const ChatBubble = ({ message, isMine }) => {
  const bubbleStyles = isMine ? styles.myBubble : styles.otherBubble;
  const textStyles = isMine ? styles.myText : styles.otherText;

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: isMine ? "row-reverse" : "row",
      }}
    >
      <Avatar size={30} rounded source={isMine ? TenantProfile : Domi} />
      <View style={[styles.bubble, bubbleStyles]}>
        <Text style={[styles.text, textStyles]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-end',
    marginVertical: 5,
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: "80%",
  },
  myBubble: {
    backgroundColor: "#EFF7FF",
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  myText: {
    color: "#000000",
  },
  otherText: {
    color: "#444444",
  },
});

export default ChatBubble;
