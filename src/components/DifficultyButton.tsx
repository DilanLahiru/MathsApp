import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Get device dimensions
const {width, height} = Dimensions.get('window');

type ButtonPropsType = {
  label: string;
  onPress: () => void;
  isSelected: boolean;
};

const DifficultyButton: React.FC<ButtonPropsType> = ({
  label,
  onPress,
  isSelected,
}) => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#bf6336','#a47551']} style={styles.button}>
    <TouchableOpacity
      onPress={onPress}>
      <Text style={[styles.btntext, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width / 1.5,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: height / 40,
    marginTop: height / 40,
    borderColor: '#d1d0d0',
    borderWidth: 2
  },
  btntext: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: '#212f3c',
    fontFamily: 'Kanit-Medium',
  },
  selectedText: {
    color: '#fff',
  },
});

export default DifficultyButton;
