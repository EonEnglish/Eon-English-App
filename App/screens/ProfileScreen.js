import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import ProfileButton from '../components/profileButton';

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
                <ProfileButton
                    text={"About"}
                    onPress={() => navigation.navigate('AboutScreen')}
                    style={styles.aboutButton}
                />
                <ProfileButton
                    text={"Get Involved"}
                    style={styles.getInvolvedButton}
                />
                <ProfileButton
                    text={"Find Us"}
                    style={styles.findUsButton}
                />
                <ProfileButton
                    text={"Reset Password"}
                    onPress={() => navigation.navigate('PasswordResetScreen')}
                    style={styles.resetPasswordButton}
                />
                <ProfileButton
                    text={"Log Out"}
                    onPress={handleSignOut}
                    style={styles.logOutButton}
                />
                <ProfileButton
                    text={"Delete Account"}
                    onPress={confirmDeleteAccount}
                    style={styles.deleteAccountButton}
                />
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
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#8E8E8F',
        fontSize: 42,
    },
    buttonContainer: {
        width: '80%',
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
