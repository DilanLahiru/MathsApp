import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Background from '../components/Background';
import DifficultyButton from '../components/DifficultyButton';
import { setDifficultyLavel } from '../redux/gameSlice';
import {useDispatch} from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  main: undefined,
  game: undefined,
};

type MainScreenNavigationProps = StackNavigationProp<RootStackParamList, 'main'>

const MainScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<MainScreenNavigationProps>(); // Navigation with typing
  
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const selectType = (type: string) => {
     setSelectedLevel(type);
     dispatch(setDifficultyLavel({
      gameType: type
    }))
    navigation.navigate('game');
  }

  return (
    <Background>
      <View style={styles.titleSection}>
        <Text style={styles.title}>SELECT YOUR LAVEL</Text>
      </View>
      {difficulties.map(lavel => (
        <DifficultyButton
          key={lavel}
          label={lavel}
          isSelected={selectedLevel === lavel}
          onPress={() => selectType(lavel)}
        />
      ))}
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.08,
    textAlign: 'center',
    color: '#212f3c',
    fontFamily: 'Kanit-SemiBold',
  },
  titleSection: {
    width: width,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
});

export default MainScreen;
