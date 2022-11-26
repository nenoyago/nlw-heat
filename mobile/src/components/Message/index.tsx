import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

import { UserAvatar } from '../UserAvatar';

import { styles } from './styles';

export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

type Message = {
  message: MessageProps;
};

export function Message({ message }: Message) {
  return (
    <MotiView
      style={styles.container}
      from={{
        opacity: 0,
        translateY: -50,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{ type: 'timing', duration: 700 }}
    >
      <Text style={styles.message}>{message.text}</Text>

      <View style={styles.footer}>
        <UserAvatar imageUri={message.user.avatar_url} size="small" />

        <Text style={styles.userName}>{message.user.name}</Text>
      </View>
    </MotiView>
  );
}
