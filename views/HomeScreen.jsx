import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import PropertyCard from '../components/PropertyCard';
import AddPropertyButton from '../components/AddPropertyButton';
import { useQuery } from '../convex/_generated/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
    const userId = useContext(AuthContext);
    const properties = useQuery('getPropertiesByOwner', userId);
    if (!properties) return <ActivityIndicator />;

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <AddPropertyButton
                onPress={() => navigation.navigate('AddProperty')}
            />
            <FlatList
                data={properties}
                renderItem={({ item, index }) => {
                    return (
                        <PropertyCard
                            key={index}
                            navigation={navigation}
                            name={item.name}
                            price={`$${item.rent}`}
                            numTenants={item.tenants.length}
                            imageSource={item.imageURI}
                            tenants={item.tenants}
                            address={item.address}
                        />
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}
