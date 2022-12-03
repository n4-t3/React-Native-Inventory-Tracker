import { useEffect,useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import colors from './colors';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createCategoriesTable, fetchCategories} from './storage/categoriesDB'
import DataContext from './context/categoriesContextProvider';

import HomeScreen from './screens/home.screen';
import CategoryScreen from './screens/category.screen';
import ProfileScreen from './screens/profile.screen';
import InventoryScreen from './screens/inventory.screen';

const Stack = createNativeStackNavigator();

const HomeStackScreen = ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Category',
          headerStyle: {
            backgroundColor: colors.secondaryBackground,
          },
          headerTintColor: colors.fontColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [categories,setCategories] = useState(null)

  useEffect(()=>{
    const getCategories = async ()=>{
      await createCategoriesTable()
      const fetchCategoriesData = await fetchCategories()
      setCategories(fetchCategoriesData)
    }
    getCategories()
  },[])


  return (
    <>
    <StatusBar style="light" />
    <DataContext.Provider value={{categories,setCategories}}>
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
          <Tab.Screen name="HomeScreen" component={HomeStackScreen} options={{
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
    </DataContext.Provider>
    </>
  );
}
