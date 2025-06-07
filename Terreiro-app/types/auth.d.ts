/**
 * Tipos relacionados à autenticação do usuário
 */

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  // Adicione outros campos conforme necessário
};

type Credentials = {
  email: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (credentials: Credentials) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  updateUser: (userData: Partial<User>) => Promise<AuthResult>;
};

export type { User, Credentials, AuthResult, AuthContextType };
