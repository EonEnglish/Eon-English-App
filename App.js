import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./src/navigation/StackNavigator";
import { LanguageProvider } from "./src/components/LanguageContext";

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
