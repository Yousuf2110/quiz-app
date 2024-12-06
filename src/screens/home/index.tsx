import React from 'react';
import {View, Image, StatusBar} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';
import Button from '../../assets/button';
import {THEME} from '../../constants/theme';

const Home = () => {
  const navigation: any = useNavigation();

  const handlePress = (level: string) => {
    navigation.navigate(SCREEN.GAME, {level});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME.PRIMARY} />
      <View>
        <Image
          source={require('../../assets/images/mind.png')}
          style={{width: 300, height: 300}}
        />
      </View>
      <View style={styles.innerContainer}>
        <Button title={'Easy'} onPress={() => handlePress('easy')} />
        <Button title={'Normal'} onPress={() => handlePress('normal')} />
        <Button title={'Hard'} onPress={() => handlePress('hard')} />
      </View>
    </View>
  );
};

export default Home;
