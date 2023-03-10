import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const Login = ({ setUserType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = (username, password) => {
        if (username === 'landlord' && password === 'landlord') {
            setUserType(1);
        } else if (username === 'tenant1' && password === 'tenant1') {
            setUserType(2);
        } else if (username === 'tenant2' && password === 'tenant2') {
            setUserType(3);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>Domi</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder='Username'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => login(username, password)}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        marginBottom: 32,
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 16,
        width: '50%',
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        width: '100%',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#007aff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;
