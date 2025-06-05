import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ReadingItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image: string;
};

const READINGS: ReadingItem[] = [
  {
    id: '1',
    title: 'Introdução à Umbanda',
    subtitle: 'Fundamentos e História',
    description:
      'Uma introdução aos fundamentos e história da Umbanda, suas origens e principais conceitos.',
    content:
      'A Umbanda é uma religião genuinamente brasileira que sintetiza elementos de várias tradições espirituais. Surgida no início do século XX, ela incorpora elementos do Candomblé, Catolicismo, Kardecismo e tradições indígenas.',
    image: 'https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg',
  },
  {
    id: '2',
    title: 'Orixás',
    subtitle: 'Guias e Protetores',
    description:
      'Conheça os principais Orixás da Umbanda e suas características.',
    content:
      'Os Orixás são entidades espirituais que representam forças da natureza e aspectos da personalidade humana. Cada Orixá tem suas características próprias, domínios de atuação e formas de trabalho.',
    image: 'https://images.pexels.com/photos/6152994/pexels-photo-6152994.jpeg',
  },
  {
    id: '3',
    title: 'Guias Espirituais',
    subtitle: 'Mentores e Protetores',
    description: 'Entenda o papel dos Guias Espirituais na Umbanda.',
    content:
      'Os Guias Espirituais são entidades que se manifestam nos terreiros para auxiliar os médiuns e consulentes. Eles podem se apresentar como Caboclos, Pretos-Velhos, Crianças, entre outras falanges.',
    image: 'https://images.pexels.com/photos/6152995/pexels-photo-6152995.jpeg',
  },
  {
    id: '4',
    title: 'Rituais e Oferendas',
    subtitle: 'Práticas e Significados',
    description: 'Conheça os rituais e oferendas na Umbanda.',
    content:
      'Os rituais na Umbanda são práticas que visam a conexão com o sagrado, incluindo oferendas, banhos de ervas, defumações e trabalhos espirituais específicos para cada necessidade.',
    image: 'https://images.pexels.com/photos/6152996/pexels-photo-6152996.jpeg',
  },
  {
    id: '5',
    title: 'Desenvolvimento Mediúnico',
    subtitle: 'Caminho da Mediunidade',
    description: 'Entenda o processo de desenvolvimento mediúnico na Umbanda.',
    content:
      'O desenvolvimento mediúnico é um processo de aprendizado e amadurecimento espiritual que permite ao médium se conectar e trabalhar em harmonia com as entidades espirituais.',
    image: 'https://images.pexels.com/photos/6152997/pexels-photo-6152997.jpeg',
  },
  {
    id: '6',
    title: 'Ética na Umbanda',
    subtitle: 'Princípios e Valores',
    description: 'Conheça os princípios éticos da religião de Umbanda.',
    content:
      'A ética na Umbanda está baseada em princípios como caridade, respeito ao próximo, humildade e amor ao próximo, seguindo os ensinamentos das entidades espirituais.',
    image: 'https://images.pexels.com/photos/6152998/pexels-photo-6152998.jpeg',
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8; // Margem entre os itens
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 2; // 2 itens por linha com margens laterais

// TypeScript interfaces
interface ReadingCardProps {
  item: ReadingItem;
  onPress: (item: ReadingItem) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titlesText: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  readingsGrid: {
    paddingBottom: 16,
  },
  readingCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    margin: CARD_MARGIN / 2,
    overflow: 'hidden',
    elevation: 2,
  },
  readingImage: {
    width: '100%',
    height: 120,
  },
  readingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 8,
  },
  readingSubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalTextContainer: {
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 16,
    lineHeight: 20,
  },
  detailSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ReadingCard: React.FC<ReadingCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.readingCard} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.image }}
      style={styles.readingImage}
      resizeMode="cover"
    />
    <Text style={styles.readingTitle} numberOfLines={1}>
      {item.title}
    </Text>
    <Text style={styles.readingSubtitle} numberOfLines={1}>
      {item.subtitle}
    </Text>
  </TouchableOpacity>
);

const ReadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const [selectedReading, setSelectedReading] = useState<ReadingItem | null>(
    null,
  );
  const handleCardPress = (item: ReadingItem) => {
    setSelectedReading(item);
  };

  const toggleDrawer = () => {
    // @ts-ignore - Navigation type will be properly handled by React Navigation
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleDrawer}>
              <MaterialIcons
                name="blur-on"
                size={34}
                color="#fff"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerIcons}>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Títulos */}
        <View style={styles.titlesContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color="#fff"
              style={{ marginLeft: 1 }}
            />
          </TouchableOpacity>
          <View style={styles.titlesText}>
            <Text style={styles.headerTitle}>Leituras</Text>
            <Text style={styles.headerSubtitle}>Conhecimento e Sabedoria</Text>
          </View>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <FlatList
            data={READINGS}
            renderItem={({ item }) => (
              <ReadingCard item={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.readingsGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Modal de Detalhes */}
        <Modal
          visible={!!selectedReading}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedReading(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedReading(null)}
              >
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <ScrollView>
                <Image
                  source={{ uri: selectedReading?.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalTitle}>{selectedReading?.title}</Text>
                  <Text style={styles.modalSubtitle}>
                    {selectedReading?.subtitle}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedReading?.description}
                  </Text>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailText}>
                      {selectedReading?.content}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
}
