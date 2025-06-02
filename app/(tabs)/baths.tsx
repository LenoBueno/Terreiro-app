import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { DetailModal } from '@/components/DetailModal';

const BATHS = [
  {
    id: '1',
    title: 'Banho de Arruda',
    subtitle: 'Proteção e Limpeza',
    description: 'Banho poderoso para proteção e limpeza espiritual.',
    preparation: 'Ferva água e adicione as folhas de arruda. Deixe esfriar e coe. Tome o banho do pescoço para baixo após o banho higiênico.',
    benefits: 'Oferece proteção contra energias negativas, limpa o campo energético e fortalece a aura.',
    image: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg'
  },
  {
    id: '2',
    title: 'Banho de Alfazema',
    subtitle: 'Paz e Harmonia',
    description: 'Banho calmante e harmonizador.',
    preparation: 'Prepare uma infusão com as flores de alfazema. Após esfriar e coar, use após o banho normal.',
    benefits: 'Traz paz interior, acalma a mente e harmoniza as energias do corpo.',
    image: 'https://images.pexels.com/photos/4207794/pexels-photo-4207794.jpeg'
  }
];

export default function BathsScreen() {
  const [selectedBath, setSelectedBath] = useState<typeof BATHS[0] | null>(null);

  return (
    <View style={styles.container}>
      <Header title="Banhos" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {BATHS.map((bath) => (
            <ItemCard
              key={bath.id}
              title={bath.title}
              subtitle={bath.subtitle}
              image={bath.image}
              onPress={() => setSelectedBath(bath)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailModal
        visible={!!selectedBath}
        onClose={() => setSelectedBath(null)}
        title={selectedBath?.title || ''}
        description={selectedBath?.description || ''}
        image={selectedBath?.image || ''}
        details={selectedBath ? [
          { label: 'Preparação', value: selectedBath.preparation },
          { label: 'Benefícios', value: selectedBath.benefits }
        ] : []}
      />
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
});