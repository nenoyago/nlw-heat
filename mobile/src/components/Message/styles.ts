import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 36,
  },
  message: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fonts.regular,
    color: colors.white,
    marginBottom: 12,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.white,
    marginLeft: 16,
  },
});
