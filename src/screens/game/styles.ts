import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.WHITE,
    alignItems: 'center',
  },
  innerContainer: {
    paddingHorizontal: wp(3),
    alignItems: 'center',
  },
  footer: {
    width: '80%',
    marginBottom: 0,
    bottom: 0,
    alignSelf: 'flex-end',
  },
  timerSection: {
    width: '100%',
    paddingVertical: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionSection: {
    width: '100%',
    paddingVertical: hp(3),
  },
  circle: {
    borderRadius: 200 / 2,
    height: 110,
    width: 110,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: RFPercentage(2.3),
    color: THEME.BLACK,
    fontFamily: 'Poppins-Bold',
  },
  optionsSection: {
    width: '100%',
    borderWidth: 1,
    marginVertical: hp(1),
  },
  optionContainer: {
    width: '100%',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  option: {
    fontSize: RFValue(20),
    color: THEME.BLACK,
    fontFamily: 'Poppins-Regular',
  },
});
