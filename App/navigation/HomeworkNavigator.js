import React, { useEffect } from 'react';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homework from '../screens/Homework';
import VocabMatchScreen from '../screens/VocabMatchScreen';
import VocabMatchPhotoScreen from '../screens/VocabMatchPhotoScreen';
import Lessons from '../screens/Lessons';
import FillInTheBlankScreen from '../screens/FillInTheBlankScreen';
import { Ionicons } from '@expo/vector-icons'; // Example icon library, adjust as needed


const Stack = createNativeStackNavigator();

const HomeworkNavigator = ({ navigation }) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Add a delay before dispatching the reset action
  //     const delay = setTimeout(() => {
  //       const resetAction = CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: 'HomeWork' }], // Replace 'Homework' with your first screen's name
  //       });
  //       navigation.dispatch(resetAction);
  //     }, 100); // Adjust the delay as needed

  //     // Cleanup function to clear the timeout
  //     return () => clearTimeout(delay);
  //   }, [navigation])
  // );

  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Homework')} 
        name="HomeWork" 
        component={Homework}
      />
      <Stack.Screen 
        options={screenOptionsWithBackButton('Lessons')}
        name="Lessons" 
        component={Lessons}
      />
      <Stack.Screen 
        options={screenOptionsWithBackButton('Vocab Match')}
        name="VocabMatch" 
        component={VocabMatchScreen}
      />
      <Stack.Screen 
        options={screenOptionsWithBackButton('Vocab Match Photo')}
        name="VocabMatchPhoto" 
        component={VocabMatchPhotoScreen}
      />
      <Stack.Screen 
        options={screenOptionsWithBackButton('Blank Match')}
        name="BlankMatch" 
        component={FillInTheBlankScreen}
      />
    </Stack.Navigator>
  );
};

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title,
  headerLeft: () => (
    <Ionicons.Button
      name="arrow-back"
      size={24}
      color="black"
      backgroundColor="transparent"
      onPress={() => navigation.goBack()}
    />
  ),
});

export default HomeworkNavigator;
