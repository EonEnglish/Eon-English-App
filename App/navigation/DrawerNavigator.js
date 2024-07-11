import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HomeworkNavigator from './HomeworkNavigator';
import ContactUs from '../screens/ContactUs';
import ScheduleScreen from '../screens/ScheduleScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Homework" component={HomeworkNavigator} />
      <Drawer.Screen name="Contact Us" component={ContactUs}/>
      <Drawer.Screen name="Schedule" component={ScheduleScreen}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
