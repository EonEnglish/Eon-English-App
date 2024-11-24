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
    color: '#CCCCCC',
    fontWeight: '900',
    borderRadius: 7, 
    borderWidth: 3,
    fontSize: 14,
    height: 40,
    padding: 10,
    width: 'auto',
    marginTop: -20,
    marginBottom: 50,
    alignSelf: 'flex-end'
  },
});