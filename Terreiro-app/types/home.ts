import { MaterialIcons } from '@expo/vector-icons';

export type MenuItem = {
  /** Identificador único do item */
  id: string;
  /** Título exibido no card */
  title: string;
  /** Nome do ícone do MaterialIcons */
  icon: keyof typeof MaterialIcons.glyphMap;
  /** Rota para navegação */
  route: `/(tabs)/${string}`;
  /** Cor de destaque do card (opcional) */
  color?: string;
};
