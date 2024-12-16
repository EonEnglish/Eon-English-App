import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ProfileButton = ({ text, onPress, style, styleText = {} }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, styleText]}>{text}</Text>
    </TouchableOpacity>
  );
};

ProfileButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any.isRequired,
  styleText: PropTypes.any,
};

export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
