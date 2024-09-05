import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { composeAsync } from 'expo-mail-composer';
import Container from '../components/Container';
import InputField from '../components/inputField';

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
                <InputField
                    title={"First Name: "}
                    placeholderText={"Enter First Name"}
                    value={firstName}
                    onChangeText={setFirstName}
                    style={errors.firstName && styles.errorInput}
                    error={errors.firstName}
                />
                <InputField
                    title={"Last Name: "}
                    placeholderText={"Enter Last Name"}
                    value={lastName}
                    onChangeText={setLastName}
                    style={errors.lastName && styles.errorInput}
                    error={errors.lastName}
                />
                <InputField
                    title={"WeChat ID: "}
                    placeholderText={"Enter WeChat ID"}
                    value={weChatID}
                    onChangeText={setWeChatID}
                    style={errors.weChatID && styles.errorInput}
                    error={errors.weChatID}
                />
                <InputField
                    title={"Subject: "}
                    placeholderText={"Enter Subject"}
                    value={subject}
                    onChangeText={setSubject}
                    style={errors.subject && styles.errorInput}
                    error={errors.subject}
                />
                <InputField
                    title={"Message: "}
                    placeholderText={"Enter Message"}
                    value={message}
                    onChangeText={setMessage}
                    style={errors.message && styles.errorInput}
                    error={errors.message}
                />
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
    messageInput: {
        height: 100, // adjust height for multiline input
    },
    errorInput: {
        borderColor: '#FF0000',
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