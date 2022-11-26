import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { UserAvatar } from '../UserAvatar';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {!!user && (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}

        <UserAvatar imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
