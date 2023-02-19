import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Image,
    StyleSheet,
} from 'react-native';
import { Avatar } from '@rneui/themed';
import UserProfileDummy from '../assets/user-profile-dummy.png';
import { Button } from '@rneui/themed';
import Login from './Login';
import LogoutIcon from '../assets/logout.png';

export default function ProfileScreen() {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 50,
            }}
        >
            <Avatar size={80} rounded source={UserProfileDummy} />
            <Text
                style={{ fontWeight: 'bold', fontSize: 32, marginVertical: 5 }}
            >
                Landlord name
            </Text>
            <Text style={{ color: 'gray', fontSize: 24, marginVertical: 5 }}>
                3 PROPERTIES
            </Text>
            <View style={{ width: '80%' }}>
                <InputField label={'Email'} value={'landlord@gmail.com'} />
                <InputField label={'Phone'} value={'(000) 000-0000'} />
            </View>
            <View>
                <Button
                    titleStyle={{ color: 'black', fontWeight: '600' }}
                    loading={false}
                    onPress={() => <Login />}
                    loadingProps={{ size: 'medium', color: 'black' }}
                    buttonStyle={{
                        backgroundColor: 'white',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        color: 'black',
                        paddingHorizontal: 20,
                    }}
                >
                    <Image source={LogoutIcon} style={styles.tinyLogo} /> Logout
                </Button>
            </View>
        </View>
    );
}

function InputField({ label, value }) {
    return (
        <View
            style={{
                borderWidth: 2,
                borderColor: 'gray',
                borderStyle: 'solid',
                borderRadius: 7,
                padding: 10,
                marginVertical: 10,
                width: '100%',
            }}
        >
            <Text style={{ color: 'gray', fontSize: 14 }}>{label}</Text>
            <TextInput value={value} />
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});
