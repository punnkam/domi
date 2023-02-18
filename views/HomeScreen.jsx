import { Text, View, SafeAreaView, FlatList, StatusBar } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import AddPropertyButton from '../components/AddPropertyButton';
import { useQuery } from '../convex/_generated/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
    const userId = useContext(AuthContext);
    const properties = useQuery('getPropertiesByOwner', userId);
    console.log(properties);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <AddPropertyButton
                onPress={() => navigation.navigate('Add Property')}
            />
            <FlatList
                data={properties}
                renderItem={({ item }) => (
                    <PropertyCard
                        name={item.name}
                        price={`$${item.rent}`}
                        numTenants={item.tenants.length}
                        imageSource={item.imageURI}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}
