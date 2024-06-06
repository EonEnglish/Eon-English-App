import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const Homework = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VocabMatch')}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Lesson 1: Where are you going?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VocabMatch')}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Lesson 2: Time for School</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VocabMatch')}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Lesson 3: Sports</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StudyMaterials')}
      >
        <Text style={styles.buttonText}>Study Materials</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Homework;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    button: {
      borderWidth: 2,
      width: '80%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    buttonText: {
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
    },
});