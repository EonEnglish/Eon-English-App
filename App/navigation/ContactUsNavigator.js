import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactUs from '../screens/ContactUs';

const Stack = createNativeStackNavigator();
const ContactUsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Contact Us')} 
        name="ContactUs" 
        component={ContactUs}
      />
    </Stack.Navigator>
  );
};

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title
});

export default ContactUsNavigator;
