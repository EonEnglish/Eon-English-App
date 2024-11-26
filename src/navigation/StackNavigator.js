import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import BottomTabNavigator from './BottomTabNavigator';


const background = { contentStyle: {backgroundColor: '#F9F9F9'} };
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={background}>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};


export default StackNavigator;