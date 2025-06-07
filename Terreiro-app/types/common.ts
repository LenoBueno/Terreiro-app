/**
 * Tipos e interfaces compartilhados entre diferentes partes da aplicação
 */

// Tipos para o tema
export type ThemeMode = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

// Tipos para autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  // Adicione outros campos conforme necessário
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  signIn: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateUser: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export type AuthContextType = AuthState & AuthActions;

// Tipos para UI
export interface ModalState {
  visible: boolean;
  content: React.ReactNode | null;
  title?: string;
}

export interface UIState {
  isDrawerOpen: boolean;
  isLoading: boolean;
  activeTab: string;
  modal: ModalState;
}

export interface UIActions {
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
  showModal: (content: React.ReactNode, title?: string) => void;
  hideModal: () => void;
  showAlert: (title: string, message: string, buttons?: AlertButton[]) => void;
}

export type UIContextType = UIState & UIActions;

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

// Tipos para navegação
export type RootStackParamList = {
  '(tabs)': undefined;
  '+not-found': undefined;
  // Adicione outras rotas conforme necessário
};

// Tipos para a home
export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  description?: string;
  color?: string;
  iconType?: 'material' | 'ionicons' | 'font-awesome' | 'entypo' | 'material-community';
}

// Adicione outros tipos compartilhados aqui
