import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { composeAsync } from 'expo-mail-composer';
import Container from '../components/Container';

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [weChatID, setWeChatID] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const sendEmail = async () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!weChatID) newErrors.weChatID = 'WeChat ID is required';
        if (!subject) newErrors.subject = 'Subject is required';
        if (!message) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
        <ScrollView>
            <Container>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name:</Text>
                    <TextInput
                        style={[styles.input, errors.firstName && styles.errorInput]}
                        placeholder="Enter First Name"
                        onChangeText={setFirstName}
                        value={firstName}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name:</Text>
                    <TextInput
                        style={[styles.input, errors.lastName && styles.errorInput]}
                        placeholder="Enter Last Name"
                        onChangeText={setLastName}
                        value={lastName}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>WeChat ID:</Text>
                    <TextInput
                        style={[styles.input, errors.weChatID && styles.errorInput]}
                        placeholder="Enter WeChat ID"
                        onChangeText={setWeChatID}
                        value={weChatID}
                    />
                    {errors.weChatID && <Text style={styles.errorText}>{errors.weChatID}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Subject:</Text>
                    <TextInput
                        style={[styles.input, errors.subject && styles.errorInput]}
                        placeholder="Enter Subject"
                        onChangeText={setSubject}
                        value={subject}
                    />
                    {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Message:</Text>
                    <TextInput
                        style={[styles.input, styles.messageInput, errors.subject && styles.errorInput]}
                        multiline={true}
                        placeholder="Enter Message"
                        onChangeText={setMessage}
                        value={message}
                    />
                    {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={sendEmail}
                >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
                <View style={{ paddingBottom: 40 }} />
            </Container>
        </ScrollView>
    );
}

export default ContactUs;

const styles = StyleSheet.create({
    title: {
        color: '#8E8E8F',
        fontSize: 42,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 40,
        alignSelf: 'center',
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
    input: {
        borderRadius: 5,
        padding: 13,
        fontSize: 14,
        borderWidth: 3,
        borderColor: '#CCCCCC',
    },
    messageInput: {
        height: 100, // adjust height for multiline input
    },
    errorInput: {
        borderColor: '#FF0000',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        marginTop: 5,
    },
    buttonContainer: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});