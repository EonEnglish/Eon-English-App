import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace("Login");
        }).catch((error) => {
            // An error happened.
            alert(error.message);
        });
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
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})