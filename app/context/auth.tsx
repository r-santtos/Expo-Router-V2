import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorageState } from '../server_config/useStorageState';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');

  // Adicione um estado para a resposta da autenticação do Google
  const [googleAuthResponse, setGoogleAuthResponse] = useState(null);

  // Adicione um efeito para verificar a resposta da autenticação do Google
  useEffect(() => {
    if (googleAuthResponse && googleAuthResponse.type === 'success') {
      setSession('xxx');
    }
  }, [googleAuthResponse]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '597178002208-ujtq094m9dsmrba01vj1od440jbau6s8.apps.googleusercontent.com',
    androidClientId: '872260821904-7ct5pjep6scsaaj259q3vqf8a4prqai1.apps.googleusercontent.com',
    iosClientId: '597178002208-1sqv4tlu5go8mj39cpunn3gkok1rooif.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response) {
      setGoogleAuthResponse(response);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          promptAsync();
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
