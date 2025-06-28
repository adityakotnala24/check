import { useContext, createContext, type PropsWithChildren } from 'react';

import { useStorageState } from './useStorageState';

export interface SignIn {
  token: string;
  userName: string;
  mobileNumber: string;
  department: string;
  departmentName: string;
  district: string;
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
            mobileNumber: params.mobileNumber,
            department: params.department,
            departmentName: params.departmentName,
            district: params.district
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