import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = ({ children, style }) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
});

export default Container;