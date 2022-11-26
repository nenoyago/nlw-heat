import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`;

  async function signIn(githubCode: string) {
    try {
      const response = await api.post<AuthResponse>('authenticate', {
        code: githubCode,
      });

      const { token, user } = response.data;
      localStorage.setItem('@dowhile:token', token);
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(user);
    } catch (err) {
      toast.error('Ops! Ocorreu um erro ao autenticar.');
      console.error(err);
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  async function getUserProfile() {
    try {
      const response = await api.get<User>('user/profile');
      setUser(response.data);
    } catch (err) {
      toast.error('Oops! Something went wrong');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      getUserProfile();
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutGithubCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutGithubCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInUrl,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
