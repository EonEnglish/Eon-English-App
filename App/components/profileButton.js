import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const ProfileButton = ({ text, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} 
            onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ProfileButton;

const styles = StyleSheet.create({
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
});