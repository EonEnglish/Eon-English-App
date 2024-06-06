import HomeScreen from '../screens/HomeScreen';
import HomeworkNavigator from './HomeworkNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Homework" component={HomeworkNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;