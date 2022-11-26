import React from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';

import avatarImg from '../../assets/avatar.png';
import { colors } from '../../theme';

const sizes = {
  small: {
    containerSize: 32,
    avatarSize: 28,
  },
  normal: {
    containerSize: 48,
    avatarSize: 42,
  },
};

type UserAvatar = {
  imageUri: string | undefined;
  size?: 'small' | 'normal';
};

const avatarDefault = Image.resolveAssetSource(avatarImg).uri;

export function UserAvatar({ imageUri, size = 'normal' }: UserAvatar) {
  const { containerSize, avatarSize } = sizes[size];

  return (
    <LinearGradient
      colors={[colors.pink, colors.yellow]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
    >
      <Image
        source={{ uri: imageUri || avatarDefault }}
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      />
    </LinearGradient>
  );
}
