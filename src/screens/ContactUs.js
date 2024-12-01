import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { composeAsync } from "expo-mail-composer";
import Container from "../components/Container";
import InputField from "../components/inputField";
import { useNavigation } from "@react-navigation/native";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weChatID, setWeChatID] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const sendEmail = async () => {
    const newErrors = {};

    // Define errors
    newErrors.firstName = [
      { condition: firstName.length == 0, result: "First Name is required" },
      {
        condition: firstName.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.lastName = [
      { condition: lastName.length == 0, result: "Last Name is required" },
      {
        condition: lastName.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.weChatID = [
      { condition: weChatID.length == 0, result: "WeChat ID is required" },
      {
        condition: weChatID.length < 3,
        result: "WeChat ID must be longer than 3 characters",
      },
      {
        condition: weChatID.length > 20,
        result: "WeChat ID cannot be longer than 20 characters",
      },
    ];
    newErrors.subject = [
      { condition: subject.length == 0, result: "Subject is required" },
      {
        condition: subject.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.message = [
      { condition: message.length == 0, result: "Message is required" },
    ];

    for (const field in newErrors) {
      for (const error in newErrors[field]) {
        if (newErrors[field][error].condition) {
          setErrors(newErrors);
          return;
        }
      }
    }

    try {
      await composeAsync({
        recipients: ["eonenglishus@gmail.com"],
        subject: subject,
        body: `Dear Eon English,\n\n${message}\n\nBest\n\n${firstName} ${lastName}.\n\nWeChat ID: ${weChatID}`,
      }).then(() => {
        Alert.alert("Sent!", "The form has been sent.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomeStack");
            },
          },
        ]);
      });
    } catch (error) {
      Alert.alert("Failed", "The form has not been sent.", { text: "OK" });
    }
  };

  return (
    <ScrollView>
      <Container>
        <InputField
          title={"First Name: "}
          placeholderText={"Enter First Name"}
          value={firstName}
          onChangeText={setFirstName}
          conditions={errors.firstName}
        />
        <InputField
          title={"Last Name: "}
          placeholderText={"Enter Last Name"}
          value={lastName}
          onChangeText={setLastName}
          conditions={errors.lastName}
        />
        <InputField
          title={"WeChat ID: "}
          placeholderText={"Enter WeChat ID"}
          value={weChatID}
          onChangeText={setWeChatID}
          conditions={errors.weChatID}
        />
        <InputField
          title={"Subject: "}
          placeholderText={"Enter Subject"}
          value={subject}
          onChangeText={setSubject}
          conditions={errors.subject}
        />
        <InputField
          title={"Message: "}
          placeholderText={"Enter Message"}
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          conditions={errors.message}
          multiline={true}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <View style={{ paddingBottom: 40 }} />
      </Container>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  title: {
    color: "#8E8E8F",
    fontSize: 42,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 40,
    alignSelf: "center",
  },
  messageInput: {
    height: 100, // adjust height for multiline input
  },
  buttonContainer: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
