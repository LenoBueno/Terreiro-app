import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: typeof lightColors | typeof darkColors;
};

const lightColors = {
  primary: '#4CAF50',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#333333',
  border: '#E0E0E0',
  notification: '#FF3B30',
  textSecondary: '#666666',
  backgroundSecondary: '#F5F5F5',
};

const darkColors = {
  primary: '#4CAF50',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#333333',
  notification: '#FF453A',
  textSecondary: '#A0A0A0',
  backgroundSecondary: '#1E1E1E',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme() as Theme;
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  
  const theme = useMemo<Theme>(() => {
    return themeMode === 'system' ? systemColorScheme : themeMode;
  }, [themeMode, systemColorScheme]);

  const colors = useMemo(() => {
    return theme === 'dark' ? darkColors : lightColors;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prevMode => {
      if (prevMode === 'system') return 'dark';
      if (prevMode === 'dark') return 'light';
      return 'system';
    });
  }, []);

  // Carregar preferência salva do usuário
  useEffect(() => {
    // Aqui você pode carregar a preferência salva do AsyncStorage/SecureStore
    // Por exemplo:
    // const loadThemePreference = async () => {
    //   try {
    //     const savedTheme = await AsyncStorage.getItem('themeMode');
    //     if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
    //       setThemeMode(savedTheme as ThemeMode);
    //     }
    //   } catch (error) {
    //     console.error('Erro ao carregar preferência de tema:', error);
    //   }
    // };
    // loadThemePreference();
  }, []);

  // Salvar preferência do usuário
  useEffect(() => {
    // Aqui você pode salvar a preferência do usuário no AsyncStorage/SecureStore
    // Por exemplo:
    // const saveThemePreference = async () => {
    //   try {
    //     await AsyncStorage.setItem('themeMode', themeMode);
    //   } catch (error) {
    //     console.error('Erro ao salvar preferência de tema:', error);
    //   }
    // };
    // saveThemePreference();
  }, [themeMode]);

  const value = useMemo(() => ({
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
    colors,
  }), [theme, themeMode, colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
