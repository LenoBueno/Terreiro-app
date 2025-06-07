import React, { useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Provedor de tema personalizado que aplica as cores do tema em toda a aplicação
 */
export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();

  const theme = useMemo(
    () => ({
      dark: colors.background === '#121212',
      colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        notification: colors.notification,
      },
    }),
    [colors]
  );

  return <StyledThemeProvider value={theme}>{children}</StyledThemeProvider>;
};

export default CustomThemeProvider;
