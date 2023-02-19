import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { useQuery } from '../convex/_generated/react';

export const TenantList = ({ tenants }) => {
    const getName = useQuery('getName');

    const names = tenants.map((tenant) => getName(tenant));

    return (
        <FlatList
            data={names}
            numColumns={3}
            renderItem={({ tenant }) => (
                <View style={styles.itemContainer}>
                    <View style={styles.itemImageContainer}>
                        <Image
                            source={
                                // TODO: Replace with imageURI of avatar
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg'
                            }
                            style={styles.profileImage}
                        />
                        <Text style={styles.itemName}>{tenant}</Text>
                    </View>
                    <Text style={styles.paymentStatus}>{tenant}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        marginHorizontal: 20,
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        height: 100,
        backgroundColor: '#fff',
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
});
