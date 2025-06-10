import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  RefreshControl,
  ScrollView,
  Share,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StandardPage from '@/components/templates/StandardPage';
import { Bath } from '../../types/bath';

interface BathCardProps {
  bath: Bath;
  onPress: (bath: Bath) => void;
}

const BathCard = ({ bath, onPress }: BathCardProps) => {
  return (
    <TouchableOpacity style={styles.bathCard} onPress={() => onPress(bath)}>
      <Image
        source={{
          uri:
            bath.imageUrl ||
            'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg',
        }}
        style={styles.bathImage}
        resizeMode="cover"
      />
      <View style={styles.bathContent}>
        <Text style={styles.bathTitle} numberOfLines={1} ellipsizeMode="tail">
          {bath.title}
        </Text>
        <Text
          style={styles.bathSubtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {bath.subtitle}
        </Text>
        <Text
          style={styles.bathDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {bath.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Mock function to fetch baths - replace with your actual API call
async function fetchBaths(): Promise<Bath[]> {
  // This is a mock implementation
  return [
    {
      id: '1',
      title: 'Banho de Ervas',
      subtitle: 'Para limpeza espiritual',
      description: 'Banho preparado com ervas especiais para limpeza e renovação energética.',
      preparation: 'Ferva as ervas em água, coe e use no banho.',
      imageUrl: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg',
    },
    // Add more mock data as needed
  ];
}

export default function BathsScreen() {
  const router = useRouter();
  const [baths, setBaths] = useState<Bath[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBath, setSelectedBath] = useState<Bath | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const loadBaths = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const fetchedBaths = await fetchBaths();
      setBaths(fetchedBaths);
    } catch (error) {
      console.error('Erro ao carregar banhos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadBaths(true);
  };

  useEffect(() => {
    loadBaths();
  }, []);

  const handleShare = async (bath: Bath) => {
    try {
      await Share.share({
        message: `Confira este banho: ${bath.title}\n\n${bath.description}\n\nPreparo: ${bath.preparation}`,
        title: bath.title,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <StandardPage
      title="Banhos"
      showBackButton={true}
      contentStyle={{ backgroundColor: '#fff' }}
    >
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006B3F" />
          </View>
        ) : (
          <FlatList
            data={baths}
            renderItem={({ item }) => (
              <BathCard
                bath={item}
                onPress={(bath) => {
                  setSelectedBath(bath);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.bathsList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#006B3F']}
                tintColor="#006B3F"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="bathtub" size={48} color="#9E9E9E" />
                <Text style={styles.emptyText}>Nenhum banho encontrado</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Modal de Detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedBath}
        onRequestClose={() => setSelectedBath(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedBath?.title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedBath(null)}
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {selectedBath?.imageUrl && (
                <Image
                  source={{ uri: selectedBath.imageUrl }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Descrição</Text>
                <Text style={styles.bathText}>
                  {selectedBath?.description}
                </Text>
              </View>

              <View style={styles.modalSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Modo de Preparo</Text>
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => selectedBath && handleShare(selectedBath)}
                  >
                    <MaterialIcons name="share" size={20} color="#006B3F" />
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.bathText}>
                  {selectedBath?.preparation}
                </Text>
              </View>

              {selectedBath?.benefits && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Benefícios</Text>
                  <Text style={styles.bathText}>{selectedBath.benefits}</Text>
                </View>
              )}

              {selectedBath?.tips && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Dicas</Text>
                  <Text style={styles.bathText}>{selectedBath.tips}</Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSelectedBath(null)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </StandardPage>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  bathsList: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9E9E9E',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  bathCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bathImage: {
    width: '100%',
    height: 160,
  },
  bathContent: {
    padding: 16,
  },
  bathTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  bathSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    marginBottom: 8,
  },
  bathDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    lineHeight: 20,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  bathText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    lineHeight: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  shareButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#006B3F',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    backgroundColor: '#006B3F',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});
