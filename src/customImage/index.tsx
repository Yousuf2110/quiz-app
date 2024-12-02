import {Image, View} from 'react-native';
import React from 'react';
import {styles} from './style';

const CustomImage = ({source, style}: any) => {
  return (
    <View>
      <Image
        source={source || require('../assets/images/mind.png')}
        style={[styles.image, style]}
      />
    </View>
  );
};

export default CustomImage;
