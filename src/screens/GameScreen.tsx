import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import {RootState} from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDifficultyLavel } from '../redux/gameSlice';

const GameScreen = () => {

  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ question: string; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const {gameType} = useSelector((state: RootState) => state.game);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeout();
    }
  }, [timeLeft]);

  const selectGameDifficultyType = (type: string) => {
    dispatch(setDifficultyLavel({
      gameType: type,
    }))
  }

  const generateQuestion = () => {
    if (!gameType) {
      Alert.alert('Error', 'Please select a difficulty level before starting the game.');
      return;
    }
  
    let num1: number;
    let num2: number;
  
    switch (gameType.toLowerCase()) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        break;
      default:
        Alert.alert('Error', 'Invalid difficulty level selected.');
        return;
    }
  
    const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  
    let correctAnswer: string | number = 0;
    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = num2 !== 0 ? (num1 / num2).toFixed(2) : '0';
        break;
    }
  
    setQuestion(`${num1} ${operation} ${num2}`);
    setAnswer(correctAnswer.toString());
    setUserAnswer('');
    setTimeLeft(10);
  };
  

  const checkAnswer = () => {
    const isCorrect = userAnswer === answer;
    if (isCorrect) {
      setScore(score + 1);
      Alert.alert('Correct!', `Well done! The answer is indeed ${answer}.`);
    } else {
      Alert.alert('Incorrect', `The correct answer was ${answer}.`);
    }

    setHistory([...history, { question: `${question} = ${userAnswer}`, correct: isCorrect }]);
    generateQuestion();
  };

  const handleTimeout = () => {
    Alert.alert('Time Up!', `You ran out of time. The correct answer was ${answer}.`);
    setHistory([...history, { question: `${question} = ${userAnswer || 'No Answer'}`, correct: false }]);
    generateQuestion();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Math Skills Practice</Text>

      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Difficulty:</Text>
        <TouchableOpacity
          style={[styles.difficultyButton, gameType === 'Easy' && styles.activeButton]}
          onPress={() => {
            selectGameDifficultyType('Easy')
          }}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.difficultyButton, gameType === 'Medium' && styles.activeButton]}
          onPress={() => selectGameDifficultyType('Medium')}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.difficultyButton, gameType === 'Hard' && styles.activeButton]}
          onPress={() => selectGameDifficultyType('Hard')}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>{question}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Your answer"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />

      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={generateQuestion}>
        <Text style={styles.buttonText}>New Question</Text>
      </TouchableOpacity>

      <Text style={styles.score}>Score: {score}</Text>

      <Text style={styles.historyTitle}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {item.question} - {item.correct ? 'Correct' : 'Wrong'}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  difficultyLabel: {
    fontSize: 18,
    marginRight: 10,
    alignSelf: 'center',
  },
  difficultyButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  timer: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  historyItem: {
    fontSize: 16,
    padding: 5,
  },
});

export default GameScreen;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

