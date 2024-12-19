import React, { useRef, useEffect } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import Background from '../components/Background'

// Get device dimensions
const { width, height } = Dimensions.get('window')

// Define navigation types
type RootStackParamList = {
  welcome: undefined
  main: undefined
};

type WelcomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'welcome'>


const WelcomeScreen = () => {

  const navigation = useNavigation<WelcomeScreenNavigationProps>(); // Navigation with typing  

 // Create an animated value to control opacity
const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0 (fully transparent)

// Use useEffect to start the animation as soon as the component mounts
useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value (fully opaque)
      duration: 5000, // Animation duration (2 seconds)
      useNativeDriver: true, // Enable native driver for performance
    }).start();

    setTimeout(() => {
      navigation.navigate('main');
    }, 7000);
  }, [fadeAnim]);
     

  return (
      <Background>
        <Animated.Text style={[styles.title, {opacity: fadeAnim}]}>MASTER MAIND</Animated.Text>
      </Background>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
        backgroundColor: 'gray'
     },
    title: { 
        fontSize: width * 0.1, 
        textAlign: 'center', 
        color: '#212f3c',
        fontFamily: 'Kanit-Medium'
    },
    logo: {
        overflow: 'hidden',
    }    
});

export default WelcomeScreen;