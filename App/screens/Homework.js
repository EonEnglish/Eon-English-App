import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, Dimensions } from 'react-native';

const Homework = ({ navigation }) => {
  const lessons = [
    { id: '1', title: 'Lesson 1: Where are you going?' },
    { id: '2', title: 'Lesson 2: Time for School' },
    { id: '3', title: 'Lesson 3: Sports' },
    { id: '4', title: 'Lesson 4: Music and Art' },
    { id: '5', title: 'Lesson 5: Home' },
    { id: '6', title: 'Lesson 6: Meals' },
    { id: '7', title: 'Lesson 7: Fast Food' },
    { id: '8', title: 'Lesson 8: Review' },
    { id: '9', title: 'Lesson 9: Nature' },
    { id: '10', title: 'Lesson 10: Animals' },
    { id: '11', title: 'Lesson 11: Shopping' },
    { id: '12', title: 'Lesson 12: Birthdays' },
    { id: '13', title: 'Lesson 13: Holidays' },
    { id: '14', title: 'Lesson 14: Review' },
    // Add more lessons as needed
  ];
  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Lessons', { data: `Lesson ${item.id}` })}
    >
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  const dimensions = Dimensions.get('window');
  const screenWidth = dimensions.width;
  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          width: screenWidth,
        }}
        contentContainerStyle={styles.flatListContent}
      />
      
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lessons')}
        >
          <Text style={styles.buttonText}>Study Materials</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default Homework;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    flatListContent: {
      alignItems: 'center',
    },
    button: {
      borderWidth: 2,
      width: 280,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonTextContainer: {
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