import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import welcomeScreen from '../screens/WelcomeScreen';
import mainScreen from '../screens/MainScreen';
import gameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='welcome' component={welcomeScreen}/>
            <Stack.Screen name='main' component={mainScreen}/>
            <Stack.Screen name='game' component={gameScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;