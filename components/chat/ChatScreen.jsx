import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import MessageThread from './MessageThread';
import MessageInput from './MessageInput';
import { AuthContext } from '../../context/AuthContext';
import { useQuery, useMutation } from '../../convex/_generated/react';

const ChatScreen = () => {
    const sendMessage = useMutation('sendMessage');

    const currentUser = useContext(AuthContext);
    const messages = useQuery('listMessagesByUser', currentUser);

    const handleSend = (message) => {
        sendMessage(currentUser, 'domibot', message);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <MessageThread messages={messages} user={currentUser} />
                    <MessageInput onSend={handleSend} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
});

export default ChatScreen;
