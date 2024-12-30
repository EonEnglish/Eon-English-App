import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "./src/components/LanguageContext";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
