import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileNavigator from './ProfileNavigator';
import HomeworkNavigator from './HomeworkNavigator';
import ContactUsNavigator from './ContactUsNavigator'
import HomeNavigator from './HomeNavigator';
import ScheduleNavigator from './ScheduleNavigator';
import { View, Dimensions } from 'react-native';


const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
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

          return (
          <View
            style={{
              backgroundColor: focused ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 9,
              paddingVertical: 7,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? '#007AFF' : 'grey'}
            />
          </View>
        );

        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopColor: '#ccc',
          paddingBottom: 10,
          paddingHorizontal: 7,
          height: height / 11,
        }
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
