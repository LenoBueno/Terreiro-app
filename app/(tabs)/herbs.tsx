import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { Header } from '@/components/Header';
import { X } from 'lucide-react-native';

const HERBS = [
  {
    id: '1',
    name: 'Alecrim',
    scientificName: 'Rosmarinus officinalis',
    description: 'Arbusto aromático de folhas finas e verde-escuras, com flores azuladas.',
    generalUse: 'Estimulante, melhora a memória e a circulação sanguínea.',
    umbandaUse: 'Utilizado para limpeza espiritual, fortalecimento da aura e proteção contra energias negativas.',
    image: 'https://images.pexels.com/photos/4239113/pexels-photo-4239113.jpeg'
  },
  {
    id: '2',
    name: 'Arruda',
    scientificName: 'Ruta graveolens',
    description: 'Planta de folhas verdes e odor forte, com pequenas flores amarelas.',
    generalUse: 'Proteção contra o mau-olhado e energias negativas.',
    umbandaUse: 'Empregada para descarrego, afastando influências espirituais indesejadas e promovendo a limpeza energética.',
    image: 'https://images.pexels.com/photos/4239016/pexels-photo-4239016.jpeg'
  },
  {
    id: '3',
    name: 'Guiné',
    scientificName: 'Petiveria tetrandra',
    description: 'Arbusto de folhas verdes e flores pequenas, com odor característico.',
    generalUse: 'Calmante, analgésico e anti-inflamatório.',
    umbandaUse: 'Utilizada para proteção espiritual, limpeza de ambientes e fortalecimento da fé.',
    image: 'https://images.pexels.com/photos/4239012/pexels-photo-4239012.jpeg'
  },
  {
    id: '4',
    name: 'Alfazema',
    scientificName: 'Lavandula angustifolia',
    description: 'Planta de flores lilases e aroma suave.',
    generalUse: 'Calmante, auxilia no sono e alivia tensões.',
    umbandaUse: 'Promove a paz interior, equilíbrio emocional e atrai boas energias.',
    image: 'https://images.pexels.com/photos/4239124/pexels-photo-4239124.jpeg'
  },
  {
    id: '5',
    name: 'Manjericão',
    scientificName: 'Ocimum basilicum',
    description: 'Planta de folhas verdes e aroma intenso, com flores brancas ou lilases.',
    generalUse: 'Digestivo, anti-inflamatório e antioxidante.',
    umbandaUse: 'Utilizado para purificação, proteção espiritual e abertura de caminhos.',
    image: 'https://images.pexels.com/photos/4239018/pexels-photo-4239018.jpeg'
  },
  {
    id: '6',
    name: 'Camomila',
    scientificName: 'Matricaria chamomilla',
    description: 'Planta de flores brancas com centro amarelo, semelhante a margaridas.',
    generalUse: 'Calmante, auxilia no sono e na digestão.',
    umbandaUse: 'Promove tranquilidade, alivia tensões e harmoniza o ambiente espiritual.',
    image: 'https://images.pexels.com/photos/4239022/pexels-photo-4239022.jpeg'
  },
  {
    id: '7',
    name: 'Levante',
    scientificName: 'Mentha piperita',
    description: 'Planta de folhas verdes e aroma refrescante.',
    generalUse: 'Estimulante, digestivo e analgésico.',
    umbandaUse: 'Utilizado para revitalização energética, afastar cansaço e atrair vigor espiritual.',
    image: 'https://images.pexels.com/photos/4239024/pexels-photo-4239024.jpeg'
  },
  {
    id: '8',
    name: 'Abre-caminho',
    scientificName: 'Trichilia catigua',
    description: 'Arbusto de folhas verdes e flores pequenas.',
    generalUse: 'Estimulante e afrodisíaco.',
    umbandaUse: 'Empregado para remover obstáculos, facilitar conquistas e promover o progresso espiritual e material.',
    image: 'https://images.pexels.com/photos/4239026/pexels-photo-4239026.jpeg'
  },
  {
    id: '9',
    name: 'Poejo',
    scientificName: 'Mentha pulegium',
    description: 'Planta de folhas verdes e aroma forte, com pequenas flores lilases.',
    generalUse: 'Digestivo, expectorante e calmante.',
    umbandaUse: 'Utilizado para limpeza espiritual, proteção e fortalecimento da vontade.',
    image: 'https://images.pexels.com/photos/4239028/pexels-photo-4239028.jpeg'
  },
  {
    id: '10',
    name: 'Boldo',
    scientificName: 'Plectranthus barbatus',
    description: 'Planta de folhas verdes e peludas, com aroma característico.',
    generalUse: 'Digestivo e hepatoprotetor.',
    umbandaUse: 'Empregado para purificação, limpeza de energias densas e fortalecimento espiritual.',
    image: 'https://images.pexels.com/photos/4239030/pexels-photo-4239030.jpeg'
  }
];

const windowWidth = Dimensions.get('window').width;
const cardSize = (windowWidth - 48) / 2; // 2 columns with 16px padding on sides and between

export default function HerbsScreen() {
  const [selectedHerb, setSelectedHerb] = useState(null);

  return (
    <View style={styles.container}>
      <Header title="Ervas Sagradas" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {HERBS.map((herb) => (
            <TouchableOpacity
              key={herb.id}
              style={styles.card}
              onPress={() => setSelectedHerb(herb)}
            >
              <Image source={{ uri: herb.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{herb.name}</Text>
                <Text style={styles.cardSubtitle}>{herb.scientificName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedHerb}
        animationType="slide"
        onRequestClose={() => setSelectedHerb(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedHerb(null)}
          >
            <X size={24} color="#000000" />
          </TouchableOpacity>

          {selectedHerb && (
            <ScrollView style={styles.modalContent}>
              <Image
                source={{ uri: selectedHerb.image }}
                style={styles.modalImage}
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedHerb.name}</Text>
                <Text style={styles.modalScientific}>{selectedHerb.scientificName}</Text>
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Descrição</Text>
                  <Text style={styles.sectionText}>{selectedHerb.description}</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Uso Geral</Text>
                  <Text style={styles.sectionText}>{selectedHerb.generalUse}</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Uso na Umbanda</Text>
                  <Text style={styles.sectionText}>{selectedHerb.umbandaUse}</Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardSize,
    height: cardSize,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: '70%',
  },
  cardContent: {
    padding: 8,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#000000',
  },
  cardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#616161',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 300,
  },
  modalInfo: {
    padding: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  modalScientific: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#616161',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
});