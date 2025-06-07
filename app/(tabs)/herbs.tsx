import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
import { useAuth } from '@/hooks/useAuth';
import FloatingActionButton from '@/components/common/FloatingActionButton';

// Definição do tipo para os itens de ervas
type HerbItem = {
  id: string;
  name: string;
  image: any;
  scientificName?: string;
  description?: string;
  uses?: string[];
};

// Obtém a largura da tela para cálculos responsivos
const { width } = Dimensions.get('window');
// Margem padrão entre os cards
const CARD_MARGIN = 16;
// Calcula a largura dos cards baseado no tamanho da tela e margens
// Permite exibir 2 cards por linha com espaçamento adequado
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 3;

// Dados das ervas
const HERBS: HerbItem[] = [
  { 
    id: '1', 
    name: 'Alecrim', 
    scientificName: 'Rosmarinus officinalis',
    description: 'Planta aromática com propriedades estimulantes e digestivas.',
    uses: ['Estimulante', 'Digestivo', 'Antisséptico'],
    image: require('@/assets/images/herbs/alecrim.webp')
  },
  { 
    id: '2', 
    name: 'Alfazema', 
    scientificName: 'Lavandula angustifolia',
    description: 'Conhecida por suas propriedades calmantes e relaxantes.',
    uses: ['Calmante', 'Relaxante', 'Antisséptico'],
    image: require('@/assets/images/herbs/alfazema.webp')
  },
  { 
    id: '3', 
    name: 'Aroeira', 
    scientificName: 'Schinus terebinthifolius',
    description: 'Usada na medicina popular como anti-inflamatório e cicatrizante.',
    uses: ['Anti-inflamatório', 'Cicatrizante', 'Antisséptico'],
    image: require('@/assets/images/herbs/aroeira.webp')
  },
  { 
    id: '4', 
    name: 'Arruda', 
    scientificName: 'Ruta graveolens',
    description: 'Tradicionalmente usada para proteção e limpeza espiritual.',
    uses: ['Proteção', 'Limpeza espiritual', 'Antirreumático'],
    image: require('@/assets/images/herbs/arruda.webp')
  },
  { 
    id: '5', 
    name: 'Espada de São Jorge', 
    scientificName: 'Sansevieria trifasciata',
    description: 'Conhecida por afastar energias negativas e trazer proteção.',
    uses: ['Proteção', 'Purificação', 'Decoração'],
    image: require('@/assets/images/herbs/espada-sao-jorge.webp')
  },
  { 
    id: '6', 
    name: 'Eucalipto', 
    scientificName: 'Eucalyptus globulus',
    description: 'Amplamente utilizado para problemas respiratórios.',
    uses: ['Descongestionante', 'Expectorante', 'Antisséptico'],
    image: require('@/assets/images/herbs/eucalipto.webp')
  },
  { 
    id: '7', 
    name: 'Guiné', 
    scientificName: 'Petiveria alliacea',
    description: 'Usada na medicina popular para diversos fins terapêuticos.',
    uses: ['Analgésico', 'Anti-inflamatório', 'Imunomodulador'],
    image: require('@/assets/images/herbs/guine.webp')
  },
  { 
    id: '8', 
    name: 'Cipó Mil-Homens', 
    scientificName: 'Aristolochia cymbifera',
    description: 'Conhecido por suas propriedades medicinais diversas.',
    uses: ['Anti-inflamatório', 'Analgésico', 'Antimicrobiano'],
    image: require('@/assets/images/herbs/cipo-mil-homens.webp')
  },
  { 
    id: '9', 
    name: 'Canela', 
    scientificName: 'Cinnamomum verum',
    description: 'Especiaria com propriedades termogênicas e anti-inflamatórias.',
    uses: ['Termogênico', 'Anti-inflamatório', 'Antioxidante'],
    image: require('@/assets/images/herbs/canela.webp')
  },
  { 
    id: '10', 
    name: 'Anis Estrelado', 
    scientificName: 'Illicium verum',
    description: 'Usado para problemas digestivos e como aromatizante.',
    uses: ['Digestivo', 'Antisséptico', 'Aromatizante'],
    image: require('@/assets/images/herbs/anis-estrelado.png')
  },
];

// Componente de card de erva
const HerbCard = ({ item, onPress }: { item: HerbItem, onPress: (item: HerbItem) => void }) => (
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

export default function HerbsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  
  // Data removida conforme solicitado
  
  // Extrai o primeiro nome do usuário ou usa 'Visitante' como valor padrão
  const userName = user?.name?.split(' ')[0] || 'Visitante';

  const handleHerbPress = (herb: HerbItem) => {
    // Navigate to the herb detail screen with the herb's ID
    // For now, all herbs will go to the lavender detail page
    router.push({
      pathname: 'herb_detail/lavender_detail',
      params: { id: herb.id }
    } as any);
  };

  const handleAddHerb = () => {
    // Handle add new herb action
    alert('Adicionar nova erva');
  };

  return (
    <View style={styles.container}>
      <FloatingActionButton
        onPress={handleAddHerb}
        icon="add"
        style={styles.fab}
      />
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="blur-on" size={34} color="#fff" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerCenterText}>Ylê Axé</Text>
          <Text style={styles.headerCenterSubtext}>Xangô & Oxum</Text>
        </View>
        
        <View style={styles.headerIcons}>
          <Image 
            source={require('@/assets/images/profile/user.jpg')} 
            style={styles.avatar} 
          />
        </View>
      </View>

      {/* Saudação e data */}
      <View style={styles.titlesContainer}>
        <View style={styles.titlesText}>
          <View style={styles.titleContainer}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <MaterialIcons name="navigate-before" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Ervas</Text>
          </View>
        </View>
      </View>
      
      {/* Conteúdo principal */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.menuGrid}>
              {HERBS.map((herb) => (
                <TouchableOpacity 
                  key={herb.id}
                  style={styles.herbCard}
                  onPress={() => handleHerbPress(herb)}
                >
                  <View style={styles.herbImageContainer}>
                    <Image 
                      source={herb.image} 
                      style={styles.herbImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.herbTitle} numberOfLines={1}>
                    {herb.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginTop: -50, // Aumenta a sobreposição para cima
    paddingTop: 20, // Compensa o margin negativo
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 1000,
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
});
