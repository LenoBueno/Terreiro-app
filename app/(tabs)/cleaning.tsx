import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import StandardPage from '@/components/templates/StandardPage';

interface CleaningItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  method: string;
  benefits: string;
  image: string;
  tips?: string;
}



const CLEANINGS = [
  {
    id: '1',
    name: 'Defumação',
    subtitle: 'Limpeza Energética',
    description: 'Técnica de limpeza espiritual com ervas sagradas.',
    method:
      'Acenda as ervas secas em um defumador e circule o ambiente em sentido horário, começando pela porta de entrada.',
    benefits:
      'Purifica o ambiente, remove energias negativas e harmoniza as vibrações do local.',
    image: 'https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg',
  },
  {
    id: '2',
    name: 'Sal Grosso',
    subtitle: 'Purificação',
    description: 'Método tradicional de limpeza com sal grosso.',
    method:
      'Espalhe sal grosso nos cantos do ambiente e deixe agir por 24 horas antes de recolher.',
    benefits:
      'Absorve energias densas e negativas, protege o ambiente e seus ocupantes.',
    image: 'https://images.pexels.com/photos/4207792/pexels-photo-4207792.jpeg',
  },
  {
    id: '3',
    name: 'Água com Sal',
    subtitle: 'Purificação',
    description: 'Banho de limpeza com água e sal grosso.',
    method:
      'Tome banho com água e sal grosso, do pescoço para baixo, em sentido descendente.',
    benefits:
      'Remove energias negativas, limpa o corpo energético e renova as energias.',
    image: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg',
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8; // Margem entre os itens
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 3; // 3 itens por linha com margens laterais

const CleaningCard = ({
  item,
  onPress,
}: {
  item: CleaningItem;
  onPress: (item: CleaningItem) => void;
}) => (
  <TouchableOpacity style={styles.cleaningCard} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.image }}
      style={styles.cleaningImage}
      resizeMode="cover"
    />
    <Text style={[styles.cleaningName]} numberOfLines={2}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

export default function CleaningScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CleaningItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulando carregamento de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCardPress = (item: CleaningItem) => {
    setSelectedItem(item);
  };

  const handleShare = async (item: CleaningItem) => {
    try {
      await Share.share({
        message: `Confira esta limpeza: ${item.name}\n\n${item.description}\n\n${item.method}`,
        title: item.name,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <StandardPage 
      title="Limpezas" 
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
            data={CLEANINGS}
            renderItem={({ item }) => (
              <CleaningCard item={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.cleaningGrid}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#006B3F']}
                tintColor="#006B3F"
              />
            }
          />
        )}
      </View>

      {/* Modal de Detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {selectedItem?.image && (
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Descrição</Text>
                <Text style={styles.itemText}>
                  {selectedItem?.description}
                </Text>
              </View>

              <View style={styles.modalSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Método</Text>
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => selectedItem && handleShare(selectedItem)}
                  >
                    <MaterialIcons name="share" size={20} color="#006B3F" />
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemText}>
                  {selectedItem?.method}
                </Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Benefícios</Text>
                <Text style={styles.itemText}>
                  {selectedItem?.benefits}
                </Text>
              </View>

              {selectedItem?.tips && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Dicas</Text>
                  <Text style={styles.itemText}>{selectedItem.tips}</Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSelectedItem(null)}
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
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cleaningCard: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cleaningImage: {
    width: '100%',
    height: 150,
  },
  cleaningName: {
    padding: 8,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    textAlign: 'center',
  },
  cleaningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 4,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9E9E9E',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
    elevation: 5,
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
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#006B3F',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    lineHeight: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  shareButtonText: {
    marginLeft: 4,
    color: '#006B3F',
    fontFamily: 'Poppins_500Medium',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    backgroundColor: '#006B3F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
  },
});
