import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useQuery } from '../convex/_generated/react';
import TenantItem from './TenantItem';

export const TenantList = ({ tenants }) => {
    let isLoading = false;
    let names = [];

    try {
        tenants.map(async (tenant) => {
            const name = useQuery('getName', tenant);

            if (name) names.push(name.name);
        });
    } catch (error) {
        isLoading = true;
    }

    if (isLoading) return <Text>No tenants in this property</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tenants</Text>
            {
                <FlatList
                    data={names}
                    numColumns={3}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TenantItem name={item} status='PAID' key={index} />
                        );
                    }}
                    style={styles.listContainer}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    listContainer: {
        // marginHorizontal: 20,
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        height: 80,
        // backgroundColor: '#000',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
});
