import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

type UIState = {
  isDrawerOpen: boolean;
  isLoading: boolean;
  activeTab: string;
  modal: {
    visible: boolean;
    content: React.ReactNode | null;
    title?: string;
  };
};

type UIActions = {
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
  showModal: (content: React.ReactNode, title?: string) => void;
  hideModal: () => void;
  showAlert: (title: string, message: string, buttons?: any[]) => void;
};

export const useUI = (): UIState & UIActions => {
  const [state, setState] = useState<UIState>({
    isDrawerOpen: false,
    isLoading: false,
    activeTab: 'home',
    modal: {
      visible: false,
      content: null,
      title: '',
    },
  });

  const openDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isDrawerOpen: true }));
  }, []);

  const closeDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isDrawerOpen: false }));
  }, []);

  const toggleDrawer = useCallback(() => {
    setState(prev => ({ ...prev, isDrawerOpen: !prev.isDrawerOpen }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []); 

  const setActiveTab = useCallback((tab: string) => {
    setState(prev => ({
      ...prev,
      activeTab: tab,
      isDrawerOpen: false, // Fecha o drawer ao trocar de aba
    }));
  }, []);

  const showModal = useCallback((content: React.ReactNode, title: string = '') => {
    setState(prev => ({
      ...prev,
      modal: {
        visible: true,
        content,
        title,
      },
    }));
  }, []);

  const hideModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      modal: {
        ...prev.modal,
        visible: false,
      },
    }));
  }, []);

  const showAlert = useCallback((title: string, message: string, buttons: any[] = [
    { text: 'OK' },
  ]) => {
    Alert.alert(title, message, buttons.length > 0 ? buttons : undefined, {
      cancelable: true,
    });
  }, []);

  return useMemo(
    () => ({
      ...state,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      setLoading,
      setActiveTab,
      showModal,
      hideModal,
      showAlert,
    }),
    [
      state,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      setLoading,
      setActiveTab,
      showModal,
      hideModal,
      showAlert,
    ]
  );
};

export default useUI;
