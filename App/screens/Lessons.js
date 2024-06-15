import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const Lessons = ({ navigation, route }) => {
    const { data } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('VocabMatch', { data })}
            >
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Vocab Match</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('VocabMatchPhoto', { data })}
            >
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Vocab Match Photo</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


export default Lessons;


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
  