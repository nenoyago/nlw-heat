import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';
import { styles } from './styles';

const messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage: MessageProps) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  async function fetchMessages(): Promise<void> {
    try {
      const response = await api.get<MessageProps[]>('/messages/last3');

      setMessages(response.data);
    } catch (err) {
      Alert.alert('Ops! Algo deu errado ao carregar mensagens.');
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      indicatorStyle="white"
      keyboardShouldPersistTaps="never"
    >
      {messages.length > 0 ? (
        messages.map(message => <Message key={message.id} message={message} />)
      ) : (
        <>
          <Text style={styles.noTextMessage}>
            Ainda não há mensagens disponíveis
          </Text>
          <Text style={styles.noTextMessageHighlight}>Que tal enviar uma?</Text>
        </>
      )}
    </ScrollView>
  );
}
