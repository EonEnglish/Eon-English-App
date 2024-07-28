import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PasswordResetScreen" 
        component={PasswordResetScreen} 
        options={{ title: 'Reset Password' }} 
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
