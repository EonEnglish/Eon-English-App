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
            <Text style={styles.title}>Sign In</Text>
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
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <CustomCheckBox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogIn}
                    style={styles.loginButton}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("PasswordReset")}
                    style={styles.reset}
                >
                    <Text style={styles.resetText}>Forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={styles.registerButton}
                >
                    <Text style={styles.buttonRegisterText}>Don't have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>
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
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#CCCCCC',
        padding: 30,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginTop: 10,
        borderWidth: 3,
        borderColor: '#CCCCCC',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    loginButton: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    registerButton: {
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonRegisterText: {
        color: '#8E8E8F',
        fontWeight: '350',
        fontSize: 16,
        marginTop: 10,
    },
    signUpText: {
        color: '#F9C407',
        fontWeight: '700',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        alignSelf: 'center',
    },
    reset: {
        alignSelf: 'flex-start',
    },
    resetText: {
        color: '#8E8E8F',
        fontSize: 16,
        fontWeight: '350',
        marginTop: 20,
    },
});
