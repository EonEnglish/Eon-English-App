import React, { useState, useEffect, useRef, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Animated, PanResponder, TouchableOpacity, handleBoxDrop } from 'react-native';
import { getDocs, collection } from '@firebase/firestore';
import { db } from '../firebase';

const Fill_In_The_Blank_Screen = ({ route }) => {
  const [sentenceList, setSentenceList] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
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

            if(isOverDropArea && !scoreUpdated){

              setScoreUpdated(true);

              if(options[index] === sentenceList[currentWordIndex].answer){
                setScore(score + 1);
                setAlertMessage('Your answer is correct!');
                setDropAreaEntered(false);
              }
              else{
                setAlertMessage('Your answer is incorrect!');
                setDropAreaEntered(false);
              }
              setShowAlert(true);
            }
          },
          onPanResponderRelease: () => {
            // Handle release logic here if needed
            if(!dropAreaEntered){
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
    }
  };

  if (sentenceList.length === 0) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.container}>
      <View onLayout={handleQuestionContainerLayout}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{sentenceList[currentWordIndex].question}</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionText}>
            {panResponders.current&& 
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
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    //Remeber to change the padding in isPointInDropArea if change this
    padding: 20,
    borderWidth: 1,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  score: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default Fill_In_The_Blank_Screen;