import { getDownloadURL, getStorage, ref } from "firebase/storage";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "../components/Container";
import { ScoreCounter } from "../components/ScoreCounter";
import { auth } from "../services/firebase";
import { CompleteHomework, GetHomework } from "../services/lesson.service";
import { VocabEnum } from "../lib/constant";

export const VocabMatchPhotoScreen = ({ navigation, route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const { lesson_id } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const vocab = await GetHomework(lesson_id, VocabEnum.IMAGE);
        setVocabList(vocab);
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };

    fetchVocabulary().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!vocabList.length) {
      return;
    }

    const fetchImages = async () => {
      try {
        const imageUrls = [];

        for (const question of vocabList) {
          const downloadUrl = await getImageDownloadUrl(question.image);
          imageUrls.push(downloadUrl);
        }

        setImgUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages().catch((err) => console.log(err));
  }, [vocabList]);

  useEffect(() => {
    if (!vocabList.length) {
      return;
    }

    const currentWord = vocabList[currentWordIndex];
    setOptions(generateOptions(currentWord.answer));
  }, [vocabList, currentWordIndex]);

  const getImageDownloadUrl = async (imageUrl) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, imageUrl);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return "";
    }
  };

  const generateOptions = (correctWord) => {
    const options = [correctWord];
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * vocabList.length);
      const randomWord = vocabList[randomIndex].answer;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = () => {
    const currentWord = vocabList[currentWordIndex];
    const isCorrect = selectedOption === currentWord.answer;
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
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      await CompleteHomework(user.uid, lesson_id, {
        totalScore,
        score,
        type: VocabEnum.IMAGE,
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error storing homework completion data:", error);
    }
  };

  useEffect(() => {
    if (!showAlert) {
      return;
    }

    Alert.alert("Result", alertMessage, [
      {
        text: "OK",
        onPress: () => {
          setShowAlert(false);
          nextWord();
        },
      },
    ]);
  }, [showAlert]);

  if (vocabList.length === 0) {
    return <Text>Loading...</Text>;
  }

  // const currentWord = vocabList[currentWordIndex];
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

VocabMatchPhotoScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
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
