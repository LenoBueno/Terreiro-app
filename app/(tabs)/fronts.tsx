import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
import { useAuth } from '@/hooks/useAuth';
import FloatingActionButton from '@/components/common/FloatingActionButton';
import Header from '@/components/Header';

// Definição do tipo para os itens de frentes
type FrenteItem = {
  id: string;
  name: string;
  image: any;
  description?: string;
  orixas?: string[];
  attributes?: string[];
};

// Obtém a largura da tela para cálculos responsivos
const { width } = Dimensions.get('window');
// Margem padrão entre os cards
const CARD_MARGIN = 16;
// Calcula a largura dos cards baseado no tamanho da tela e margens
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 3; // 3 cards por linha

// Dados das frentes
const FRENTES: FrenteItem[] = [
  { 
    id: '1', 
    name: 'Bará', 
    description: 'O mensageiro dos orixás, dono das encruzilhadas e dos caminhos.',
    orixas: ['Bará', 'Exu', 'Elegguá'],
    attributes: ['Comunicação', 'Abertura de Caminhos', 'Movimento'],
    image: require('@/assets/images/fronts/bara.png')
  },
  { 
    id: '2', 
    name: 'Ogum', 
    description: 'O guerreiro e protetor, senhor do ferro e das estradas.',
    orixas: ['Ogum', 'Ogum Megê', 'Ogum Naruê'],
    attributes: ['Proteção', 'Coragem', 'Superação'],
    image: require('@/assets/images/fronts/ogum.png')
  },
  { 
    id: '3', 
    name: 'Iansã', 
    description: 'Senhora dos ventos e tempestades, dona dos raios e do fogo.',
    orixas: ['Iansã', 'Iyá Mapô', 'Oyá'],
    attributes: ['Força', 'Coragem', 'Transformação'],
    image: require('@/assets/images/fronts/iansa.png')
  },
  { 
    id: '4', 
    name: 'Xangô', 
    description: 'O rei da justiça, senhor do trovão e da pedreira.',
    orixas: ['Xangô', 'Xangô Agodô', 'Xangô Aganjú'],
    attributes: ['Justiça', 'Equilíbrio', 'Poder'],
    image: require('@/assets/images/fronts/xango.png')
  },
  { 
    id: '5', 
    name: 'Odé', 
    description: 'O caçador e provedor, senhor das matas e da fartura.',
    orixas: ['Oxóssi', 'Oxóssi Odé', 'Oxóssi Inlê'],
    attributes: ['Prosperidade', 'Sustento', 'Sorte'],
    image: require('@/assets/images/fronts/ode.png')
  },
  { 
    id: '6', 
    name: 'Otim', 
    description: 'O orixá da caça e da fartura, guardião das matas e dos animais.',
    orixas: ['Otim', 'Oxóssi Otim'],
    attributes: ['Fartura', 'Prosperidade', 'Sustento'],
    image: require('@/assets/images/fronts/otim.png')
  },
  { 
    id: '7', 
    name: 'Obá', 
    description: 'A guerreira das águas revoltas, senhora da força e da resistência.',
    orixas: ['Obá', 'Obá Igbonã', 'Obá Níla'],
    attributes: ['Força', 'Coragem', 'Determinação'],
    image: require('@/assets/images/fronts/oba.png')
  },
  { 
    id: '8', 
    name: 'Xapanã', 
    description: 'O senhor das doenças e da cura, orixá da terra e da saúde.',
    orixas: ['Xapanã', 'Omolu', 'Obaluaê'],
    attributes: ['Cura', 'Transformação', 'Renovação'],
    image: require('@/assets/images/fronts/xapana.png')
  },
  { 
    id: '9', 
    name: 'Ibeji', 
    description: 'Os gêmeos divinos, representação da alegria e da inocência.',
    orixas: ['Ibeji', 'Cosme', 'Damião'],
    attributes: ['Alegria', 'Inocência', 'Brinquedos'],
    image: require('@/assets/images/fronts/ibeji.png')
  },
  { 
    id: '10', 
    name: 'Oxum', 
    description: 'A rainha das águas doces, senhora do ouro e do amor.',
    orixas: ['Oxum', 'Oxum Ipondá', 'Oxum Ijimú'],
    attributes: ['Amor', 'Beleza', 'Riqueza'],
    image: require('@/assets/images/fronts/oxum.png')
  },
  { 
    id: '11', 
    name: 'Iemanjá', 
    description: 'A rainha do mar, mãe de todos os orixás, senhora das águas salgadas.',
    orixas: ['Iemanjá', 'Iemanjá Ogunté', 'Iemanjá Dandalunda'],
    attributes: ['Amor', 'Proteção', 'Fertilidade'],
    image: require('@/assets/images/fronts/iemanja.png')
  },
  { 
    id: '12', 
    name: 'Oxalá', 
    description: 'O grande pai da Umbanda, senhor da criação e da paz.',
    orixas: ['Oxalá', 'Oxaguiã', 'Oxalufã'],
    attributes: ['Paz', 'Harmonia', 'Sabedoria'],
    image: require('@/assets/images/fronts/oxala.png')
  }
];

