import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

export const ScoreCounter = ({ children, style }) => {
  return <Text style={[styles.container, style]}>{children}</Text>;
};

ScoreCounter.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
};

export default ScoreCounter;

const styles = StyleSheet.create({
  container: {
    borderColor: "#D9D9D9",
    color: "#CCCCCC",
    fontWeight: "900",
    borderRadius: 7,
    borderWidth: 2,
    fontSize: 14,
    height: 40,
    padding: 10,
    width: "auto",
    marginTop: -20,
    marginBottom: 50,
    alignSelf: "flex-end",
  },
});
