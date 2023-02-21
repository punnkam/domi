import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ChatBubble from "./ChatBubble";

function compareBytime(timeA, timeB) {
  return timeB.timestamp - timeA.timestamp;
}

const MessageThread = ({ messages, user, isDomiResponding }) => {
  //   console.log("messages = ", messages);
  let sortedMessages = messages.sort(compareBytime);

  const renderChatBubble = ({ item }) => {
    const isMine = item.from.userId === user.userId;

    return <ChatBubble message={item.message} isMine={isMine} />;
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <FlatList
      data={sortedMessages}
      renderItem={renderChatBubble}
      keyExtractor={keyExtractor}
      inverted
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default MessageThread;
