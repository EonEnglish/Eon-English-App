import React from "react";
import { View, StyleSheet, Text } from "react-native";

const InfoCard = ({
  title,
  text,
  footer,
  containerStyle,
  titleStyle,
  textStyle,
  footerStyle,
}) => {
  return (
    <View style={[styles.infoCardContainer, containerStyle]}>
      <Text style={[styles.infoCardTitle, titleStyle]}>{title}</Text>
      {text && <Text style={[styles.infoCardBody, textStyle]}>{text}</Text>}
      {footer && (
        <Text style={[styles.infoCardFooter, footerStyle]}>{footer}</Text>
      )}
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCardContainer: {
    backgroundColor: "#0782F9",
    borderRadius: 7,
    marginBottom: 20,
    padding: 20,
  },
  infoCardTitle: {
    color: "white",
    fontSize: 17,
  },
  infoCardBody: {
    color: "white",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 22,
  },
  infoCardFooter: {
    color: "white",
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "right",
  },
});
