import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SuccessPopup = ({ text, visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(onClose, 1200);
            return () => clearTimeout(timeout);
        }
    }, [visible, onClose]);
    if (!visible) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <MaterialCommunityIcons name='check' size={32} color='#fff' />
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.9)',
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 16,
    },
});

export default SuccessPopup;
