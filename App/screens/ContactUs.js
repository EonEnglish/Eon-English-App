import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { composeAsync } from 'expo-mail-composer';

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [weChatID, setWeChatID] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = async () => {
        try {
            await composeAsync({
                recipients: ['eonenglishus@gmail.com'],
                subject: subject,
                body: `Dear Eon English,\n\n${message}\n\nBest\n\n${firstName} ${lastName}.\n\nWeChat ID: ${weChatID}`,
            });
            setAlertMessage('Email Sent!');
        } catch (error) {
            setAlertMessage('Email Failed to Send.');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter First Name"
                    onChangeText={setFirstName}
                    value={firstName}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Last Name"
                    onChangeText={setLastName}
                    value={lastName}
                /> 
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>WeChat ID:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter WeChat ID"
                    onChangeText={setWeChatID}
                    value={weChatID}
                /> 
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Subject:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Subject"
                    onChangeText={setSubject}
                    value={subject}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Message:</Text>
                <TextInput 
                    style={[styles.input, styles.messageInput]}
                    multiline={true}
                    placeholder="Enter Message"
                    onChangeText={setMessage}
                    value={message}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={sendEmail}
            >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <View style={{ paddingBottom: 100 }} />
        </ScrollView>
    );
}

export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    messageInput: {
        height: 100, // adjust height for multiline input
    },
    buttonContainer: {
        backgroundColor: '#0782F9', // Change the background color as needed
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});