import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { ThemedText } from '../ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

type ScreenHeaderProps = {
  /** Título exibido no cabeçalho */
  title: string;
  /** Cor de fundo do cabeçalho (padrão: #4CAF50) */
  backgroundColor?: string;
  /** Estilos personalizados para o container do cabeçalho */
  style?: StyleProp<ViewStyle>;
  /** Função chamada ao pressionar o botão de menu */
  onMenuPress?: (event: GestureResponderEvent) => void;
  /** Mostrar botão de voltar em vez do menu */
  showBackButton?: boolean;
  /** Componente personalizado para o lado direito */
  rightComponent?: React.ReactNode;
  /** Cor dos ícones (padrão: branco) */
  tintColor?: string;
};

/**
 * Cabeçalho de tela personalizado com suporte a menu, botão de voltar e conteúdo personalizado
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  backgroundColor = '#4CAF50',
  style,
  onMenuPress,
  showBackButton = false,
  rightComponent,
  tintColor = '#fff',
}) => {
  return (
    <View style={[styles.header, { backgroundColor }, style]}>
      <View style={styles.headerContent}>
        <ThemedText type="title" style={[styles.title, { color: tintColor }]}>
          {title}
        </ThemedText>
        
        <View style={styles.rightContainer}>
          {rightComponent}
          {!showBackButton ? (
            <DrawerToggleButton tintColor={tintColor} />
          ) : (
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={tintColor}
              onPress={onMenuPress}
              style={styles.icon}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  icon: {
    marginLeft: 16,
  },
});
