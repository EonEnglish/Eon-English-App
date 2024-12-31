import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

export const Container = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

Container.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
