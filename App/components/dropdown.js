import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const Dropdown = ({ title, placeholderText, setSelected, data }) => {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{title}</Text>
            <SelectList
                data={data}
                setSelected={setSelected}
                placeholder={placeholderText}
                boxStyles={styles.input}
                dropdownStyles={styles.input}
                dropdownItemStyles={styles.dropdownInput}
            />
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
    }
});