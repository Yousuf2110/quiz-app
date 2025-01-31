import {StyleSheet} from 'react-native';
import {THEME} from '../../constants/theme';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.PRIMARY,
  },
  topText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  logo: {
    resizeMode:'contain',
  },
});
