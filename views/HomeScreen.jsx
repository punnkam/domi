import { Text, View, SafeAreaView, FlatList, StatusBar } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import AddPropertyButton from '../components/AddPropertyButton';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
    },
];

export default function HomeScreen({ navigation }) {
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
                data={DATA}
                renderItem={({ item }) => <PropertyCard name={item.name} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}
