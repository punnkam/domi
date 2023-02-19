import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const ChatBubble = ({ message, isMine }) => {
    const bubbleStyles = isMine ? styles.myBubble : styles.otherBubble;
    const textStyles = isMine ? styles.myText : styles.otherText;
    return (
        <View style={styles.container}>
            <View style={[styles.bubble, bubbleStyles]}>
                <Text style={[styles.text, textStyles]}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // alignItems: 'flex-end',
        marginVertical: 5,
    },
    bubble: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxWidth: '80%',
    },
    myBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C5',
    },
    otherBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
    },
    myText: {
        color: '#000000',
    },
    otherText: {
        color: '#444444',
    },
});

export default ChatBubble;
