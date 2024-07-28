import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import HomeworkNavigator from './HomeworkNavigator';
import ContactUs from '../screens/ContactUs';
import ScheduleScreen from '../screens/ScheduleScreen';
import { Ionicons } from '@expo/vector-icons'; // Example icon library, adjust as needed

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen options={{ headerShown: false }} name="Homework" component={HomeworkNavigator} />
      <Drawer.Screen 
        options={({ navigation }) => ({
          title: 'Contact Us',
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back"
              size={24}
              color="black"
              backgroundColor="transparent"
              onPress={() => navigation.goBack()}
            />
          ),
        })} 
        name="Contact Us" 
        component={ContactUs}
      />
    <Drawer.Screen name="Schedule" component={ScheduleScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
