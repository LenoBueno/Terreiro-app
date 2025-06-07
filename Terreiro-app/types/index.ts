// Exporta todos os tipos compartilhados
export * from './common.js';

// Utilitários de tipos
export type Nullable<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Re-exporta tipos específicos de navegação se necessário
// export * from './navigation.js';

// Re-exporta tipos específicos da home se necessário
// export * from './home.js';
