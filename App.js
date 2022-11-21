import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';

import HomeScreen from './screens/home.screen';
import Categories from './components/categories.component';
import InputField from './components/inputField.component';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="light" />
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.activePage,
          tabBarInactiveTintColor: colors.inactivePage,
          tabBarActiveBackgroundColor: colors.secondaryBackground,
          tabBarInactiveBackgroundColor: colors.secondaryBackground,
          tabBarHideOnKeyboard:true,
          tabBarStyle: {
            borderTopWidth: 0
          }
          }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="InputField" component={InputField} options={{
          tabBarLabel: 'files',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-file-outline" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Categories" component={Categories} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}
