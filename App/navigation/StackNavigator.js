import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
