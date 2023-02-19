import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useMutation, useQuery } from '../convex/_generated/react';
import SuccessPopup from '../components/SuccessPopup';
import { AuthContext } from '../context/AuthContext';

const AddProperty = ({ navigation }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [rent, setRent] = useState('');
    const [tenants, setTenants] = useState(['']);
    const [isSuccess, setIsSuccess] = useState(false);
    const addProperty = useMutation('addProperty');
    const imageURI = useQuery('getApartmentURI', 0);

    const userId = useContext(AuthContext);

    const handleAddTenant = () => {
        setTenants([...tenants, '']);
    };

    const handleTenantChange = (text, index) => {
        const newTenants = [...tenants];
        newTenants[index] = text;
        setTenants(newTenants);
    };

    const removeTenant = (index) => {
        const tenants = [...tenants];
        tenants.splice(index, 1);
        setTenants(tenants);
    };

    const handleSave = async () => {
        // Handle form submission
        if (
            !name ||
            !type ||
            !address ||
            !rent ||
            !tenants ||
            tenants.length === 0
        ) {
            alert('Please fill out all required fields');
            return;
        }
        try {
            addProperty(name, type, address, userId, rent, tenants, imageURI);
            setIsSuccess(true);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ height: '100%' }}>
                    <SuccessPopup
                        text='Property Added'
                        visible={isSuccess}
                        onClose={() => navigation.goBack()}
                    />
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    placeholder='Enter property name'
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Type</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.buttonChoice,
                                            type === 'House' &&
                                                styles.activeButton,
                                        ]}
                                        onPress={() => {
                                            setType('House');
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                type === 'House' &&
                                                    styles.activeButtonText,
                                            ]}
                                        >
                                            House
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.buttonChoice,
                                            type === 'Apartment' &&
                                                styles.activeButton,
                                        ]}
                                        onPress={() => setType('Apartment')}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                type === 'Apartment' &&
                                                    styles.activeButtonText,
                                            ]}
                                        >
                                            Apartment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={address}
                                    onChangeText={(text) => setAddress(text)}
                                    placeholder='Enter property address'
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Rent</Text>
                                <TextInput
                                    style={styles.input}
                                    value={rent}
                                    onChangeText={(text) => setRent(text)}
                                    placeholder='Enter monthly rent'
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Tenants</Text>
                                {tenants.map((tenant, index) => (
                                    <View style={styles.tenantInputContainer} key={index}>
                                        <TextInput
                                            key={index}
                                            style={styles.emailInput}
                                            value={tenant}
                                            placeholder='Enter tenant email'
                                            onChangeText={(text) =>
                                                handleTenantChange(text, index)
                                            }
                                        />
                                        {index !== 0 && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeTenant(index)
                                                }
                                                key={index + 1}
                                            >
                                                <Text
                                                    key={index + 2}
                                                    style={
                                                        styles.removeButtonText
                                                    }
                                                >
                                                    x
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleAddTenant}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>
                                    Add Property
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    emailInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 5,
        width: '90%',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonChoice: {
        backgroundColor: '#a9a9a9',
        paddingVertical: 15,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    activeButton: {
        backgroundColor: '#000',
    },
    activeButtonText: {
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#007aff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    tenantInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    removeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        width: 20,
        textAlign: 'center',
    },
});

export default AddProperty;
