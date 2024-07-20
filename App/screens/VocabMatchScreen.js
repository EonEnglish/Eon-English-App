import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDocs } from "@firebase/firestore";
import { getFirestore, collection } from "@firebase/firestore";
import { db } from "../firebase";



const VocabMatchScreen = ({ route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        Collection.forEach(async (doc) => {
          // Assuming 'targetDocumentId' is the ID of the document you want to enter
          if (doc.id === 'Vocab Match') {
            const subCollection = await getDocs(collection(doc.ref, 'Collection'));
            const vocabulary = subCollection.docs.map(doc => doc.data());
            console.log(vocabulary)
            setVocabList(vocabulary);
          }
        });
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    fetchVocabulary();
  }, []);
  
  const checkAnswer = () => {
    const currentWord = vocabList[currentWordIndex];
    if (!currentWord) {
      console.error("Current word is undefined.");
      return;
    }
  
    const userInputLowerCase = userInput.toLowerCase();
    const correctWord1 = currentWord.word ? currentWord.word.toLowerCase() : '';
    const correctWord2 = currentWord.word1 ? currentWord.word1.toLowerCase() : '';
  
    if (userInputLowerCase === correctWord1 || userInputLowerCase === correctWord2) {
      setScore(score + 1);
      setAlertMessage('Your answer is correct!');
    } else {
      setAlertMessage('Your answer is incorrect!');
    }
    setShowAlert(true);
  };

  const nextWord = () => {
    if (currentWordIndex < vocabList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
    } else {
      Alert.alert('Game Over', `You have finished the game! Your final score is ${score}.`, [
        { text: 'OK' },
      ]);
    }
  };

  useEffect(() => {
    if (showAlert) {
      Alert.alert('Result', alertMessage, [
        {
          text: 'OK',
          onPress: () => {
            setShowAlert(false);
            nextWord();
          },
        },
      ]);
    }
  }, [showAlert]);

  if (vocabList.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.translation}>{vocabList[currentWordIndex].translation}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the word"
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Submit" onPress={checkAnswer} />
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  translation: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Center the text horizontally
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    width: '80%',
  },
  score: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default VocabMatchScreen;