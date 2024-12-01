import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getDocs, collection, getDoc, doc, setDoc } from "@firebase/firestore";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { db } from "../services/firebase";
import Container from "../components/Container";
import ScoreCounter from "../components/ScoreCounter";

const VocabMatchPhotoScreen = ({ navigation, route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const { data } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        const vocabData = [];

        for (const doc of Collection.docs) {
          if (doc.id !== "Image Match") continue;

          const subCollection = await getDocs(
            collection(doc.ref, "Collection"),
          );
          vocabData.push(...subCollection.docs.map((doc) => doc.data()));
        }

        setVocabList(vocabData);
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
        const imageUrls = [];

        for (const doc of Collection.docs) {
          if (doc.id !== "Image Match") continue;

          const subCollection = await getDocs(
            collection(doc.ref, "Collection"),
          );
          for (const subDoc of subCollection.docs) {
            const imageUrl = subDoc.data().image;
            const downloadUrl = await getImageDownloadUrl(imageUrl);
            imageUrls.push(downloadUrl);
          }
        }

        setImgUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
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
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error getting download URL:", error);
      return "";
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
    const isCorrect = selectedOption === currentWord.word;
    setScore(score + (isCorrect ? 1 : 0));
    setTotalScore(totalScore + 1);
    setAlertMessage(
      isCorrect ? "Your answer is correct!" : "Your answer is incorrect!",
    );
    setShowAlert(true);
  };

  const nextWord = () => {
    if (currentWordIndex < vocabList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSelectedOption("");
    } else {
      Alert.alert(
        "Game Over",
        `You have finished the game! Your final score is ${score}.`,
        [{ text: "OK" }],
      );
      homeworkComplete();
    }
  };

  const homeworkComplete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found.");
      return;
    }

    const userHomeworkRef = doc(
      db,
      "Users",
      user.uid,
      "Homework",
      data,
      "2",
      "Vocab Match Photo",
    );
    try {
      const homeworkDoc = await getDoc(userHomeworkRef);
      const dataToSet = {
        completed_time: new Date(),
        score: score,
        total_score: totalScore,
      };

      if (!homeworkDoc.exists() || score > homeworkDoc.data().score) {
        await setDoc(userHomeworkRef, dataToSet);
        // console.log('Homework completion data stored successfully.');
      } else {
        // console.log('Existing score is higher or equal. No update made.');
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error storing homework completion data:", error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      Alert.alert("Result", alertMessage, [
        {
          text: "OK",
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
              {selectedOption === option && (
                <View style={styles.radioButtonSelected} />
              )}
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    padding: 10,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#CCCCCC",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 7,
    backgroundColor: "gray",
  },
  optionText: {
    fontSize: 16,
  },
});

export default VocabMatchPhotoScreen;
