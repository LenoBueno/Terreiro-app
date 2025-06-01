import { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  updateUser: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const VALID_CREDENTIALS = {
  'root@admin.com': { password: '148750', role: 'admin', name: 'Admin User' },
  'user@user.com': { password: '148750', role: 'member', name: 'Regular User' },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await SecureStore.getItemAsync('user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const userCredentials = VALID_CREDENTIALS[email as keyof typeof VALID_CREDENTIALS];
      
      if (!userCredentials || userCredentials.password !== password) {
        throw new Error('Invalid email or password');
      }

      const userData: User = {
        id: Math.random().toString(36).substring(2),
        name: userCredentials.name,
        email,
        role: userCredentials.role as 'admin' | 'member',
        createdAt: new Date().toISOString(),
      };

      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (VALID_CREDENTIALS[email as keyof typeof VALID_CREDENTIALS]) {
        throw new Error('Email already exists');
      }

      const userData: User = {
        id: Math.random().toString(36).substring(2),
        name,
        email,
        role: 'member',
        createdAt: new Date().toISOString(),
      };
      
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = { ...user, ...userData };
      await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}