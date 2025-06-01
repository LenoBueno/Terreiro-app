import { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Tenant } from '@/types';

interface TenantContextType {
  currentTenant: Tenant | null;
  isLoading: boolean;
  setTenant: (tenant: Tenant) => Promise<void>;
  clearTenant: () => Promise<void>;
}

export const TenantContext = createContext<TenantContextType>({
  currentTenant: null,
  isLoading: true,
  setTenant: async () => {},
  clearTenant: async () => {},
});

// Storage helper functions
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

interface TenantProviderProps {
  children: ReactNode;
}

export function TenantProvider({ children }: TenantProviderProps) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenantJson = await storage.getItem('currentTenant');
        if (tenantJson) {
          setCurrentTenant(JSON.parse(tenantJson));
        } else {
          const defaultTenant: Tenant = {
            id: 'default',
            name: 'Terreiro Principal',
            description: 'Terreiro principal de umbanda',
            domain: 'terreiro-principal.app',
            status: 'active',
            plan: 'basic',
            theme: 'default',
            userCount: 10,
            createdAt: new Date().toISOString(),
          };
          
          await storage.setItem('currentTenant', JSON.stringify(defaultTenant));
          setCurrentTenant(defaultTenant);
        }
      } catch (error) {
        console.error('Failed to load tenant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

  const setTenant = async (tenant: Tenant) => {
    try {
      await storage.setItem('currentTenant', JSON.stringify(tenant));
      setCurrentTenant(tenant);
    } catch (error) {
      console.error('Failed to set tenant:', error);
      throw error;
    }
  };

  const clearTenant = async () => {
    try {
      await storage.removeItem('currentTenant');
      setCurrentTenant(null);
    } catch (error) {
      console.error('Failed to clear tenant:', error);
      throw error;
    }
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        isLoading,
        setTenant,
        clearTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}