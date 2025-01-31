import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THEME } from '../../constants/theme';
import { easyQuestions, hardQuestions, normalQuestions } from '../../constants';
import Button from '../../assets/button';
import { SCREEN } from '../../constants/screen';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Game = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [hasFailed, setHasFailed] = useState(false); 

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
        const key = `${level}_progress`;
        const savedData = await AsyncStorage.getItem(key);
        if (savedData) {
          const { savedIndex, savedTime } = JSON.parse(savedData);
          setCurrentQuestionIndex(savedIndex || 0);
          setTimeLeft(savedTime || 45 * 60);
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
        const key = `${level}_progress`;
        const data = {
          savedIndex: currentQuestionIndex,
          savedTime: timeLeft,
        };
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save game state', error);
      }
    };

    saveGameState();
  }, [level, currentQuestionIndex, timeLeft]);

 
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      Alert.alert("Time's up!", 'You failed the game. Try again.', [
        {
          text: 'OK',
          onPress: handleFailure,
        },
      ]);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  
  const handleFailure = () => {
    setHasFailed(true); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

 
  useEffect(() => {
    const backAction = () => {
      if (hasFailed) {
        return false; 
      }

      Alert.alert('Exit Game', 'Are you sure you want to exit the game?', [
        { text: 'No', onPress: () => null, style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation, hasFailed]);

  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  
  const handleConfirm = async () => {
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
        handleLevelCompletion();
      }
    } else {
      Alert.alert('Wrong Answer!', 'Returning to the Home Screen.', [
        { text: 'OK', onPress: handleFailure },
      ]);
    }
  };

 
  const handleLevelCompletion = async () => {
    if (level === 'hard') {
      
      Alert.alert(
        'Congratulations Champion!',
        'You are a Champion!',
        [
          {
            text: 'OK',
            onPress: async () => {
             
              await AsyncStorage.clear();
  
              
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ]
      );
    } else {
      const nextLevel = level === 'easy' ? 'normal' : 'hard';
      await AsyncStorage.setItem(`${level}Completed`, 'true');
      navigation.replace(SCREEN.GAME, { level: nextLevel });
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons size={20} color={THEME.BLACK} name="chevron-back-outline" />
      </TouchableOpacity>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      <Text style={styles.progress}>
        {currentQuestionIndex + 1}/{shuffledQuestions.length}
      </Text>

      <Text style={styles.question}>
        {`Q${currentQuestionIndex + 1}. ${
          shuffledQuestions[currentQuestionIndex].question
        }`}
      </Text>

      <View style={styles.optionsContainer}>
        {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  selectedOption === option ? '#FF9800' : THEME.WHITE,
              },
            ]}
            onPress={() => handleOptionSelect(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title={'Confirm'} onPress={handleConfirm} />
    </View>
  );
};

export default Game;
