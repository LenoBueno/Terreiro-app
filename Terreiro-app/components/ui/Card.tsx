import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle, 
  GestureResponderEvent,
  ViewProps,
  TouchableOpacityProps
} from 'react-native';

type CardBaseProps = {
  /** Conteúdo do card */
  children: React.ReactNode;
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
};

type ClickableCardProps = CardBaseProps & {
  /** Função chamada quando o card é pressionado */
  onPress: (event: GestureResponderEvent) => void;
  /** Propriedades adicionais para o TouchableOpacity */
  touchableProps?: Omit<TouchableOpacityProps, 'style' | 'onPress'>;
};

type NonClickableCardProps = CardBaseProps & {
  onPress?: never;
  touchableProps?: never;
};

type CardProps = ClickableCardProps | NonClickableCardProps;

/**
 * Componente de Card reutilizável com suporte a toque e estilização personalizada
 */
export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevation = 2,
  borderRadius = 8,
  backgroundColor = '#FFFFFF',
  activeOpacity = 0.7,
  touchableProps,
}) => {
  const cardStyle: StyleProp<ViewStyle> = [
    styles.card,
    {
      elevation,
      borderRadius,
      backgroundColor,
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.1 + (elevation * 0.05),
      shadowRadius: elevation * 0.8,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity 
        {...touchableProps}
        style={cardStyle} 
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
