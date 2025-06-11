import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Text } from 'react-native';

interface ItemCardProps {
  /**
   * Título exibido no card
   */
  title: string;
  /**
   * Imagem a ser exibida no card
   */
  image: ImageSourcePropType;
  /**
   * Função chamada quando o card é pressionado
   */
  onPress?: () => void;
  /**
   * Estilos personalizados para o container do card
   */
  containerStyle?: object;
  /**
   * Estilos personalizados para a imagem do card
   */
  imageStyle?: object;
  /**
   * Estilos personalizados para o texto do card
   */
  textStyle?: object;
  /**
   * Componente personalizado para ser renderizado no card
   */
  children?: ReactNode;
}

/**
 * Componente de card reutilizável para itens na interface
 * 
 * Exemplo de uso:
 * ```tsx
 * <ItemCard
 *   title="Ervas"
 *   image={require('@/assets/images/herbs.png')}
 *   onPress={() => console.log('Card pressionado')}
 * />
 * ```
 */
export default function ItemCard({
  title,
  image,
  onPress,
  containerStyle,
  imageStyle,
  textStyle,
  children,
}: ItemCardProps) {
  // Se houver children, renderiza o conteúdo personalizado
  if (children) {
    return (
      <TouchableOpacity 
        style={[styles.card, containerStyle]} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Renderização padrão com imagem e título
  return (
    <TouchableOpacity 
      style={[styles.card, containerStyle]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image 
          source={image} 
          style={[
            styles.cardImage, 
            title === 'Eventos' && styles.cardImageEvents,
            imageStyle
          ]} 
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.cardText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: '1.66%',
  },
  cardContent: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
  cardImageEvents: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginTop: -10,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#006B3F',
    fontFamily: 'Poppins_500Medium',
  },
});