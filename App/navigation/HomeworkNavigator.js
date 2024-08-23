import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homework from '../screens/Homework';
import VocabMatchScreen from '../screens/VocabMatchScreen';
import VocabMatchPhotoScreen from '../screens/VocabMatchPhotoScreen';
import Lessons from '../screens/Lessons';
import FillInTheBlankScreen from '../screens/FillInTheBlankScreen';
import { Ionicons } from '@expo/vector-icons'; // Example icon library, adjust as needed
import ContactUs from '../screens/ContactUs';


const Stack = createNativeStackNavigator();

const HomeworkNavigator = ({ navigation }) => {

  return (
    <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: '#F5F5F5'}}}>
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
  title: title
});

export default HomeworkNavigator;
