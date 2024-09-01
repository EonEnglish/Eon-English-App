import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ScoreCounter = ({ children, style }) => {
  return (
    <Text style={[styles.container, style]}>
      {children}
    </Text>
  );
};

export default ScoreCounter;

const styles = StyleSheet.create({
  container: {
    borderColor: '#D9D9D9',
    color: '#D9D9D9',
    borderRadius: 20, 
    borderWidth: 2,
    fontSize: 14,
    height: 40,
    padding: 10,
    width: 'auto',
    marginTop: -20,
    marginBottom: 50,
    marginLeft: 200,
  },
});