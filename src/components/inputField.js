import PropTypes from "prop-types";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import checkInput from "./inputChecker";

export const InputField = ({
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
  let error = conditions && checkInput(conditions);

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

InputField.propTypes = {
  title: PropTypes.string,
  placeholderText: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  style: PropTypes.any,
  multiline: PropTypes.bool,
  conditions: PropTypes.array,
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
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
  },
});
