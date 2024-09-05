import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const InputField = ({ title, placeholderText, value, onChangeText, style, error, multiline }) => {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{title}</Text>
            <TextInput
                style={[styles.input, style]}
                placeholder={placeholderText}
                onChangeText={onChangeText}
                value={value}
                multiline={multiline}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    input: {
        borderRadius: 5,
        padding: 13,
        fontSize: 14,
        borderWidth: 3,
        borderColor: '#CCCCCC',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
        gap: 5,
    },
    label: {
        color: '#8E8E8F',
        fontWeight: '700',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        marginTop: 5,
    }
});