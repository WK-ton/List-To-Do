import { StatusBar, } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useState,useEffect} from 'react';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import ListTotal from './src/Screens/ListTotal';
import HomeList from './src/Screens/HomeList';
import Search from './src/Screens/Search';
import Setting from './src/Screens/Setting';
import IconButton from './UI/IconButton';
import ContactScreen from './src/Screens/ContactScreen';
import { LogBox } from 'react-native';
import Theme from './src/Screens/Theme';
import { EventRegister } from 'react-native-event-listeners';

LogBox.ignoreLogs(['Sending']);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs () {

  const [isDarkEnabled, setIsDarkEnabled] = useState(false)
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setIsDarkEnabled(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [isDarkEnabled])

  return (
      <Tab.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: {backgroundColor: isDarkEnabled ? '#262626' : GlobalStyles.colors.primary50},
            headerTintColor: "#FFFF",
            activeColor: GlobalStyles.colors.primary50,
            inactiveColor:"black",
            tabBarStyle: {backgroundColor: isDarkEnabled ? '#262626' : '#fafafa'},
            // headerRight: ({tintColor}) => (
            //   <IconButton 
            //   icon="notifications-outline" 
            //   size={24} 
            //   color={tintColor}
            //   onPress ={() => {
            //      navigation.navigate('');
            //   }}
            //   />
            //   ),
          })}
      >
        <Tab.Screen 
          name="Search" 
          component={Search} 
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-search-outline" size={24} color={color} />
            ),
          }}    
          />
        <Tab.Screen 
          name="HomeList" 
          component={HomeList} 

          options={{
            tabBarLabel: 'List',
            headerTitle: 'Good Morning ☀',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-list-circle-outline" color={color} size={26} />
            ),
          }}    
          />
        <Tab.Screen 
          name="Total List" 
          component={ListTotal} 
          options={{
            headerTitle: 'Total List',
            tabBarIcon: ({ color }) => (
              <AntDesign name="inbox" size={24} color={color} />
            ),
          }}    
          />
        <Tab.Screen 
        name="Setting" 
        component={Setting} 
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings-outline" color={color} size={26} />
          ),
        }}      
        />
      </Tab.Navigator>
  );
}
export default function App () {

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary50},
          headerTintColor: "#FFFF",
        }}
        >
          <Stack.Screen
            name = "Tabs"
            component={Tabs}
            options={{ headerShown: false}}
          /> 
          <Stack.Screen
            name = "Contact"
            component={ContactScreen}
          />
          <Stack.Screen
            name = "Theme"
            component={Theme}
          />
        </Stack.Navigator>
      </NavigationContainer>   
    </>
  )
}
