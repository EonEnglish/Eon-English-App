import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CustomCheckBox from './CustomCheckBox'; // Adjust the import path according to your project structure

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Tab");
            }
        });

        // Load saved credentials
        const loadCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('email');
                const savedPassword = await AsyncStorage.getItem('password');
                if (savedEmail && savedPassword) {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Error loading credentials', error);
            }
        };

        loadCredentials();

        return unsubscribe;
    }, []);

    const handleLogIn = async () => {
        setLoading(true);
        setError('');
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            if (rememberMe) {
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('password', password);
            } else {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
            }
        } catch (err) {
            setError(getCustomErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const getCustomErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No user found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-email':
                return 'This email address is invalid.';
            case 'auth/user-disabled':
                return 'This user has been disabled.';
            default:
                return 'An unknown error occurred. Please try again.';
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <CustomCheckBox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogIn}
                    style={styles.button}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("PasswordReset")}
                >
                    <Text style={styles.resetText}>Forgot your password? Click here!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
    },
    resetText: {
        marginTop: 30,
    },
});
