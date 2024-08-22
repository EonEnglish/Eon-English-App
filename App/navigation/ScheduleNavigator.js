import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleScreen from '../screens/ScheduleScreen';

const Stack = createNativeStackNavigator();
const ScheduleNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={screenOptionsWithBackButton('Schedule')} 
        name="Schedule" 
        component={ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

const screenOptionsWithBackButton = (title) => ({ navigation }) => ({
  title: title
});

export default ScheduleNavigator;
