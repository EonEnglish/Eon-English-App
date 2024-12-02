import React, { useState } from "react";
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
  ...props
}) => {
  const [isFocus, setFocus] = useState(false);
  error = conditions && checkInput(conditions);

  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.label}>{title}</Text>}
      <TextInput
        style={[
          styles.input,
          style,
          error && styles.errorInput,
          isFocus && styles.focusInput,
        ]}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
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
    borderWidth: 2,
    borderColor: "#C9C9C9",
  },
  focusInput: {
    borderColor: "#3E88FF",
  },
  errorInput: {
    borderColor: "#FF0000",
  },
  inputGroup: {
    width: "100%",
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
