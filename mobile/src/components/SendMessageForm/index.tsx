import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';

import { colors } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    try {
      const formattedMessage = message.trim();

      if (formattedMessage.length > 0) {
        setSendingMessage(true);

        await api.post('/messages', { message: formattedMessage });

        setMessage('');
        Keyboard.dismiss();

        Alert.alert('Mensagem enviada com sucesso!');
      } else {
        Alert.alert('Escreva uma mensagem para enviar.');
      }
    } catch (err) {
      Alert.alert('Ops! Algo deu errado ao enviar mensagem.');
      console.error(err);
    } finally {
      setSendingMessage(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={colors.gray_primary}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.textInput}
        editable={!sendingMessage}
      />

      <Button
        title="Enviar mensagem"
        backgroundColor={colors.pink}
        color={colors.white}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
