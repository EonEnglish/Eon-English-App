import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { checkInput } from "./inputChecker";

export const Dropdown = ({
  title,
  placeholderText,
  setSelected,
  data,
  conditions,
}) => {
  let error = conditions && checkInput(conditions);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{title}</Text>
      <SelectList
        data={data}
        setSelected={setSelected}
        placeholder={placeholderText}
        boxStyles={[styles.input, error && styles.errorInput]}
        dropdownStyles={styles.input}
        dropdownItemStyles={styles.dropdownInput}
      />
      {error && <Text style={styles.errorText}>{error[0]}</Text>}
    </View>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string,
  placeholderText: PropTypes.string,
  setSelected: PropTypes.func,
  data: PropTypes.any,
  conditions: PropTypes.array,
};

export default Dropdown;

const styles = StyleSheet.create({
  input: {
    borderRadius: 7,
    padding: 13,
    fontSize: 14,
    borderWidth: 2,
    borderColor: "#C9C9C9",
    backgroundColor: "#f5f5f5",
  },
  errorInput: {
    borderColor: "#FF0000",
  },
  dropdownInput: {
    color: "#000000",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
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
