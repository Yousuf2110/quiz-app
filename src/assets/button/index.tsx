import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';

const Button = ({onPress, title, disabled}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}>
      <View style={styles.textColumn}>
        <Text style={[styles.title, disabled && styles.disabledText]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
