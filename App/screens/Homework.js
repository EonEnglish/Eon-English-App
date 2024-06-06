import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Homework = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VocabMatch')}
      >
        <Text style={styles.buttonText}>Homework</Text>
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
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
      },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});