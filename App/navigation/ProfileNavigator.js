import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import { Ionicons } from '@expo/vector-icons'; // Example icon library, adjust as needed

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
        name="AboutScreen" 
        component={AboutScreen} 
        options={ screenOptionsWithBackButton('') } 
      />
      <Stack.Screen 
        name="PasswordResetScreen" 
        component={PasswordResetScreen} 
        options={{ title: 'Reset Password' }} 
      />
    </Stack.Navigator>
  );
};

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title,
  headerTitleAlign: 'center',
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

export default ProfileNavigator;