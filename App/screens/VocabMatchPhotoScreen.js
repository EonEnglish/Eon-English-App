import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDocs, collection } from '@firebase/firestore';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { db } from "../firebase";

const VocabMatchPhotoScreen = ({ route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
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
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        if (!Collection.empty) {
          Collection.forEach(async (doc) => {
            // Assuming 'targetDocumentId' is the ID of the document you want to enter
            if (doc.id === 'Image Match') {
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
      console.log(options);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = () => {
    const currentWord = vocabList[currentWordIndex];
    if (selectedOption === currentWord.word) {
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
      setSelectedOption('');
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

  const currentWord = vocabList[currentWordIndex];
  const currentImageUrl = imgUrls[currentWordIndex];

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
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
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  score: {
    fontSize: 24,
    marginTop: 20,
  },
});
    

export default VocabMatchPhotoScreen;
