/**
 * Importações de bibliotecas e componentes necessários
 */

// Componentes básicos do React Native para construção da interface
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useMemo } from 'react';
import StandardPage from '@/components/templates/StandardPage';
import ItemCard from '@/components/ItemCard';
// Hook personalizado para gerenciar autenticação do usuário
import { useAuth } from '@/hooks/useAuth';
// Biblioteca de ícones do Material Design
import { MaterialIcons } from '@expo/vector-icons';
// Gerenciamento de navegação entre telas
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
// Tipos personalizados para rotas e itens de menu
import type { AppRoute, MenuItem } from '@/@types/screens';

/**
 * Constantes e configurações de layout
 */

// Obtém a largura da tela para cálculos responsivos
const { width } = Dimensions.get('window');
// Margem padrão entre os cards
const CARD_MARGIN = 16;
// Calcula a largura dos cards baseado no tamanho da tela e margens
// Permite exibir 2 cards por linha com espaçamento adequado
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 3;

/**
 * Dados dos itens do menu principal
 * Cada item contém as informações necessárias para renderizar um card de navegação
 * @type {MenuItem[]}
 */
const menuItems: MenuItem[] = [
  { 
    id: '1', // Identificador único
    title: 'Ervas', // Título exibido no card
    icon: 'spa', // Ícone do MaterialIcons
    color: '#4CAF50', // Cor de destaque
    route: '/(tabs)/herbs', // Rota de navegação
    image: require('../../assets/images/home/ervas.png') // Imagem local
  },
  { 
    id: '2',
    title: 'Frentes',
    icon: 'account-balance',
    color: '#2196F3',
    route: '/(tabs)/fronts',
    image: require('../../assets/images/home/frentes.png')
  },
  { 
    id: '3',
    title: 'Leitura',
    icon: 'menu-book',
    color: '#9C27B0',
    route: '/(tabs)/reading',
    image: require('../../assets/images/home/leitura.png')
  },
  { 
    id: '4',
    title: 'Eventos',
    icon: 'event',
    color: '#FF5722',
    route: '/(tabs)/events',
    image: require('../../assets/images/home/eventos.png') // TODO: Replace with eventos.png when available
  },
  { 
    id: '5',
    title: 'Banhos',
    icon: 'bathtub',
    color: '#00BCD4',
    route: '/(tabs)/baths',
    image: require('../../assets/images/home/banhos.png')
  },
  { 
    id: '6',
    title: 'Limpeza',
    icon: 'cleaning-services',
    color: '#00BCD4',
    route: '/(tabs)/cleaning',
    image: require('../../assets/images/home/limpeza.png')
  },
  { 
    id: '7',
    title: 'Compras',
    icon: 'shopping-cart',
    color: '#FF9800',
    route: '/(tabs)/shopping',
    image: require('../../assets/images/home/001.png')
  },
  { 
    id: '8',
    title: 'Vendas',
    icon: 'point-of-sale',
    color: '#E91E63',
    route: '/(tabs)/sales',
    image: require('../../assets/images/home/002.png')
  },
  { 
    id: '9',
    title: 'Mensagens',
    icon: 'message',
    color: '#673AB7',
    route: '/(tabs)/messages',
    image: require('../../assets/images/home/003.png')
  },
  { 
    id: '10',
    title: 'Chat',
    icon: 'chat',
    color: '#4CAF50',
    route: '/chat',
    image: require('../../assets/images/home/003.png')
  },
  { 
    id: '11',
    title: 'Usuários',
    icon: 'people',
    color: '#9C27B0',
    route: '/(tabs)/users',
    image: require('../../assets/images/home/003.png')
  },
];

/**
 * Componente principal da tela inicial
 * 
 * Este componente representa a tela inicial do aplicativo, contendo:
 * - Cabeçalho com informações do usuário e data
 * - Grid de cards de navegação
 * - Seção de itens recentes
 * 
 * @returns {JSX.Element} Componente da tela inicial
 */
