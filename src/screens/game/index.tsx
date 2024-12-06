import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import Button from '../../src/assets/button';
import {SCREEN} from '../../constants/screen';

const Game = () => {
  const navigation: any = useNavigation();

  const borderWidthAnim = useRef(new Animated.Value(1)).current;
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(borderWidthAnim, {
          toValue: 5,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(borderWidthAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    );
    pulse.start();

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          Alert.alert('Time Up!', 'The 30 minutes have ended.');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => {
      pulse.stop();
      clearInterval(timer);
    };
  }, [borderWidthAnim]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.timerSection}>
          <Animated.View
            style={[styles.circle, {borderWidth: borderWidthAnim}]}>
            <Text style={styles.time}>{formatTime(timeRemaining)}</Text>
          </Animated.View>
        </View>
        <View style={styles.questionSection}>
          <Text style={styles.time}>
            <Text style={styles.time}>Q1. </Text>
            Used setInterval inside useEffect to decrement the timer state
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <View style={styles.optionContainer}>
            <Text style={styles.option}>Used</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title={'Confirm'}
            onPress={() => navigation.navigate(SCREEN.HOME)}
          />
        </View>
      </View>
    </View>
  );
};

export default Game;
