import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 56,
    paddingBottom: 64,
  },
  noTextMessage: {
    color: colors.gray_primary,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
  },
  noTextMessageHighlight: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
    marginTop: 5,
  },
});
