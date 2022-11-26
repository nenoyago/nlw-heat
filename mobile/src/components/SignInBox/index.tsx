import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button';
import { colors } from '../../theme';

import { styles } from './styles';

export function SignInBox() {
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title="Entrar com o github"
        color={colors.black_primary}
        backgroundColor={colors.yellow}
        icon="github"
        onPress={signIn}
      />
    </View>
  );
}
