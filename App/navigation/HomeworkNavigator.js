import React, { useEffect } from 'react';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homework from '../screens/Homework';
import VocabMatchScreen from '../screens/VocabMatchScreen';
import VocabMatchPhotoScreen from '../screens/VocabMatchPhotoScreen';
import Lessons from '../screens/Lessons';

const Stack = createNativeStackNavigator();

const HomeworkNavigator = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Add a delay before dispatching the reset action
      const delay = setTimeout(() => {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeWork' }], // Replace 'Homework' with your first screen's name
        });
        navigation.dispatch(resetAction);
      }, 100); // Adjust the delay as needed

      // Cleanup function to clear the timeout
      return () => clearTimeout(delay);
    }, [navigation])
  );

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="HomeWork" component={Homework}/>
      <Stack.Screen options={{ headerShown: false }} name="Lessons" component={Lessons}/>
      <Stack.Screen options={{ headerShown: false }} name="VocabMatch" component={VocabMatchScreen}/>
      <Stack.Screen options={{ headerShown: false }} name="VocabMatchPhoto" component={VocabMatchPhotoScreen}/>
    </Stack.Navigator>
  );
};

export default HomeworkNavigator;
