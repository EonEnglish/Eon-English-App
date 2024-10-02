import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert, Animated, PanResponder } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getDoc, doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import Container from '../components/Container';
import ScoreCounter from '../components/ScoreCounter';

const Fill_In_The_Blank_Screen = ({ navigation, route }) => {
  const [sentenceList, setSentenceList] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const { data } = route.params;

  //Drag
  const [questionContainerLayout, setQuestionContainerLayout] = useState(null);
  const [draggedOption, setDraggedOption] = useState(null); // Track the option being dragged
  const [dropAreaEntered, setDropAreaEntered] = useState(false); // Track if an option is over the drop area

  const itemPans = useRef([]);
  const panResponders = useRef([]);

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const Collection = await getDocs(collection(db, data));
        Collection.forEach(async (doc) => {
          if (doc.id === 'Blank Match') {
            const subCollection = await getDocs(collection(doc.ref, 'Collection'));
            const sentence = subCollection.docs.map(doc => doc.data());
            setSentenceList(sentence);
          }
        });
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    fetchSentence();
  }, []);

  console.log(sentenceList)

  useEffect(() => {
    if (sentenceList.length > 0) {
      const currentSentence = sentenceList[currentWordIndex];
      setOptions(generateOptions(currentSentence.answer));
    }

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
    if (options.length > 0) {
      panResponders.current = options.map((item, index) =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            itemPans.current[index].setValue({ x: gestureState.dx, y: gestureState.dy });

            const isOverDropArea = isPointInDropArea(gestureState.moveX, gestureState.moveY);
            setDropAreaEntered(isOverDropArea);

            if (isOverDropArea && !scoreUpdated) {

              setScoreUpdated(true);

              if (options[index] === sentenceList[currentWordIndex].answer) {
                setScore(score + 1);
                setTotalScore(totalScore + 1);
                setAlertMessage('Your answer is correct!');
                setDropAreaEntered(false);
              }
              else {
                setTotalScore(totalScore + 1);
                setAlertMessage('Your answer is incorrect!');
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
        })
      );
    }
  }

  initializePanResponders();

  const isPointInDropArea = (x, y) => {
    if (!questionContainerLayout) return false;
    const { x: containerX, y: containerY, width, height } = questionContainerLayout;

    const dropAreaLeft = containerX; // Left edge of the questionContainer
    const dropAreaRight = containerX + width; // Right edge of the questionContainer
    const dropAreaTop = containerY; // Top edge of the questionContainer
    const dropAreaBottom = containerY + height; // Bottom edge of the questionContainer

    return x > dropAreaLeft && x < dropAreaRight && y > dropAreaTop && y < dropAreaBottom;
  };

  const handleQuestionContainerLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setQuestionContainerLayout({ x, y, width, height });
  };

  const homeworkComplete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('No authenticated user found.');
      return;
    }

    const userHomeworkRef = doc(db, "Users", user.uid, "Homework", data, "3", "Fill In The blank");

    try {
      const homeworkDoc = await getDoc(userHomeworkRef);

      if (homeworkDoc.exists()) {
        const existingData = homeworkDoc.data();

        if (score <= existingData.score)
          return; // Early return if no update is needed

        // Update the document with the higher score
        await setDoc(userHomeworkRef, {
          completed_time: new Date(),
          score: score,
          total_score: totalScore,
        });

        console.log('Homework completion data updated successfully with a higher score.');
        return;

      } else {
        // Document doesn't exist, so create a new one
        await setDoc(userHomeworkRef, {
          completed_time: new Date(),
          score: score,
          total_score: totalScore,
        });

        console.log('Homework completion data stored successfully.');
      }
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
      Alert.alert('Game Over', `You have finished the game! Your final score is ${score}.`, [
        { text: 'OK' },
      ]);
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
          <Text style={styles.questionText}>{sentenceList[currentWordIndex].question}</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionText}>
            {panResponders.current &&
              <Animated.View
                style={{
                  transform: [{ translateX: itemPans.current[index]?.x }, { translateY: itemPans.current[index]?.y }],
                }}
                {...panResponders.current[index]?.panHandlers}
              >
                <Text>{option}</Text>
              </Animated.View>
            }
          </View>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20, // Change isPointInDropArea padding if editing this value
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  score: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default Fill_In_The_Blank_Screen;