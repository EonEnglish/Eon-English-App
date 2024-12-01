import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import checkInput from "./inputChecker";

const InputField = ({
  title,
  placeholderText,
  value,
  onChangeText,
  style,
  multiline,
  conditions,
}) => {
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
    borderRadius: 7,
    padding: 13,
    fontSize: 14,
    borderWidth: 3,
    borderColor: "#C9C9C9",
  },
  errorInput: {
    borderColor: "#FF0000",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 25,
    gap: 5,
  },
  label: {
    color: "#585758",
    fontWeight: "700",
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
  },
});
