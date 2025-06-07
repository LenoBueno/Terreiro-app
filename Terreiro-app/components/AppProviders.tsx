import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider as ThemeContextProvider } from '@/contexts/ThemeContext';
import { CustomThemeProvider } from './ThemeProvider';

// Cria um contexto para o estado da UI
const UIContext = React.createContext<{
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  showAlert: (title: string, message: string, buttons?: any[]) => void;
  showModal: (content: React.ReactNode, title?: string) => void;
  hideModal: () => void;
  modal: {
    visible: boolean;
    content: React.ReactNode | null;
    title?: string;
  };
} | null>(null);

// Hook para usar o contexto da UI
export const useUI = () => {
  const context = React.useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// Provedor de estado da UI
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modal, setModal] = React.useState({
    visible: false,
    content: null as React.ReactNode | null,
    title: '',
  });

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
  const setLoading = (loading: boolean) => setIsLoading(loading);

  const showAlert = (title: string, message: string, _buttons: Array<{ text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }> = [
    { text: 'OK' },
  ]) => {
    // Implementação de alerta pode ser feita aqui
    // Por enquanto, apenas logamos o alerta
    console.log(`[ALERT] ${title}: ${message}`);
  };

  const showModal = (content: React.ReactNode, title: string = '') => {
    setModal({ visible: true, content, title });
  };

  const hideModal = () => {
    setModal(prev => ({ ...prev, visible: false }));
  };

  const value = React.useMemo(
    () => ({
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      setLoading,
      isLoading,
      showAlert,
      showModal,
      hideModal,
      modal,
    }),
    [isDrawerOpen, isLoading, modal]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

/**
 * Combina todos os provedores de contexto da aplicação
 * 
 * Este componente deve envolver toda a aplicação no ponto de entrada principal (App.tsx ou _layout.tsx)
 * para fornecer acesso aos contextos de autenticação, tema, etc.
 */
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <CustomThemeProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </CustomThemeProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
};

export default AppProviders;
