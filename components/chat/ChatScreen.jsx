import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MessageThread from './MessageThread';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

const ChatScreen = ({ chatPartner }) => {
    const [messages, setMessages] = useState([]);

    const handleSend = (message) => {
        const newMessage = {
            id: messages.length,
            user: {
                id: 1, // current user ID
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            message: message,
            timestamp: Date.now(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader chatPartner={chatPartner} />
            <MessageThread messages={messages} user={currentUser} />
            <MessageInput onSend={handleSend} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default ChatScreen;