export default function HomeScreen() {
  // Hook para acessar os dados do usuário autenticado
  const { user } = useAuth();
  // Hook para navegação entre telas
  const router = useRouter();
  // Hook para acessar o objeto de navegação do drawer
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  
  // Extrai o primeiro nome do usuário ou usa 'Visitante' como valor padrão
  const userName = user?.name?.split(' ')[0] || 'Visitante'; // Nome do usuário ou 'Visitante'


  // Itens recentes para exibição na ordem: Ervas, Frentes, Leitura, Eventos, Banhos e Limpeza
  const recentItems = useMemo(() => [
    menuItems[0], // Ervas
    menuItems[1], // Frentes
    menuItems[2], // Leitura
    menuItems[3], // Eventos
    menuItems[4], // Banhos
    menuItems[5], // Limpeza
  ], []);

  /**
   * Manipula o clique em um card de navegação
   * 
   * @param {AppRoute} route - Rota para a qual o usuário deseja navegar
   * @returns {void}
   */
  const handleCardPress = (route: AppRoute): void => {
    try {
      // Verifica se a rota existe antes de navegar
      if (route && typeof route === 'string') {
        // Navega para a rota especificada
        // Usa um tipo mais genérico para evitar problemas de tipagem
        const routePath = route as string;
        router.push(routePath as any);
      } else {
        console.warn('Rota inválida:', route);
      }
    } catch (error) {
      console.error('Erro ao navegar para a rota:', route, error);
    }
  };

  return (
    <StandardPage
      title={`Bem-vindo, ${userName}!`}
      showBackButton={false}
      rightComponent={
        <TouchableOpacity onPress={() => router.push('/settings' as any)}>
          <Image 
            source={require('@/assets/images/profile/user.jpg')} 
            style={styles.avatar} 
          />
        </TouchableOpacity>
      }
      containerStyle={styles.container}
      contentStyle={styles.content}
    >
      {/* Conteúdo principal */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
          {/* 
            Seção do grid de cards de navegação 
            Exibe os principais recursos do aplicativo
          */}
          <View style={styles.section}>
            <View style={styles.menuGrid}>
              {/* Mapeia cada item do menu para criar um card */}
              {menuItems.map((item) => (
                <ItemCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  onPress={() => handleCardPress(item.route)}
                  // Estilo personalizado para o card de Eventos
                  imageStyle={item.title === 'Eventos' ? styles.menuCardImageEvents : {}}
                />
              ))}
            </View>
          </View>

          {/* 
            Seção de itens recentes 
            Mostra os itens acessados recentemente pelo usuário
          */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recentes</Text>
              {/* Botão para ver todos os itens recentes */}
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver tudo</Text>
              </TouchableOpacity>
            </View>
            {/* Container para os itens recentes em linha */}
            <View style={styles.recentItemsContainer}>
              {/* Mapeia os itens recentes da lista recentItems */}
              {recentItems.map((item) => (
                <TouchableOpacity 
                  key={`recent-${item.id}`} 
                  style={styles.recentItem}
                  onPress={() => handleCardPress(item.route)}
                >
                  <View style={styles.recentItemIcon}>
                    <Image 
                      source={item.image} 
                      style={styles.recentItemImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.recentItemText} numberOfLines={1}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
    </StandardPage>
  );
}

/**
 * Estilos da tela inicial
 * 
 * Utiliza StyleSheet.create para melhor desempenho e validação de estilos
 * Os estilos são organizados por ordem de aparecimento no componente
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 24,
    marginHorizontal: '2.5%',
  },
  menuCardImageEvents: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginTop: -10,
  },
  section: {
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#006B3F',
    fontFamily: 'Poppins_600SemiBold',
  },
  seeAll: {
    color: '#006B3F',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  recentItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  recentItem: {
    alignItems: 'center',
    width: '15%',
    minWidth: 60,
    marginBottom: 10,
  },
  recentItemIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -3,
  },
  recentItemImage: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  recentItemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#006B3F',
    fontFamily: 'Poppins_400Regular',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});