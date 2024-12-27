import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput } from "react-native";
import { Container } from "../components/Container";
import { ScoreCounter } from "../components/ScoreCounter";
import { VocabEnum } from "../lib/constant";
import { auth } from "../services/firebase";
import { CompleteHomework, GetHomework } from "../services/lesson.service";

export const VocabMatchScreen = ({ navigation, route }) => {
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { lesson_id } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const vocab = await GetHomework(lesson_id, "vocab");
        setVocabList(vocab);
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    fetchVocabulary();
  }, [lesson_id]);

  const checkAnswer = () => {
    const currentWord = vocabList[currentWordIndex];
    if (!currentWord) return;

    const userInputTrimmed = userInput.toLowerCase().trim();
    const correctAnswers = [currentWord.word, currentWord.word2].map((w) =>
      w?.toLowerCase().trim(),
    );

    const isCorrect = correctAnswers.includes(userInputTrimmed);
    setScore((prev) => (isCorrect ? prev + 1 : prev));
    setTotalScore((prev) => prev + 1);
    Alert.alert(
      "Result",
      isCorrect ? "Your answer is correct!" : "Your answer is incorrect!",
      [{ text: "OK", onPress: nextWord }],
    );
  };

  const nextWord = () => {
    if (currentWordIndex < vocabList.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput("");
      return;
    }

    // move back if answered all
    navigation.goBack();
    Alert.alert("Game Over", `You finished! Final score: ${score}`, [
      { text: "OK", onPress: homeworkComplete },
    ]);
  };

  const homeworkComplete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await CompleteHomework(user.uid, lesson_id, {
        totalScore,
        score,
        type: VocabEnum.VOCAB,
      });
    } catch (error) {
      console.error("Error updating homework:", error);
    }
  };

  if (vocabList.length === 0) return <Text>Loading...</Text>;

  return (
    <Container style={styles.centerContainer}>
      <ScoreCounter>Score: {score}</ScoreCounter>
      <Text style={styles.translation}>
        {vocabList[currentWordIndex].question}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the word"
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Submit" onPress={checkAnswer} />
    </Container>
  );
};

VocabMatchScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  translation: {
    fontSize: 35,
    marginBottom: 20,
    color: "#8E8E8F",
  },
  input: {
    width: "90%",
    borderWidth: 3,
    borderColor: "#CCCCCC",
    borderRadius: 7,
    padding: 15,
    fontSize: 14,
    marginBottom: 20,
  },
});

export default VocabMatchScreen;
