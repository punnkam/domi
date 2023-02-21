import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { useQuery } from '../convex/_generated/react';
import UserProfileDummy from '../assets/user-profile-dummy.png';

export default function TransactionCard({ name, timestamp, amount }) {
    let date = new Date(timestamp * 1000);
    let dateFormat = date.toDateString().slice(0, 10);
    return (
        <View style={styles.card}>
            <View style={styles.avatar}>
                <Avatar size={40} rounded source={UserProfileDummy} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{dateFormat}</Text>
                <Text style={styles.description}>{name}</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    paddingRight: 15,
                }}
            >
                <Text
                    style={[
                        styles.title,
                        amount < 0 ? styles.red : styles.green,
                    ]}
                >
                    {`${amount}`}
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
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    avatar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    image: {
        width: 70,
        height: 70,
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
    red: {
        color: 'red',
    },
    green: {
        color: 'green',
    },
    description: {
        fontSize: 16,
    },
    arrow: {
        alignSelf: 'center',
        marginRight: 10,
    },
});
