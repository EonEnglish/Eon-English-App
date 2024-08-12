import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const InfoCard = ({ title, text, footer }) => {
    return (
        <View style={styles.infoCardContainer}>
            <Text style={styles.infoCardTitle}>{title}</Text>
            <Text style={styles.infoCardBody}>{text}</Text>
            <Text style={styles.infoCardFooter}>{footer}</Text>
        </View>
    );
};

export default InfoCard;

const styles = StyleSheet.create({
    infoCardContainer: {
        backgroundColor: '#0782F9',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    infoCardTitle: {
        color: 'white',
        fontSize: 17,
        marginBottom: 5,
    },
    infoCardBody: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        lineHeight: 22,
    },
    infoCardFooter: {
        color: 'white',
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: "right",
    }
});