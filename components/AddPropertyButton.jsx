import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddPropertyButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>Add Property +</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '95%',
        height: 60,
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: '#a9a9a9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a9a9a9',
    },
});

export default AddPropertyButton;
