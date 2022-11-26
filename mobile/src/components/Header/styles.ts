import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.white,
    marginRight: 20,
  },
});
