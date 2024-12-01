import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Homework from "../screens/Homework";
import VocabMatchScreen from "../screens/VocabMatchScreen";
import VocabMatchPhotoScreen from "../screens/VocabMatchPhotoScreen";
import Lessons from "../screens/Lessons";
import FillInTheBlankScreen from "../screens/FillInTheBlankScreen";
import ContactUs from "../screens/ContactUs";
import ScheduleScreen from "../screens/ScheduleScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";

StatusBar.setBarStyle("dark-content");
const background = { contentStyle: { backgroundColor: "#F1F1F1" } };
const Stack = createNativeStackNavigator();
const screenOptionsWithBackButton = (title) => ({
  title: title,
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#F4F4F4" },
  headerTintColor: "#363636",
  headerTitleStyle: {
    fontWeight: "800",
    fontSize: 20,
  },
});

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen
        options={screenOptionsWithBackButton("Home")}
        name="HomeStack"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const HomeworkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen
        options={screenOptionsWithBackButton("Homework")}
        name="HomeworkStack"
        component={Homework}
      />
      <Stack.Screen
        options={screenOptionsWithBackButton("Lessons")}
        name="LessonsStack"
        component={Lessons}
      />
      <Stack.Screen
        options={screenOptionsWithBackButton("Vocab Match")}
        name="VocabMatchStack"
        component={VocabMatchScreen}
      />
      <Stack.Screen
        options={screenOptionsWithBackButton("Vocab Match Photo")}
        name="VocabMatchPhotoStack"
        component={VocabMatchPhotoScreen}
      />
      <Stack.Screen
        options={screenOptionsWithBackButton("Blank Match")}
        name="BlankMatchStack"
        component={FillInTheBlankScreen}
      />
    </Stack.Navigator>
  );
};

const ContactUsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen
        options={screenOptionsWithBackButton("Contact Us")}
        name="ContactUsStack"
        component={ContactUs}
      />
    </Stack.Navigator>
  );
};

const ScheduleNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen
        options={screenOptionsWithBackButton("Schedule")}
        name="ScheduleStack"
        component={ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={background}
    >
      <Stack.Screen
        name="ProfileScreenStack"
        component={ProfileScreen}
        options={screenOptionsWithBackButton("Profile")}
      />
      <Stack.Screen
        name="AboutScreenStack"
        component={AboutScreen}
        options={screenOptionsWithBackButton("About")}
      />
      <Stack.Screen
        name="PasswordResetScreenStack"
        component={PasswordResetScreen}
        options={{ title: "Reset Password" }}
      />
    </Stack.Navigator>
  );
};

export {
  HomeNavigator,
  HomeworkNavigator,
  ProfileNavigator,
  ScheduleNavigator,
  ContactUsNavigator,
};
