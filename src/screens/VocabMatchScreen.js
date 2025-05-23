import { collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput } from "react-native";
import { Container } from "../components/Container";
import { ScoreCounter } from "../components/ScoreCounter";
import { db } from "../services/firebase";
import { Loading } from "../components/Loading";

export const VocabMatchScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [vocabList, setVocabList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { data } = route.params;

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const vocabCollection = await getDocs(collection(db, data));
        const vocabMatchDoc = vocabCollection.docs.find(
          (doc) => doc.id === "Vocab Match",
        );
        if (vocabMatchDoc) {
          const subCollection = await getDocs(
            collection(vocabMatchDoc.ref, "Collection"),
          );
          setVocabList(subCollection.docs.map((doc) => doc.data()));
        }
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    setLoading(true);
    fetchVocabulary().finally(() => setLoading(false));
  }, [data]);

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
      isCorrect ? "Correct!" : "Incorrect",
      isCorrect
        ? "Keep up the good work!"
        : `The correct answer was ${currentWord.word}.`,
      [{ text: "OK", onPress: nextWord }],
    );
  };

  const nextWord = () => {
    if (currentWordIndex < vocabList.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput("");
    } else {
      navigation.goBack();
      Alert.alert("Game Over", `You finished! Final score: ${score}`, [
        { text: "OK", onPress: homeworkComplete },
      ]);
    }
  };

  const homeworkComplete = async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    const userHomeworkRef = doc(
      db,
      "Users",
      user.uid,
      "Homework",
      data,
      "1",
      "Vocab Match",
    );
    try {
      const homeworkDoc = await getDoc(userHomeworkRef);
      const docData = {
        completed_time: new Date(),
        score,
        total_score: totalScore,
      };
      if (!homeworkDoc.exists() || score > homeworkDoc.data().score) {
        await setDoc(userHomeworkRef, docData);
      }
    } catch (error) {
      console.error("Error updating homework:", error);
    }
  };

  return (
    <Loading
      isLoading={isLoading}
      style={{
        height: "100%",
      }}
    >
      <Container style={styles.centerContainer}>
        <ScoreCounter>Score: {score}</ScoreCounter>
        <Text style={styles.translation}>
          {vocabList?.[currentWordIndex]?.translation}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the word"
          value={userInput}
          onChangeText={setUserInput}
        />
        <Button title="Submit" onPress={checkAnswer} />
      </Container>
    </Loading>
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
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 7,
    padding: 15,
    fontSize: 14,
    marginBottom: 20,
  },
});

export default VocabMatchScreen;
