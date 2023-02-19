import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import getApartmentURI from '../convex/getApartmentURI';
import { useQuery } from '../convex/_generated/react';

export default function PropertyCard({ name, imageSource, price, numTenants }) {
    const data = useQuery('getApartmentURI', 0);

    // Randomization for demo purposes
    const randomDays = Math.floor(Math.random() * 100) % 30;
    const isOverdue = Math.floor(Math.random() * 100) % 2 == 1;

    return (
        <View style={styles.card}>
            <Image source={{ uri: data }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{`${price} | ${numTenants} ${
                    numTenants > 1 ? 'tenants' : 'tenant'
                }`}</Text>
                <Text style={isOverdue ? styles.red : styles.green}>
                    {isOverdue
                        ? `${randomDays} ${
                              randomDays > 1 ? 'days' : 'day'
                          } overdue`
                        : `Due in ${randomDays} ${
                              randomDays > 1 ? 'days' : 'day'
                          }`}
                </Text>
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
    red: {
        color: 'red',
    },
    green: {
        color: 'green',
    },
});
