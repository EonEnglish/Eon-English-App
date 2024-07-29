import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
        
      <Text style={styles.header}>About</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Eon English is a non-profit organization that teaches kids from China and Spanish-speaking countries English. We aim to provide this opportunity to kids who don’t have enough access to English learning material. Through this program, students get to learn how to speak native English and about Western culture.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 100,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D3D3D3',
    marginBottom: 50,
  },
  descriptionContainer: {
    backgroundColor: '#007BFF', // Blue color similar to the image
    padding: 30,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AboutScreen;
