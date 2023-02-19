import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { TenantList } from '../components/TenantList';

const HeroImage = ({ imageURI }) => {
    return (
        <View style={styles.heroContainer}>
            <Image style={styles.heroImage} source={{ uri: imageURI }} />
        </View>
    );
};

const Property = ({
    route: {
        params: { tenants, imageURI, name, address },
    },
}) => {
    return (
        <View style={styles.container}>
            <HeroImage imageURI={imageURI} />
            <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>{name}</Text>
                <Text style={styles.heroSubtitle}>{`${address} | ${
                    tenants.length
                } ${tenants.length > 1 ? 'tenants' : 'tenant'}`}</Text>
            </View>
            <TenantList tenants={tenants} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroContainer: {
        position: 'relative',
        height: 400,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroTextContainer: {
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#000',
    },
});

export default Property;
