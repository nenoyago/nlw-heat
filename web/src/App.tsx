import styles from './App.module.scss';

import { Toaster } from 'react-hot-toast';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { useAuth } from './hooks/useAuth';
import { SendMessageForm } from './components/SendMessageForm';

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ''
      }`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
      <Toaster />
    </main>
  );
}
