import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TenantItem({ name, imageURI, isOverdue }) {
    return (
        <TouchableOpacity style={styles.button}>
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <Image
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4s_4X_ATZB0EnRdOBPMB7LN8UtsDj0wzZQ&usqp=CAU',
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{name}</Text>
                    <Text style={isOverdue ? styles.red : styles.green}>
                        {isOverdue ? 'Late' : 'Paid'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
    },
    card: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 50,
        height: 50,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        margin: 5,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    red: {
        fontSize: 18,
        color: 'red',
        marginRight: 10,
    },
    green: {
        fontSize: 18,
        color: 'green',
        marginRight: 10,
    },
    arrow: {
        alignSelf: 'center',
        marginRight: 10,
    },
});
