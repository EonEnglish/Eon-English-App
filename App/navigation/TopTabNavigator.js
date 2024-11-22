import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Homework from '../screens/Homework';
import VocabMatchScreen from '../screens/VocabMatchScreen';
import VocabMatchPhotoScreen from '../screens/VocabMatchPhotoScreen';
import Lessons from '../screens/Lessons';
import FillInTheBlankScreen from '../screens/FillInTheBlankScreen';
import ContactUs from '../screens/ContactUs';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';


StatusBar.setBarStyle('dark-content');
const background = { contentStyle: {backgroundColor: '#F1F1F1'} };
const Stack = createNativeStackNavigator();
const screenOptionsWithBackButton = (title) => ({
  title: title,
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#F4F4F4' },
  headerTintColor: '#363636',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 20
  },
});


const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Home')} 
        name="Home" 
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const HomeworkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
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

const ContactUsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Contact Us')} 
        name="ContactUs" 
        component={ContactUs}
      />
    </Stack.Navigator>
  );
};

const ScheduleNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Schedule')} 
        name="Schedule" 
        component={ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={background}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={screenOptionsWithBackButton('Profile')}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={screenOptionsWithBackButton('About')}
      />
      <Stack.Screen
        name="PasswordResetScreen"
        component={PasswordResetScreen}
        options={{ title: 'Reset Password' }}
      />
    </Stack.Navigator>
  );
};


export { 
  HomeNavigator, 
  HomeworkNavigator, 
  ProfileNavigator, 
  ScheduleNavigator, 
  ContactUsNavigator 
};