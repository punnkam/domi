import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { TenantList } from '../components/TenantItem';

const HeroImage = () => {
    return (
        <View style={styles.heroContainer}>
            <Image
                style={styles.heroImage}
                source={{ uri: 'https://source.unsplash.com/random/800x400' }}
            />
            <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>Title</Text>
                <Text style={styles.heroSubtitle}>Subtitle</Text>
            </View>
        </View>
    );
};

const Property = ({ tenants }) => {
    return (
        <View style={styles.container}>
            <HeroImage />
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
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#fff',
    },
});

export default Property;
