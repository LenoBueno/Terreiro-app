import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const HERB_DATA = {
  id: '3',
  name: 'Aroeira',
  scientificName: 'Schinus terebinthifolius',
  description: ' Aroeira é uma árvore nativa\n da América do Sul, conhecida por suas\n propriedades medicinais e espirituais.\n Sua casca, folhas e frutos são amplamente utilizados\n na medicina popular e em rituais de proteção e\n limpeza energética.',
  uses: [
    'Ação anti-inflamatória poderosa',
    'Propriedades cicatrizantes',
    'Auxiliar no tratamento de infecções urinárias',
    'Combate a problemas respiratórios',
    'Propriedades antimicrobianas',
    'Uso em banhos de limpeza espiritual',
  ],
  preparation: 'Para banho, faça uma decocção com 3 colheres de sopa de casca de aroeira para cada litro de água. Ferva por 10 minutos, deixe amornar e coe. Adicione à água do banho. Para uso tópico em feridas, utilize o chá morno para compressas.',
  benefits: 'O banho de aroeira é tradicionalmente usado para afastar energias negativas, promover a limpeza espiritual e a proteção. Na medicina popular, é reconhecida por suas propriedades cicatrizantes e anti-inflamatórias, sendo eficaz no tratamento de feridas e inflamações da pele.',
  category: 'Anti-inflamatório e Cicatrizante',
  energy: 'Yin (Feminina)',
  element: 'Terra',
  chakras: 'Raiz (Muladhara) e Cardíaco (Anahata)',
  image: require('@/assets/images/herbs/aroeira.png'),
};

export default function AroeiraDetailScreen() {
  const router = useRouter();
  const herb = HERB_DATA;

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTexts}>
          <Text style={styles.title}>{herb.name}</Text>
          <Text style={styles.subtitle}>{herb.scientificName}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="favorite-border" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="share" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* IMAGEM EM PRIMEIRO PLANO */}
      <View style={styles.imageContainer}>
        <Image source={herb.image} style={styles.herbImage} />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.detailsContainer}>
          <ScrollView 
            style={styles.scrollableContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.sectionText}>{herb.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Usos e Propriedades</Text>
              <View style={styles.usesList}>
                {herb.uses.map((use, index) => (
                  <View key={index} style={styles.useItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.useText}>{use}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Modo de Preparo</Text>
              <Text style={styles.sectionText}>{herb.preparation}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefícios do Banho</Text>
              <Text style={styles.sectionText}>{herb.benefits}</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Categoria</Text>
                <Text style={styles.infoValue}>{herb.category}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Energia</Text>
                <Text style={styles.infoValue}>{herb.energy}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Elemento</Text>
                <Text style={styles.infoValue}>{herb.element}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Chakras</Text>
                <Text style={styles.infoValue}>{herb.chakras}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
  },
  scrollableContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: '#006B3F',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTexts: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  imageContainer: {
    position: 'absolute',
    top: 120,
    left: 170,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    // Sombra suave para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    // Sombra para Android
    elevation: 7,
  },
  herbImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: '#006B3F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 120,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#006B3F',
    marginBottom: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  usesList: {
    marginTop: 8,
  },
  useItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006B3F',
    marginTop: 8,
    marginRight: 10,
  },
  useText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginTop: 16,
  },
  infoItem: {
    width: '50%',
    padding: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Poppins_500Medium',
  },
  infoValue: {
    fontSize: 15,
    color: '#006B3F',
    fontFamily: 'Poppins_600SemiBold',
  },
});
