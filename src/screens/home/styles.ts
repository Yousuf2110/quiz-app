import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
  },
  innerContainer: {
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: RFPercentage(2.3),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },
});
