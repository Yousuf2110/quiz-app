import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Game = () => {
  const navigation = useNavigation();

  const [timer, setTimer] = useState(10); // 10 seconds timer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // 50 Questions Array
  const questions = [
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
    {
      question: 'Who is the founder of Apple?',
      options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'],
      correctAnswer: 'Steve Jobs',
    },
    // 47 more questions go here...
  ];

  // Timer Countdown Logic
  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, isAnswered]);

  // Handle Option Click
  const handleOptionClick = option => {
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      Alert.alert('Correct Answer!');
    } else {
      Alert.alert('Wrong Answer!');
      // Navigate to Home Screen on wrong answer
      setTimeout(() => navigation.navigate('Home'), 1000);
    }
    setTimeout(() => handleNextQuestion(), 1000); // Delay before moving to next question
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(10); // Reset Timer
      setIsAnswered(false);
    } else {
      Alert.alert('Quiz Completed!');
      navigation.navigate('Home'); // Navigate to Home after quiz completion
    }
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <Text style={styles.timerText}>Time Left: {timer} sec</Text>

      {/* Question */}
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex].question}
      </Text>

      {/* Options */}
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
            disabled={isAnswered} // Disable buttons after answering
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Question Button */}
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
    transition: 'background-color 0.3s ease',
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
