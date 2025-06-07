import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

/**
 * Tipo para representar um usuário autenticado
 */
type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  // Adicione outros campos conforme necessário
};

/**
 * Tipo para as credenciais de login
 */
type Credentials = {
  email: string;
  password: string;
};

/**
 * Hook para gerenciar autenticação do usuário
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega o usuário do armazenamento seguro ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        setError('Falha ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Realiza o login do usuário
   */
  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar chamada real para a API de autenticação
      // Simulação de chamada de API
      const mockUser: User = {
        id: '1',
        name: 'Usuário de Teste',
        email: credentials.email,
        token: 'mock-jwt-token',
      };

      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Realiza o logout do usuário
   */
  const signOut = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Atualiza os dados do usuário
   */
  const updateUser = useCallback(async (userData: Partial<User>) => {
    if (!user) return { success: false, error: 'Nenhum usuário autenticado' };
    
    try {
      const updatedUser = { ...user, ...userData };
      await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar usuário';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signIn,
    signOut,
    updateUser,
  };
};

/**
 * Hook para verificar se o usuário está autenticado
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};
