import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Dimensions,
  SafeAreaView
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { HerbsImages } from '@/assets';
import { useNavigationWithBack } from '@/hooks/useNavigationWithBack';

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
const CARD_MARGIN = 8; // Margem entre os itens
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 3; // 3 itens por linha com margens laterais

const HerbCard = ({
  item,
}: {
  item: { id: string; name: string; image: any };
}) => (
  <View style={styles.herbCard}>
    <Image source={item.image} style={styles.herbImage} resizeMode="cover" />
    <Text style={styles.herbName}>{item.name}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  herbGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  herbCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  herbImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  herbName: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  herbList: {
    paddingBottom: 100,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default function HerbsScreen() {
  const { router, handleBackPress } = useNavigationWithBack();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
            <MaterialIcons
              name="menu"
              size={34}
              color="#fff"
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <Image
            source={require('@/assets/images/profile/user.jpg')}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Títulos */}
      <View style={styles.titlesContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="#fff"
          />
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
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.herbGrid}
          contentContainerStyle={styles.herbList}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
