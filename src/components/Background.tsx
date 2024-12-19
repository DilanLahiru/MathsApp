import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Get device dimensions
const { width } = Dimensions.get('window')

const Background = ({children} : {children: React.ReactNode}) => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#fc4a1a','#f7b733']} style={styles.container}>
        {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
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

export default Background