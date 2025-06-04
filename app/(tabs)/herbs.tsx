import { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { HerbsImages } from '@/assets';

const HERBS = [
  { id: '1', name: 'Alecrim', image: HerbsImages.alecrim },
  { id: '2', name: 'Alfazema', image: HerbsImages.alfazema },
  { id: '3', name: 'Aroeira', image: HerbsImages.aroeira },
  { id: '4', name: 'Arruda', image: HerbsImages.arruda },
  { id: '5', name: 'Espada de São Jorge', image: HerbsImages.espadaSaoJorge },
  { id: '6', name: 'Eucalipto', image: HerbsImages.eucalipto },
  { id: '7', name: 'Guiné', image: HerbsImages.guine },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8; // 8px de margem entre os itens
const CARD_WIDTH = (width - (CARD_MARGIN * 4)) / 3; // 3 itens por linha com margens

const HerbCard = ({ item }: { item: { id: string; name: string; image: any } }) => (
  <View style={styles.herbCard}>
    <Image source={item.image} style={styles.herbImage} resizeMode="cover" />
    <Text style={styles.herbName}>{item.name}</Text>
  </View>
);

export default function HerbsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="layers" size={34} color="#fff" style={{ marginLeft: 16 }} />
        </View>
        <View style={styles.headerIcons}>
          <MaterialIcons name="notifications-none" size={24} color="#fff" style={styles.headerIcon} />
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.avatar} 
          />
        </View>
      </View>
      
      {/* Títulos */}
      <View style={styles.titlesContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons name="chevron-left" size={30} color="#fff" style={{ marginLeft: 1 }} />
        </TouchableOpacity>
        <View style={styles.titlesText}>
          <Text style={styles.headerTitle}>Ervas</Text>
          <Text style={styles.headerSubtitle}>Catálogo</Text>
        </View>
      </View>
      
      {/* Conteúdo */}
      <View style={styles.content}>
        <FlatList
          data={HERBS}
          renderItem={({ item }) => <HerbCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.herbGrid}
          contentContainerStyle={styles.herbList}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
  },
  // Grade de ervas
  herbGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  herbCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
    marginHorizontal: CARD_MARGIN / 2,
    alignItems: 'center',
  },
  herbImage: {
    width: CARD_WIDTH - 16,
    height: CARD_WIDTH - 16,
    borderRadius: 8,
  },
  herbName: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: '#006B3F',
    fontWeight: '500',
  },
  // Header
  header: {
    backgroundColor: '#006B3F',
    padding: 16,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitles: {
    marginLeft: 16,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  // Conteúdo
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    paddingTop: 16,
  },
  herbList: {
    flex: 1,
    paddingBottom: 80,
  },
  // Estilos para os títulos
  titlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 32, // Aumentei o padding para alinhar com o ícone do cabeçalho
    backgroundColor: '#006B3F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  titlesText: {
    marginLeft: 8, // Reduzi a margem esquerda para aproximar o texto do ícone
  },
  // Estilos para os títulos do cabeçalho
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: -2,
  },
  // Botão flutuante
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    backgroundColor: '#006B3F',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});