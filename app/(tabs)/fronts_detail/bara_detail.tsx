import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
import { useAuth } from '@/hooks/useAuth';

// Dados mockados - em uma aplicação real, isso viria de uma API
const FRENTES_DETAILS = {
  '1': {
    id: '1',
    name: 'Oxalá',
    description: 'O grande pai da Umbanda, senhor da criação e da paz. Oxalá é o criador do mundo e da humanidade, representando a paz, a sabedoria e a pureza.',
    orixas: ['Oxalá', 'Oxaguiã', 'Oxalufã'],
    attributes: ['Paz', 'Harmonia', 'Sabedoria', 'Criação'],
    image: require('@/assets/images/fronts/oxala.png'),
    day: 'Domingo',
    color: '#FFFFFF',
    elements: ['Ar', 'Céu'],
    offerings: ['Flores brancas', 'Arroz doce', 'Canjica branca']
  },
  // Adicione outras frentes conforme necessário
} as const;

type FrenteDetail = typeof FRENTES_DETAILS[keyof typeof FRENTES_DETAILS];

export default function BaraDetailScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const frente = FRENTES_DETAILS[id as keyof typeof FRENTES_DETAILS];

  if (!frente) {
    return (
      <View style={styles.container}>
        <Text>Frente não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons 
          name="arrow-back" 
          size={24} 
          color="#fff" 
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>{frente.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={frente.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{frente.description}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orixás</Text>
            <View style={styles.tagsContainer}>
              {frente.orixas.map((orixa, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{orixa}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atributos</Text>
            <View style={styles.tagsContainer}>
              {frente.attributes.map((attr, index) => (
                <View key={index} style={[styles.tag, styles.attributeTag]}>
                  <Text style={[styles.tagText, styles.attributeText]}>{attr}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Dia da semana</Text>
              <Text style={styles.infoValue}>{frente.day}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cor</Text>
              <View style={[styles.colorIndicator, { backgroundColor: frente.color }]} />
            </View>
          </View>

          {frente.elements && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Elementos</Text>
              <View style={styles.tagsContainer}>
                {frente.elements.map((element, index) => (
                  <View key={index} style={[styles.tag, styles.elementTag]}>
                    <Text style={[styles.tagText, styles.elementText]}>{element}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {frente.offerings && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Oferendas</Text>
              <View style={styles.list}>
                {frente.offerings.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#006B3F',
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0, 107, 63, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '80%',
  },
  detailsContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#006B3F',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  tagText: {
    fontSize: 14,
    color: '#2E7D32',
    fontFamily: 'Poppins_500Medium',
  },
  attributeTag: {
    backgroundColor: '#E3F2FD',
  },
  attributeText: {
    color: '#1565C0',
  },
  elementTag: {
    backgroundColor: '#F3E5F5',
  },
  elementText: {
    color: '#7B1FA2',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006B3F',
    marginRight: 8,
  },
  listText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
