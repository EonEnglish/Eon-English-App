import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomCheckBox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxContainer}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && (
          <Text style={styles.checkboxText}>
            <AntDesign name="check" size={24} color="white" />
          </Text>
        )}
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
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    borderColor: "#2D93F5",
    backgroundColor: "#2D93F5",
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
