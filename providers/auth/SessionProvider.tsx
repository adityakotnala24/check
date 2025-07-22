import { useContext, createContext, type PropsWithChildren } from 'react';

import { useStorageState } from './useStorageState';

export interface SignIn {
  token: string;
  userName: string;
  hoff: string;
  chief: string;
  conservator: string;
  dfo: string;
  rangeId: string;
  rangeNameEng: string;
}

const AuthContext = createContext<{
  signIn: (params: SignIn) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  
  return (
    <AuthContext.Provider
      value={{
        signIn: (params: SignIn) => {
          const loginResponse = {
            token: params.token,
            userName: params.userName,
            hoff: params.hoff,
            chief: params.chief,
            conservator: params.conservator,
            dfo: params.dfo,
            rangeId: params.rangeId,
            rangeNameEng: params.rangeNameEng
          };

          setSession(JSON.stringify(loginResponse));
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};