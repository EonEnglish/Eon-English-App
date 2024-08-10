import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();
const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Eon English')} 
        name="Home" 
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title
});

export default HomeNavigator;
