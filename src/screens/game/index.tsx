import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../constants/theme';
import {easyQuestions, hardQuestions, normalQuestions} from '../../constants';
import Button from '../../assets/button';
import {SCREEN} from '../../constants/screen';

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Game = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {level} = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  const questions =
    level === 'easy'
      ? easyQuestions
      : level === 'normal'
      ? normalQuestions
      : hardQuestions;

  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffleArray(questions),
  );

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem('gameLevel');
        const savedIndex = await AsyncStorage.getItem('currentQuestionIndex');
        const savedTime = await AsyncStorage.getItem('timeLeft');

        if (savedLevel === level) {
          setCurrentQuestionIndex(savedIndex ? parseInt(savedIndex) : 0);
          setTimeLeft(savedTime ? parseInt(savedTime) : 45 * 60);
        }
      } catch (error) {
        console.error('Failed to load game state', error);
      }
    };

    loadGameState();
  }, [level]);

  useEffect(() => {
    const saveGameState = async () => {
      try {
        await AsyncStorage.setItem('gameLevel', level);
        await AsyncStorage.setItem(
          'currentQuestionIndex',
          currentQuestionIndex.toString(),
        );
        await AsyncStorage.setItem('timeLeft', timeLeft.toString());
      } catch (error) {
        console.error('Failed to save game state', error);
      }
    };

    saveGameState();
  }, [level, currentQuestionIndex, timeLeft]);

  useEffect(() => {
    let timer: any;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      Alert.alert("Time's up!", 'You failed the game. Try again.', [
        {
          text: 'OK',
          onPress: resetGame,
        },
      ]);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setTimeLeft(45 * 60);
    setShuffledQuestions(shuffleArray(questions));
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (!selectedOption) {
      Alert.alert('Please select an option before confirming.');
      return;
    }

    const isCorrect =
      selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setTimeLeft(45 * 60);
      } else {
        Alert.alert('Congratulations!', 'You completed the quiz.', [
          {
            text: 'Next Level',
            onPress: () => {
              let nextLevel = 'normal';
              if (level === 'easy') {
                nextLevel = 'normal';
              } else if (level === 'normal') {
                nextLevel = 'hard';
              }
              navigation.navigate(SCREEN.GAME, {level: nextLevel});
            },
          },
        ]);
      }
    } else {
      Alert.alert('Wrong Answer!', 'Returning to the Home Screen.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit Game', 'Are you sure you want to exit the game?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
        },
      ]);
      return true; // Prevent the default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Alert.alert(
            'Exit Game',
            'Are you sure you want to exit the game?',
            [
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => navigation.goBack(),
              },
            ],
            {cancelable: false},
          );
        }}>
        <Ionicons size={20} color={THEME.BLACK} name="chevron-back-outline" />
      </TouchableOpacity>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'black',
          width: '30%',
          alignSelf: 'center',
          borderRadius: 7,
          marginVertical: 10,
        }}>
        <Text style={styles.progress}>
          {currentQuestionIndex + 1}/{shuffledQuestions.length}
        </Text>
      </View>

      <Text style={styles.question}>
        {`Q${currentQuestionIndex + 1}. ${
          shuffledQuestions[currentQuestionIndex].question
        }`}
      </Text>

      <View style={styles.optionsContainer}>
        {shuffledQuestions[currentQuestionIndex].options.map(
          (option: any, index: any) => {
            const selectedColor = '#FF9800';
            const optionLetters = ['A.  ', 'B.  ', 'C.  ', 'D.  '];

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      selectedOption === option ? selectedColor : THEME.WHITE,
                  },
                ]}
                onPress={() => handleOptionSelect(option)}>
                <View style={styles.optionContent}>
                  <Text style={styles.optionCounter}>
                    {optionLetters[index]}
                  </Text>
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.selectedOptionText,
                    ]}>
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
        )}
      </View>
      <Button title={'Confirm'} onPress={() => handleConfirm()} />
    </View>
  );
};

export default Game;
