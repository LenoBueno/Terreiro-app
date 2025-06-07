import { ComponentType, ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

declare module '@/components/ui/Card' {
  export interface CardBaseProps {
    /** Conteúdo do card */
    children: ReactNode;
    /** Estilos personalizados para o container do card */
    style?: StyleProp<ViewStyle>;
    /** Nível de elevação (sombra) do card */
    elevation?: number;
    /** Raio das bordas do card */
    borderRadius?: number;
    /** Cor de fundo do card */
    backgroundColor?: string;
    /** Opacidade quando pressionado (apenas para cards clicáveis) */
    activeOpacity?: number;
  }

  export interface ClickableCardProps extends CardBaseProps {
    /** Função chamada quando o card é pressionado */
    onPress: () => void;
    /** Propriedades adicionais para o TouchableOpacity */
    touchableProps?: Omit<React.ComponentProps<typeof TouchableOpacity>, 'style' | 'onPress'>;
  }

  export interface NonClickableCardProps extends CardBaseProps {
    onPress?: never;
    touchableProps?: never;
  }

  export type CardProps = ClickableCardProps | NonClickableCardProps;

  /**
   * Componente de Card reutilizável com suporte a toque e estilização personalizada
   */
  const Card: React.FC<CardProps>;
  export default Card;
}

declare module '@/components/ui/ScreenHeader' {
  export interface ScreenHeaderProps {
    /** Título exibido no cabeçalho */
    title: string;
    /** Cor de fundo do cabeçalho */
    backgroundColor?: string;
    /** Cor do texto do título */
    titleColor?: string;
    /** Estilo adicional para o container do cabeçalho */
    style?: StyleProp<ViewStyle>;
    /** Estilo adicional para o título */
    titleStyle?: StyleProp<TextStyle>;
    /** Mostrar botão de menu */
    showMenu?: boolean;
    /** Mostrar botão de voltar */
    showBack?: boolean;
    /** Função chamada ao pressionar o botão de menu */
    onMenuPress?: () => void;
    /** Função chamada ao pressionar o botão de voltar */
    onBackPress?: () => void;
    /** Componente personalizado para o lado direito do cabeçalho */
    rightComponent?: ReactNode;
  }

  /**
   * Cabeçalho de tela personalizado com suporte a botões de menu/voltar
   */
  const ScreenHeader: React.FC<ScreenHeaderProps>;
  export default ScreenHeader;
}

declare module '@/components/ThemedText' {
  export type ThemedTextVariants = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

  export interface ThemedTextProps {
    /** Conteúdo de texto */
    children: ReactNode;
    /** Variante de estilo de texto */
    type?: ThemedTextVariants;
    /** Cor do texto no tema claro */
    lightColor?: string;
    /** Cor do texto no tema escuro */
    darkColor?: string;
    /** Estilo adicional para o texto */
    style?: StyleProp<TextStyle>;
  }

  /**
   * Componente de texto que se adapta ao tema atual (claro/escuro)
   */
  const ThemedText: React.FC<ThemedTextProps>;
  export default ThemedText;
}

declare module '@/components/ui/ScreenContainer' {
  export interface ScreenContainerProps {
    /** Conteúdo do container */
    children: ReactNode;
    /** Estilo adicional para o container */
    style?: StyleProp<ViewStyle>;
    /** Cor de fundo do container */
    backgroundColor?: string;
    /** Se o container deve ser rolável */
    scrollable?: boolean;
    /** Se deve incluir padding padrão */
    withPadding?: boolean;
    /** Se deve incluir o teclado avoiding view */
    withKeyboardAvoidingView?: boolean;
  }

  /**
   * Container de tela que lida com padding, rolagem e teclado
   */
  const ScreenContainer: React.FC<ScreenContainerProps>;
  export default ScreenContainer;
}

// Tipos para ícones
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

// Tipos para navegação
type NavigationRoute = keyof import('@/types/navigation').RootStackParamList;
type TabRoute = keyof import('@/types/navigation').TabParamList;
