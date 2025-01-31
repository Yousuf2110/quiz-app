import React, { useEffect } from 'react';
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../constants/screen';
import {styles } from './styles';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasShownSplash = await AsyncStorage.getItem('hasShownSplash');

        if (hasShownSplash) {
          navigation.replace(SCREEN.HOME);
        } else {
          await AsyncStorage.setItem('hasShownSplash', 'true');
          setTimeout(() => {
            navigation.replace(SCREEN.HOME);
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking splash screen status:', error);
      }
    };

    checkFirstLaunch();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/images/mind.png')}
        style={styles.logo} 
      />
      <Text style={styles.topText}>Welcome to Quiz App</Text>
    </SafeAreaView>
  );
};

export default Splash;
