import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import checkInput from './inputChecker';

const Dropdown = ({ title, placeholderText, setSelected, data, conditions }) => {
    error = conditions && checkInput(conditions);

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{title}</Text>
            <SelectList
                data={data}
                setSelected={setSelected}
                placeholder={placeholderText}
                boxStyles={[styles.input, error && styles.errorInput]}
                dropdownStyles={styles.input}
                dropdownItemStyles={styles.dropdownInput}
            />
            {error && <Text style={styles.errorText}>{error[0]}</Text>}
        </View>
    );
};

export default Dropdown;

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
    dropdownInput: {
        color: '#000000',
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