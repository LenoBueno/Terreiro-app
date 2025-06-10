import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/@types/navigation';
import Header from '@/components/Header';
import FloatingActionButton from '@/components/common/FloatingActionButton';

interface StandardPageProps {
  /**
   * Título exibido no cabeçalho
   */
  title: string;
  /**
   * Conteúdo principal da página
   */
  children: ReactNode;
  /**
   * Mostrar botão de voltar no cabeçalho
   * @default true
   */
  showBackButton?: boolean;
  /**
   * Função chamada ao pressionar o botão de ação flutuante
   */
  onFabPress?: () => void;
  /**
   * Ícone do botão de ação flutuante
   * @default "add"
   */
  fabIcon?: keyof typeof MaterialIcons.glyphMap;
  /**
   * Estilos personalizados para o container principal
   */
  containerStyle?: object;
  /**
   * Estilos personalizados para o conteúdo
   */
  contentStyle?: object;
  /**
   * Componente personalizado para o lado direito do cabeçalho
   */
  rightComponent?: ReactNode;
}

/**
 * Componente de página padrão com cabeçalho e layout consistente
 * 
 * Exemplo de uso:
 * ```tsx
 * <StandardPage 
 *   title="Minha Página"
 *   fabIcon="add"
 *   onFabPress={() => console.log('Botão pressionado')}
 * >
 *   <Text>Conteúdo da página aqui</Text>
 * </StandardPage>
 * ```
 */
function StandardPage({
  title,
  children,
  showBackButton = true,
  onFabPress,
  fabIcon = 'add',
  containerStyle,
  contentStyle,
  rightComponent,
}: StandardPageProps) {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const handleFabPress = () => {
    if (onFabPress) {
      onFabPress();
    } else {
      // Comportamento padrão do botão de ação
      console.log('Botão de ação flutuante pressionado');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {onFabPress && (
        <FloatingActionButton
          onPress={handleFabPress}
          icon={fabIcon}
          style={styles.fab}
        />
      )}
      
      {/* Cabeçalho */}
      <Header 
        title={title}
        showBackButton={showBackButton}
        rightComponent={rightComponent}
      />
      
      {/* Conteúdo principal */}
      <View style={[styles.content, contentStyle]}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginTop: 0,
    paddingTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 1000,
  },
});

export default StandardPage;
