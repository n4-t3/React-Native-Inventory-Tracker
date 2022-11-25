import { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';

import {createCategoriesTable , fetchCategories} from './storage/dataBase'

import HomeScreen from './screens/home.screen';
import ProfileScreen from './screens/profile.screen';
import InventoryScreen from './screens/inventory.screen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [data,setData] = useState()

  useEffect(()=>{
    const getDataBase = async ()=>{
      await createCategoriesTable()
      const fetchCategoriesData = await fetchCategories()
      setData(fetchCategoriesData)
    }
    getDataBase()
  },[])

  return (
    <>
    <StatusBar style="light" />
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="HomeScreen"
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
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          tabBarLabel: 'HomeScreen',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="InventoryScreen" component={InventoryScreen} options={{
          tabBarLabel: 'InventoryScreen',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-file-outline" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
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
