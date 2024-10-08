import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import checkInput from './inputChecker';

const InputField = ({ title, placeholderText, value, onChangeText, style, multiline, conditions }) => {
    error = conditions && checkInput(conditions);

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{title}</Text>
            <TextInput
                style={[styles.input, style, error && styles.errorInput]}
                placeholder={placeholderText}
                onChangeText={onChangeText}
                value={value}
                multiline={multiline}
            />
            {error && <Text style={styles.errorText}>{error[0]}</Text>}
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
    errorInput: {
        borderColor: '#FF0000',
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