import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homework from '../screens/Homework';
import VocabMatchScreen from '../screens/VocabMatchScreen';

const Stack = createNativeStackNavigator();

const HomeworkNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Homework" component={Homework}/>
      <Stack.Screen options={{ headerShown: false }} name="VocabMatch" component={VocabMatchScreen}/>
    </Stack.Navigator>
  );
};

export default HomeworkNavigator;