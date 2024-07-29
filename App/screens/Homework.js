import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getDoc, doc, setDoc } from "@firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { db } from "../firebase";

const Homework = ({ navigation }) => {
  const [lessonsState, setLessonsState] = useState([]);
  const lessons = [
    { id: '1', title: 'Where are you going?', status: 'NOT STARTED', color: '#0782F9' },
    { id: '2', title: 'Time for School', status: 'NOT STARTED', color: '#8D56FF' },
    { id: '3', title: 'Sports', status: 'NOT STARTED', color: '#8D56FF' },
    { id: '4', title: 'Music and Art', status: 'NOT STARTED', color: '#F9C407' },
    { id: '5', title: 'Home', status: 'NOT STARTED', color: '#F9C407' },
    { id: '6', title: 'Meals', status: 'NOT STARTED', color: '#0782F9' },
    { id: '7', title: 'Fast Food', status: 'NOT STARTED', color: '#0782F9' },
    { id: '8', title: 'Review', status: 'NOT STARTED', color: '#F9C407' },
    { id: '9', title: 'Nature', status: 'NOT STARTED', color: '#8D56FF' },
    { id: '10', title: 'Animals', status: 'NOT STARTED', color: '#0782F9' },
    { id: '11', title: 'Shopping', status: 'NOT STARTED', color: '#F9C407' },
    { id: '12', title: 'Birthdays', status: 'NOT STARTED', color: '#8D56FF' },
    { id: '13', title: 'Holidays', status: 'NOT STARTED', color: '#8D56FF' },
    { id: '14', title: 'Review', status: 'NOT STARTED', color: '#0782F9' },
    // Add more lessons as needed
  ];

  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  
  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error('No authenticated user found.');
        return;
      }

      const newLessonsState = [...lessons];

      for (let i = 1; i <= 14; i++) {
        let lessonId = `Lesson ${i}`;
        let Vocab_Match = doc(db, "Users", user.uid, "Homework", lessonId, "1", "Vocab Match");
        let Vocab_Match_Photo = doc(db, "Users", user.uid, "Homework", lessonId, "2", "Vocab Match Photo");
        let Fill_In_The_blank = doc(db, "Users", user.uid, "Homework", lessonId, "3", "Fill In The blank");

        try {
          let vocabMatchDoc = await getDoc(Vocab_Match);
          let vocabMatchPhotoDoc = await getDoc(Vocab_Match_Photo);
          let fillInTheBlankDoc = await getDoc(Fill_In_The_blank);
          
          let vocabMatchExists = vocabMatchDoc.exists();
          let vocabMatchPhotoExists = vocabMatchPhotoDoc.exists();
          let fillInTheBlankExists = fillInTheBlankDoc.exists();

          if (vocabMatchExists || vocabMatchPhotoExists || fillInTheBlankExists) {
            newLessonsState[i - 1].status = 'IN PROGRESS';
          }

          if (vocabMatchExists && vocabMatchPhotoExists && fillInTheBlankExists) {
            newLessonsState[i - 1].status = 'COMPLETED';
          }

        } catch (error) {
          consol
          e.error('Error fetching homework data:', error);
        }

        setLessonsState(newLessonsState);
      }
    };

    if (isFocused) {
      fetchData(); // Fetch data when the screen is focused
    }
  }, [isFocused, navigation]);

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('Lessons', { data: `Lesson ${item.id}` })}
    >
      <View style={styles.buttonTextContainer}>
        <Text style={styles.lessonNumber}>Lesson {item.id}</Text>
        <Text style={styles.buttonText}>{item.title}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const numColumns = 2;
  const dimensions = Dimensions.get('window');
  const itemWidth = (dimensions.width / numColumns) - 20; // Adjusting for margin

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Homework</Text>
      </View>
      <FlatList
        data={lessonsState.length ? lessonsState : lessons}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.column}
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
  title: {
    color: '#8E8E8F',
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 30,
    alignSelf: 'center',
  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  column: {
    justifyContent: 'space-around',
  },
  button: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: Dimensions.get('window').width / 2 - 20, // Adjusting for margin
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center', // Added for centering text
  },
  statusText: {
    marginTop: 10,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center', // Added for centering text
  },
});