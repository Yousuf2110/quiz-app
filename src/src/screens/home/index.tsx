import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';
import Button from '../../assets/button';

const Home = () => {
  const navigation: any = useNavigation();
  const [quizLevel, setQuizLevel] = useState('');

  // Function to handle button press and set quiz level
  const handlePress = (level: string) => {
    setQuizLevel(level);
    navigation.navigate(SCREEN.GAME, {level}); // Pass level to the game screen
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/mind.png')}
          style={{width: 200, height: 200}}
        />
      </View>
      <View style={styles.innerContainer}>
        <Button title={'Easy'} onPress={() => handlePress('easy')} />
        <Button title={'Normal'} onPress={() => handlePress('normal')} />
        <Button title={'Hard'} onPress={() => handlePress('hard')} />
      </View>

      {/* Display the current quiz level for testing */}
      {quizLevel && <Text>Selected Level: {quizLevel}</Text>}
    </View>
  );
};

export default Home;
