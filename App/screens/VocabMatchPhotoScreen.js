import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity, Button, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getDoc, doc, setDoc } from '@firebase/firestore';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { db } from "../firebase";
import Container from '../components/Container';
import ScoreCounter from '../components/ScoreCounter';

const VocabMatchPhotoScreen = ({ navigation, route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const { data } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        Collection.forEach(async (doc) => {
          // Assuming 'targetDocumentId' is the ID of the document you want to enter
          if (doc.id === 'Image Match') {
            const subCollection = await getDocs(collection(doc.ref, 'Collection'));
            const vocabulary = subCollection.docs.map(doc => doc.data());
            setVocabList(vocabulary);
          }
        });
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    fetchVocabulary();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        if (!Collection.isEmpty()) {
          Collection.forEach(async (doc) => {
            // Assuming 'targetDocumentId' is the ID of the document you want to enter
            if (doc.id == 'Image Match') {
              const subCollection = await getDocs(collection(doc.ref, 'Collection'));
              const imageUrls = await Promise.all(
                subCollection.docs.map(async (doc) => {
                  const imageUrl = doc.data().image;
                  return await getImageDownloadUrl(imageUrl);
                })
              );
              setImgUrls(imageUrls);
            }
          });
        } else {
          console.log('No documents found in the vocabSet1 collection.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (vocabList.length > 0) {
      const currentWord = vocabList[currentWordIndex];
      setOptions(generateOptions(currentWord.word));
    }
  }, [vocabList, currentWordIndex]);

  const getImageDownloadUrl = async (imageUrl) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, imageUrl);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return '';
    }
  };

  const generateOptions = (correctWord) => {
    const options = [correctWord];
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * vocabList.length);
      const randomWord = vocabList[randomIndex].word;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = () => {
    const currentWord = vocabList[currentWordIndex];
    if (selectedOption === currentWord.word) {
      setScore(score + 1);
      setTotalScore(totalScore + 1);
      setAlertMessage('Your answer is correct!');
    } else {
      setTotalScore(totalScore + 1);
      setAlertMessage('Your answer is incorrect!');
    }
    setShowAlert(true);
  };

  const nextWord = () => {
    if (currentWordIndex < vocabList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSelectedOption('');
    } else {
      Alert.alert('Game Over', `You have finished the game! Your final score is ${score}.`, [
        { text: 'OK' },
      ]);
      homeworkComplete();
    }
  };

  const homeworkComplete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('No authenticated user found.');
      return;
    }

    const userHomeworkRef = doc(db, "Users", user.uid, "Homework", data, "2", "Vocab Match Photo");

    try {
      const homeworkDoc = await getDoc(userHomeworkRef);
      if (homeworkDoc.isExists()) {
        const existingData = homeworkDoc.data();
        if (score > existingData.score) {
          await setDoc(userHomeworkRef, {
            completed_time: new Date(),
            score: score,
            total_score: totalScore,
          });
          console.log('Homework completion data updated successfully with a higher score.');
        } else {
          console.log('Existing score is higher or equal. No update made.');
        }
      } else {
        await setDoc(userHomeworkRef, {
          completed_time: new Date(),
          score: score,
          total_score: totalScore,
        });
        console.log('Homework completion data stored successfully.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error storing homework completion data:', error);
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

  const currentWord = vocabList[currentWordIndex];
  const currentImageUrl = imgUrls[currentWordIndex];

  return (
    <ScrollView>
      <Container style={styles.centerContainer}>
        <ScoreCounter>Score: {score}</ScoreCounter>
        {currentImageUrl ? (
          <Image source={{ uri: currentImageUrl }} style={styles.image} />
        ) : (
          <Text>No image available</Text>
        )}
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => setSelectedOption(option)}
          >
            <View style={styles.radioButton}>
              {selectedOption === option && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Submit" onPress={checkAnswer} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#CCCCCC',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  optionText: {
    fontSize: 16,
  },
});

export default VocabMatchPhotoScreen;
