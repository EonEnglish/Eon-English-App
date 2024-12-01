import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./src/navigation/StackNavigator";
import { LanguageProvider } from "./src/components/LanguageContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </LanguageProvider>
  );
}
