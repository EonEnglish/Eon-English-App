import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={screenOptions('Profile')}
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

const screenOptions = (title) => ({ navigation }) => ({
  title: title,
  headerTitleAlign: 'center'
});

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title,
  headerTitleAlign: 'center',
});


export default ProfileNavigator;