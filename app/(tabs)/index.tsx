/**
 * Importações de bibliotecas e componentes necessários
 */

// Componentes básicos do React Native para construção da interface
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useMemo } from 'react';
import { Header } from '@/components/Header';
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
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 2;

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
  
  // Formata a data atual no formato DD/MM/AAAA
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); // Dia com 2 dígitos
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos
  const year = currentDate.getFullYear(); // Ano com 4 dígitos
  const formattedDate = `${day}/${month}/${year}`; // Data formatada
  
    // Extrai o primeiro nome do usuário ou usa 'Visitante' como valor padrão
  const userName = user?.name?.split(' ')[0] || 'Visitante'; // Nome do usuário ou 'Visitante'


  // Itens recentes para exibição
  const recentItems = useMemo(() => [
    menuItems[0], // Ervas
    menuItems[5], // Limpeza
    menuItems[3], // Eventos
    menuItems[4], // Banhos
  ], []);

  /**
   * Manipula o clique em um card de navegação
   * 
   * @param {AppRoute} route - Rota para a qual o usuário deseja navegar
   * @returns {void}
   */
  const handleCardPress = (route: AppRoute): void => {
    // Navega para a rota especificada
    // O type assertion 'as any' é usado temporariamente para contornar
    // limitações de tipagem do Expo Router
    router.push(route as any);
  };

  return (
    // Container principal da tela
    <View style={styles.container}>
      {/* 
        Cabeçalho da aplicação
        Contém o menu lateral, título central e ícones de ação
      */}
      <View style={styles.header}>
        {/* Container do botão de menu lateral */}
        <View style={styles.headerLeft}>
          {/* Ícone de menu que abre o drawer de navegação */}
          <TouchableOpacity 
            onPress={() => {
              // Usando o hook useNavigation para acessar o objeto de navegação
              // e chamar o método openDrawer
              navigation.openDrawer();
            }}
          >
            <MaterialIcons 
              name="blur-on" 
              size={34} 
              color="#fff" 
              style={{ marginLeft: 16 }} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Área central do cabeçalho com o título do terreiro */}
        <View style={styles.headerCenter}>
          <Text style={styles.headerCenterText}>Ylê Axé</Text>
          <Text style={styles.headerCenterSubtext}>Xangô & Oxum</Text>
        </View>
        
        {/* Container para o avatar do usuário */}
        <View style={styles.headerIcons}>
          {/* Avatar do usuário - poderia ser clicável para acessar o perfil */}
          <Image 
            source={require('@/assets/images/profile/user.jpg')} 
            style={styles.avatar} 
          />
        </View>
      </View>

      {/* 
        Seção de boas-vindas com nome do usuário e data atual 
        Posicionada logo abaixo do cabeçalho
      */}
      <View style={styles.titlesContainer}>
        <View style={styles.titlesText}>
          {/* Saudação personalizada com o nome do usuário */}
          <Text style={styles.headerTitle}>Bem-vindo, {userName}!</Text>
          {/* Exibe a data atual formatada */}
          <Text style={styles.headerSubtitle}>{formattedDate}</Text>
        </View>
      </View>

      {/* 
        Área de conteúdo principal da tela
        Utiliza ScrollView para permitir rolagem quando o conteúdo for maior que a tela
      */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false} // Esconde a barra de rolagem vertical
        >
          {/* 
            Seção do grid de cards de navegação 
            Exibe os principais recursos do aplicativo
          */}
          <View style={styles.section}>
            <View style={styles.menuGrid}>
              {/* Mapeia cada item do menu para criar um card */}
              {menuItems.map((item) => (
                <TouchableOpacity 
                  key={item.id} // Chave única para otimização de renderização
                  style={styles.menuCard}
                  onPress={() => handleCardPress(item.route)} // Navega ao clicar
                >
                  <View style={styles.menuCardContent}>
                    <Image 
                      source={item.image} 
                      style={item.title === 'Eventos' ? styles.menuCardImageEvents : styles.menuCardImage} 
                      resizeMode="contain" // Mantém a proporção da imagem
                    />
                  </View>
                  <Text style={styles.menuCardText}>{item.title}</Text>
                </TouchableOpacity>
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
            {/* ScrollView horizontal para os itens recentes */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} // Esconde a barra de rolagem horizontal
              contentContainerStyle={styles.recentItemsContainer}
            >
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
                  <Text style={styles.recentItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
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
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#006B3F',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  headerCenterSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 2,
  },
  headerIcon: {
    marginLeft: 20,
  },
  titlesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  titlesText: {
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 24,
    marginHorizontal: '2.5%',
  },
  menuCard: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: '1.66%',
  },
  menuCardContent: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuCardImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  // Estilo específico para a imagem de eventos
  menuCardImageEvents: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginTop: -10, // Ajuste fino para centralizar verticalmente
  },
  menuCardText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#006B3F',
    fontFamily: 'Poppins_500Medium',
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
    paddingRight: 10,
  },
  recentItem: {
    marginRight: 10, // Aumentado de 15 para 20
    alignItems: 'center',
    width: 80, // Aumentado de 70 para 80
  },
  recentItemIcon: {
    width: 60, // Aumentado de 50 para 60
    height: 60, // Aumentado de 50 para 60
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -3,
  },
  recentItemImage: {
    width: 50, // Aumentado de 40 para 50
    height: 50, // Aumentado de 40 para 50
    backgroundColor: 'transparent',
  },
  recentItemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#006B3F',
    fontFamily: 'Poppins_400Regular',
  },
  // Estilo do avatar do usuário no cabeçalho
  avatar: {
    width: 40, // Tamanho fixo
    height: 40, // Tamanho fixo
    borderRadius: 20, // Borda arredondada para criar um círculo
    marginLeft: 15, // Espaçamento à esquerda
    borderWidth: 0, // Borda branca
    borderColor: '#fff', // Cor da borda
  },
});