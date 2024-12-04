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
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: RFPercentage(2.3),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },

  hardButton: {
    backgroundColor: 'green', // Green color for Hard button
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
