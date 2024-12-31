import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Container from "../components/Container";
import ScoreCounter from "../components/ScoreCounter";
import { CompleteHomework, GetHomework } from "../services/lesson.service";
import { VocabEnum } from "../lib/constant";

export const FillInTheBlankScreen = ({ navigation, route }) => {
  const [sentenceList, setSentenceList] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const { lesson_id } = route.params;

  //Drag
  const [questionContainerLayout, setQuestionContainerLayout] = useState(null);
  const [dropAreaEntered, setDropAreaEntered] = useState(false); // Track if an option is over the drop area

  const itemPans = useRef([]);
  const panResponders = useRef([]);

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const vocab = await GetHomework(lesson_id, VocabEnum.FILL_BLANK);
        setSentenceList(vocab);
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    fetchSentence();
  }, []);

  // console.log(sentenceList)

  useEffect(() => {
    if (!sentenceList.length) {
      return;
    }

    const currentSentence = sentenceList[currentWordIndex];
    setOptions(generateOptions(currentSentence.answer));
  }, [sentenceList, currentWordIndex]);

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * sentenceList.length);
      const randomWord = sentenceList[randomIndex].answer;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    itemPans.current = options.map(() => new Animated.ValueXY());
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    initializePanResponders();
  }, [options]);

  const initializePanResponders = () => {
    if (!options.length) {
      return;
    }

    panResponders.current = options.map((item, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          itemPans.current[index].setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });

          const isOverDropArea = isPointInDropArea(
            gestureState.moveX,
            gestureState.moveY,
          );
          setDropAreaEntered(isOverDropArea);

          if (isOverDropArea && !scoreUpdated) {
            setScoreUpdated(true);

            if (options[index] === sentenceList[currentWordIndex].answer) {
              setScore(score + 1);
              setTotalScore(totalScore + 1);
              setAlertMessage("Your answer is correct!");
              setDropAreaEntered(false);
            } else {
              setTotalScore(totalScore + 1);
              setAlertMessage("Your answer is incorrect!");
              setDropAreaEntered(false);
            }
            setShowAlert(true);
          }
        },
        onPanResponderRelease: () => {
          // Handle release logic here if needed
          if (!dropAreaEntered) {
            Animated.spring(itemPans.current[index], {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    );
  };

  initializePanResponders();

  const isPointInDropArea = (x, y) => {
    if (!questionContainerLayout) return false;

    const {
      x: containerX,
      y: containerY,
      width,
      height,
    } = questionContainerLayout;

    const dropAreaLeft = containerX; // Left edge of the questionContainer
    const dropAreaRight = containerX + width; // Right edge of the questionContainer
    const dropAreaTop = containerY; // Top edge of the questionContainer
    const dropAreaBottom = containerY + height + 55; // Bottom edge of the questionContainer

    return (
      x > dropAreaLeft &&
      x < dropAreaRight &&
      y > dropAreaTop &&
      y < dropAreaBottom
    );
  };

  const handleQuestionContainerLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setQuestionContainerLayout({ x, y, width, height });
  };

  const homeworkComplete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      await CompleteHomework(user.uid, lesson_id, {
        totalScore,
        score,
        type: VocabEnum.FILL_BLANK,
      });
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
            setScoreUpdated(false);
            nextSentence();
          },
        },
      ]);
    }
  }, [showAlert]);

  const nextSentence = () => {
    if (currentWordIndex < sentenceList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      Alert.alert(
        "Game Over",
        `You have finished the game! Your final score is ${score}.`,
        [{ text: "OK" }],
      );
      homeworkComplete();
      navigation.goBack();
    }
  };

  if (sentenceList.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container style={styles.centerContainer}>
      <ScoreCounter>Score: {score}</ScoreCounter>
      <View onLayout={handleQuestionContainerLayout}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {sentenceList[currentWordIndex].question}
          </Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionText}>
            {panResponders.current && (
              <Animated.View
                style={{
                  transform: [
                    { translateX: itemPans.current[index]?.x },
                    { translateY: itemPans.current[index]?.y },
                  ],
                }}
                {...panResponders.current[index]?.panHandlers}
              >
                <Text>{option}</Text>
              </Animated.View>
            )}
          </View>
        ))}
      </View>
    </Container>
  );
};

FillInTheBlankScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 20, // Change isPointInDropArea padding if editing this value
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 7,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 7,
  },
  score: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default FillInTheBlankScreen;
