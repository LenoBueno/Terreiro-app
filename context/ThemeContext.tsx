import { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface Theme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  cardColor: string;
}

const defaultTheme: Theme = {
  primaryColor: '#000000',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  accentColor: '#000000',
  cardColor: '#F5F5F5',
};

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  isDarkMode: false,
  toggleDarkMode: async () => {},
  setTheme: async () => {},
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
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const themeJson = await storage.getItem('theme');
        if (themeJson) {
          setThemeState(JSON.parse(themeJson));
        }
        
        const darkModeValue = await storage.getItem('isDarkMode');
        setIsDarkMode(darkModeValue === 'true');
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !isDarkMode;
      await storage.setItem('isDarkMode', newDarkMode.toString());
      setIsDarkMode(newDarkMode);
      
      const darkTheme: Theme = {
        primaryColor: '#FFFFFF',
        backgroundColor: '#121212',
        textColor: '#FFFFFF',
        accentColor: '#FFFFFF',
        cardColor: '#1E1E1E',
      };
      
      if (newDarkMode) {
        await storage.setItem('theme', JSON.stringify(darkTheme));
        setThemeState(darkTheme);
      } else {
        await storage.setItem('theme', JSON.stringify(defaultTheme));
        setThemeState(defaultTheme);
      }
    } catch (error) {
      console.error('Failed to toggle dark mode:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await storage.setItem('theme', JSON.stringify(newTheme));
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to set theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleDarkMode,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}