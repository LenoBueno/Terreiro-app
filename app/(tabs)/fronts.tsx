import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

type FrenteItem = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  method: string;
  benefits: string;
  image: string;
};

const FRENTES: FrenteItem[] = [
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
    subtitle: 'Banho de Limpeza',
    description: 'Banho purificador com sal grosso e ervas.',
    method:
      'Tome banho com água e sal grosso, do pescoço para baixo, em sentido descendente.',
    benefits:
      'Limpeza espiritual, remoção de energias negativas e renovação energética.',
    image: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg',
  },
  {
    id: '4',
    name: 'Ervas de Banho',
    subtitle: 'Purificação Pessoal',
    description: 'Banho com ervas específicas para limpeza espiritual.',
    method: 'Faça um chá com as ervas e use no banho, do pescoço para baixo.',
    benefits: 'Limpeza energética, renovação e proteção espiritual.',
    image: 'https://images.pexels.com/photos/4207794/pexels-photo-4207794.jpeg',
  },
  {
    id: '5',
    name: 'Incenso',
    subtitle: 'Purificação do Ambiente',
    description: 'Uso de incensos para limpeza energética.',
    method: 'Acenda o incenso e deixe a fumaça circular pelo ambiente.',
    benefits:
      'Purificação do ambiente, elevação vibratória e limpeza energética.',
    image: 'https://images.pexels.com/photos/4207795/pexels-photo-4207795.jpeg',
  },
  {
    id: '6',
    name: 'Cristais',
    subtitle: 'Proteção e Limpeza',
    description: 'Uso de cristais para limpeza e proteção energética.',
    method:
      'Posicione os cristais nos cantos do ambiente ou carregue-os consigo.',
    benefits: 'Proteção, limpeza energética e equilíbrio das energias.',
    image: 'https://images.pexels.com/photos/4207796/pexels-photo-4207796.jpeg',
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8; // Margem entre os itens
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 3; // 3 itens por linha com margens laterais

interface FrenteCardProps {
  item: FrenteItem;
  onPress: (item: FrenteItem) => void;
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
    backgroundColor: '#121212',
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerTitleSmall: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitleTiny: {
    color: '#888',
    fontSize: 14,
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
  headerTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitleMedium: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  frenteCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    margin: CARD_MARGIN / 2,
    overflow: 'hidden',
    padding: 8,
    alignItems: 'center',
  },
  frenteImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  frenteName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  frenteSubtitle: {
    fontSize: 10,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  frontsGrid: {
    paddingBottom: 16,
  },
});

const FrenteCard: React.FC<FrenteCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.frenteCard} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.image }}
      style={styles.frenteImage}
      resizeMode="cover"
    />
    <Text style={styles.frenteName} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.frenteSubtitle} numberOfLines={1}>
      {item.subtitle}
    </Text>
  </TouchableOpacity>
);

const FrentesScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  
  const handleCardPress = (item: FrenteItem) => {
    console.log('Frente selecionada:', item);
    // Exemplo: router.push(`/fronts/${item.id}`);
  };

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <DrawerToggleButton tintColor="#fff" />
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitleLarge}>Frentes</Text>
          <Text style={styles.headerSubtitleMedium}>Técnicas de Limpeza</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <FlatList
            data={FRENTES}
            renderItem={({ item }) => (
              <FrenteCard item={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.frontsGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  );
}

export default FrentesScreen;
