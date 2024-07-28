import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
    const [deletingAccount, setDeletingAccount] = useState(false);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch((error) => {
            alert(error.message);
        });
    }

    const confirmDeleteAccount = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: handleDeleteAccount }
            ],
            { cancelable: false }
        );
    };

    const handleDeleteAccount = () => {
        const user = auth.currentUser;
        if (user) {
            setDeletingAccount(true);
            user.delete()
                .then(() => {
                    setDeletingAccount(false);
                    Alert.alert("Success", "Account successfully deleted");
                    navigation.replace("Login");
                })
                .catch((error) => {
                    setDeletingAccount(false);
                    Alert.alert("Error", error.message);
                });
        } else {
            Alert.alert("Error", "No user is currently authenticated");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.aboutButton]}>
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.getInvolvedButton]}>
                    <Text style={styles.buttonText}>Get Involved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.findUsButton]}>
                    <Text style={styles.buttonText}>Find Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.resetPasswordButton]}     
                    onPress={() => navigation.navigate('PasswordResetScreen')}
                    >
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleSignOut}
                    style={[styles.button, styles.logOutButton]}
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={confirmDeleteAccount}
                    style={[styles.button, styles.deleteAccountButton]}
                    disabled={deletingAccount}
                >
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#D3D3D3',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    aboutButton: {
        backgroundColor: '#FFC107',
    },
    getInvolvedButton: {
        backgroundColor: '#FFC107',
    },
    findUsButton: {
        backgroundColor: '#FFC107',
    },
    resetPasswordButton: {
        backgroundColor: '#8A2BE2',
    },
    logOutButton: {
        backgroundColor: '#007BFF',
    },
    deleteAccountButton: {
        backgroundColor: 'red',
    },
});