// Componente de card de frente
const FrenteCard = ({ item, onPress }: { item: FrenteItem, onPress: (item: FrenteItem) => void }) => (
  <TouchableOpacity 
    style={styles.herbCard}
    onPress={() => onPress(item)}
  >
    <View style={styles.herbImageContainer}>
      <Image 
        source={item.image} 
        style={styles.herbImage}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.herbTitle} numberOfLines={1}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

export default function FrentesScreen() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const handleFrentePress = (frente: FrenteItem) => {
    // Determina qual página de detalhes deve ser aberta com base no nome da frente
    const detailPage = frente.name === 'Xapanã' 
      ? 'xapana_detail' 
      : 'bara_detail';
      
    router.push({
      pathname: `/(tabs)/fronts_detail/${detailPage}` as any,
      params: { id: frente.id, name: frente.name }
    } as any);
  };

  const handleAddFrente = () => {
    // Navegar para a tela de adicionar nova frente
    router.push('/(tabs)/add_frente' as any);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Header 
        title="Frentes"
        showBackButton={true}
        rightComponent={
          <Image 
            source={require('@/assets/images/profile/user.jpg')} 
            style={styles.avatar} 
          />
        }
      />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.menuGrid}>
              {FRENTES
                .sort((a, b) => {
                  // Ordem específica definida manualmente
                  const order = [
                    'Bará', 'Ogum', 'Iansã', 'Xangô', 'Odé', 
                    'Otim', 'Obá', 'Xapanã', 'Ibeji', 'Oxum', 
                    'Iemanjá', 'Oxalá'
                  ];
                  return order.indexOf(a.name) - order.indexOf(b.name);
                })
                .map((frente) => (
                  <FrenteCard 
                    key={frente.id} 
                    item={frente} 
                    onPress={handleFrentePress} 
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
      </View>

      {user?.role === 'admin' || user?.role === 'superadmin' ? (
        <FloatingActionButton 
          icon="add" 
          onPress={handleAddFrente}
          style={styles.fab}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: '#006B3F',
  },
  headerLeft: {
    flex: 1,
    paddingLeft: 16,
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerCenterText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerCenterSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins_400Regular',
  },
  headerIcons: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titlesContainer: {
    paddingTop: 0,
    paddingHorizontal: 30,
    paddingBottom: 70, // Reduzido para compensar a remoção da data
    backgroundColor: '#006B3F',
  },
  titlesText: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 0,
    marginLeft: -10,
    marginTop: -10,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: -10, // Movendo o título para cima
    marginBottom: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginTop: 0, // Aumenta a sobreposição para cima
    paddingTop: 20, // Compensa o margin negativo
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  herbCard: {
    width: CARD_WIDTH,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: CARD_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  herbImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginBottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  herbImage: {
    width: '80%',
    height: '80%',
  },
  herbTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    width: '100%',
    overflow: 'hidden',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 1000,
  },
  moreText: {
    fontSize: 10,
    color: '#1565C0',
    fontWeight: '500',
  },
});
