import { StyleSheet } from 'react-native';
import { fonts } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
  },
});
