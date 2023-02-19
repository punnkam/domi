import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const ChatBubble = ({ message, timestamp, isMine, avatar }) => {
    const bubbleStyles = isMine ? styles.myBubble : styles.otherBubble;
    const textStyles = isMine ? styles.myText : styles.otherText;

    return (
        <View style={styles.container}>
            {!isMine && (
                <Image style={styles.avatar} source={{ uri: avatar }} />
            )}
            <View style={[styles.bubble, bubbleStyles]}>
                <Text style={[styles.text, textStyles]}>{message}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
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
    timestamp: {
        fontSize: 12,
        lineHeight: 16,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
});

export default ChatBubble;
