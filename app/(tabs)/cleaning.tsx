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
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

type CleaningItem = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  method: string;
  benefits: string;
  image: string;
};

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
    <Text style={styles.cleaningName} numberOfLines={2}>
      {item.name}
    </Text>
  </TouchableOpacity>
);



export default function CleaningScreen() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleCardPress = (item: CleaningItem) => {
    // Aqui você pode adicionar a lógica para abrir os detalhes do item
    console.log('Item selecionado:', item);
  };

  const handleBackPress = () => {
    navigation.navigate('(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
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
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color="#fff"
              style={{ marginLeft: 1 }}
            />
          </TouchableOpacity>
          <View style={styles.titlesText}>
            <Text style={styles.headerTitle}>Limpezas</Text>
            <Text style={styles.headerSubtitle}>Técnicas de Limpeza</Text>
          </View>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <FlatList
            data={CLEANINGS}
            renderItem={({ item }) => (
              <CleaningCard item={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.cleaningGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#006B3F',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  titlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  titlesText: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins_400Regular',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  cleaningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 4,
  },
  cleaningCard: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cleaningImage: {
    width: '100%',
    height: CARD_WIDTH * 0.75,
  },
  cleaningName: {
    padding: 8,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    textAlign: 'center',
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
});
