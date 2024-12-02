import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Dimensions } from "react-native";
import {
  HomeNavigator,
  HomeworkNavigator,
  ProfileNavigator,
  ScheduleNavigator,
  ContactUsNavigator,
} from "./TopTabNavigator";

const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Homework":
              iconName = focused ? "school" : "school-outline";
              break;
            case "ContactUs":
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              break;
            case "Schedule":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "question";
          }

          return (
            <View
              style={{
                backgroundColor: focused
                  ? "rgba(0, 122, 255, 0.1)"
                  : "transparent",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: width < 768 ? 9 : 0, // for iPads
                paddingVertical: 7,
                borderRadius: 7,
              }}
            >
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? "#007AFF" : "grey"}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F6F6F6",
          borderBottomWidth: 0,
          paddingBottom: 20,
          paddingHorizontal: 7,
          height: height / 10,
          borderTopWidth: 0,
          shadowColor: "black",
          shadowOpacity: 0.06,
          shadowRadius: 20,
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Homework"
        component={HomeworkNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="ContactUs"
        component={ContactUsNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Schedule"
        component={ScheduleNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
