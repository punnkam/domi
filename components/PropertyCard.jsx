import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PropertyCard({
    name,
    imageSource,
    price,
    numTenants,
    isOverdue,
}) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageSource }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },
});
