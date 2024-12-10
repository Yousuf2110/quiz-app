import React, {useEffect, useState} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';
import Button from '../../assets/button';
import {THEME} from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation: any = useNavigation();

  const [easyCompleted, setEasyCompleted] = useState(false);
  const [normalCompleted, setNormalCompleted] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const easyStatus = await AsyncStorage.getItem('easyCompleted');
        const normalStatus = await AsyncStorage.getItem('normalCompleted');

        setEasyCompleted(easyStatus === 'true');
        setNormalCompleted(normalStatus === 'true');
      } catch (error) {
        console.error('Failed to load progress', error);
      }
    };

    loadProgress();
  }, []);

  const handlePress = (level: string) => {
    navigation.navigate(SCREEN.GAME, {level});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME.PRIMARY} />
      <View>
        <Image
          source={require('../../assets/images/mind.png')}
          style={{width: 320, height: 320}}
        />
      </View>
      <View style={styles.innerContainer}>
        <Button
          title={'Easy'}
          onPress={() => handlePress('easy')}
          disabled={false}
        />
        <Button
          title={'Normal'}
          onPress={() => handlePress('normal')}
          disabled={!easyCompleted}
        />
        <Button
          title={'Hard'}
          onPress={() => handlePress('hard')}
          disabled={!normalCompleted}
        />
      </View>
    </View>
  );
};

export default Home;
