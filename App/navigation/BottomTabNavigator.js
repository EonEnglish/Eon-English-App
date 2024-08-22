import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileNavigator from './ProfileNavigator';
import HomeworkNavigator from './HomeworkNavigator';
import ContactUsNavigator from './ContactUsNavigator'
import HomeNavigator from './HomeNavigator';
import HomeScreen from '../screens/HomeScreen';
import ScheduleNavigator from './ScheduleNavigator';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Homework':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'ContactUs':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Schedule':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'question';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;

          switch (route.name) {
            case 'Home':
              label = 'Home';
              break;
            case 'Homework':
              label = 'Homework';
              break;
            case 'ContactUs':
              label = 'Contact Us';
              break;
            case 'Schedule':
              label = 'Schedule';
              break;
            case 'Profile':
              label = 'Profile';
              break;
            default:
              label = '';
          }

          return (
            <Text style={{ fontSize: 12, paddingBottom: 5, color: focused ? '#007AFF' : 'gray' }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          height: 90, 
          paddingBottom: 28, 
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeNavigator} />
      <Tab.Screen options={{ headerShown: false }} name="Homework" component={HomeworkNavigator} />
      <Tab.Screen options={{ headerShown: false }} name="ContactUs" component={ContactUsNavigator} />
      <Tab.Screen options={{ headerShown: false }} name="Schedule" component={ScheduleNavigator} />
      <Tab.Screen options={{ headerShown: false }} name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
