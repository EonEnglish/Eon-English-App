import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const CustomCheckBox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxContainer}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkboxText}>✔️</Text>}
      </View>
      <Text style={styles.label}>Remember Me</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#0782F9",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckBox;
