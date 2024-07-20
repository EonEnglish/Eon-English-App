import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
    const [deletingAccount, setDeletingAccount] = useState(false);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace("Login");
        }).catch((error) => {
            // An error happened.
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
            <View style={styles.signOutContainer}>
                <Text>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity 
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={confirmDeleteAccount}
                    style={[styles.button, { backgroundColor: 'red' }]}
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
    },
    profileImageContainer: {
        alignItems: 'center',
        top: '10%',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 75,
    },
    profileImagePlaceholder: {
        width: 130,
        height: 130,
        borderRadius: 75,
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        textAlign: 'center',
    },
    signOutContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});
