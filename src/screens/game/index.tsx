import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const Game = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {level} = route.params;

  const [timer, setTimer] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(level);

  const easyQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
  ];

  const normalQuestions = [
    {
      question: 'What is the capital of Germany?',
      options: ['Berlin', 'Madrid', 'Rome', 'Paris'],
      correctAnswer: 'Berlin',
    },
    {
      question: 'What is 5 * 3?',
      options: ['15', '12', '10', '20'],
      correctAnswer: '15',
    },
  ];

  const hardQuestions = [
    {
      question: 'Who developed the theory of relativity?',
      options: [
        'Albert Einstein',
        'Isaac Newton',
        'Marie Curie',
        'Nikola Tesla',
      ],
      correctAnswer: 'Albert Einstein',
    },
    {
      question: 'What is the square root of 144?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
    },
  ];

  const questionSets = {
    easy: easyQuestions,
    normal: normalQuestions,
    hard: hardQuestions,
  };

  const questions = questionSets[currentDifficulty];

  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, isAnswered]);

  const handleOptionClick = (option: string) => {
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      Alert.alert('Correct Answer!');
    } else {
      Alert.alert('Wrong Answer!');
      setTimeout(() => navigation.navigate('Home' as never), 1000);
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(10);
      setIsAnswered(false);
    } else if (currentDifficulty === 'easy') {
      setCurrentDifficulty('normal');
      setCurrentQuestionIndex(0);
      setTimer(10);
      setIsAnswered(false);
    } else if (currentDifficulty === 'normal') {
      setCurrentDifficulty('hard');
      setCurrentQuestionIndex(0);
      setTimer(10);
      setIsAnswered(false);
    } else {
      Alert.alert('Quiz Completed!');
      navigation.navigate('Home' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time Left: {timer} sec</Text>
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex].question}
      </Text>
      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isAnswered &&
              option === questions[currentQuestionIndex].correctAnswer
                ? styles.correctOption
                : isAnswered &&
                  option !== questions[currentQuestionIndex].correctAnswer
                ? styles.wrongOption
                : null,
            ]}
            onPress={() => handleOptionClick(option)}
            disabled={isAnswered}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isAnswered && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff6347',
  },
  questionText: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  correctOption: {
    backgroundColor: '#28a745', // Green for correct
    borderColor: '#28a745',
  },
  wrongOption: {
    backgroundColor: '#dc3545', // Red for wrong
    borderColor: '#dc3545',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Game;
