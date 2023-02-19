import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ChatBubble from './ChatBubble';

const MessageThread = ({ messages, user }) => {
    const renderChatBubble = ({ item }) => {
        const isMine = item.user.id === user.id;
        return (
            <ChatBubble
                message={item.message}
                timestamp={item.timestamp}
                isMine={isMine}
                avatar={item.user.avatar}
            />
        );
    };

    const keyExtractor = (item) => item.id;

    return (
        <FlatList
            data={messages}
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
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});

export default MessageThread;
