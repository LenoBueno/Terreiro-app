import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: 'SIGN_IN'; payload: User }
  | { type: 'SIGN_OUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

type AuthContextType = {
  state: AuthState;
  signIn: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateUser: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.payload as User, error: null };
    case 'SIGN_OUT':
      return { ...state, user: null, error: null };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user!, ...action.payload }, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    error: null,
  });

  // Carrega o usuário do armazenamento seguro
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync('user');
        if (userData) {
          dispatch({ type: 'SIGN_IN', payload: JSON.parse(userData) });
        }
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Falha ao carregar dados do usuário' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // TODO: Implementar chamada real para a API
      const mockUser: User = {
        id: '1',
        name: 'Usuário de Teste',
        email: credentials.email,
        token: 'mock-jwt-token',
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      dispatch({ type: 'SIGN_IN', payload: mockUser });
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      dispatch({ type: 'SIGN_OUT' });
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    if (!state.user) return { success: false, error: 'Nenhum usuário autenticado' };
    
    try {
      const updatedUser = { ...state.user, ...userData };
      await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar usuário';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, [state.user]);

  const value = useMemo(() => ({
    state,
    signIn,
    signOut,
    updateUser,
    isAuthenticated: !!state.user,
    user: state.user,
    loading: state.loading,
    error: state.error,
  }), [state, signIn, signOut, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};
