import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { DetailModal } from '@/components/DetailModal';

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
  // ... other herbs
];

export default function HerbsScreen() {
  const [selectedHerb, setSelectedHerb] = useState<typeof HERBS[0] | null>(null);

  return (
    <View style={styles.container}>
      <Header title="Ervas Sagradas" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {HERBS.map((herb) => (
            <ItemCard
              key={herb.id}
              title={herb.name}
              subtitle={herb.scientificName}
              image={herb.image}
              onPress={() => setSelectedHerb(herb)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailModal
        visible={!!selectedHerb}
        onClose={() => setSelectedHerb(null)}
        title={selectedHerb?.name || ''}
        description={selectedHerb?.description || ''}
        image={selectedHerb?.image || ''}
        details={selectedHerb ? [
          { label: 'Nome Científico', value: selectedHerb.scientificName },
          { label: 'Uso Geral', value: selectedHerb.generalUse },
          { label: 'Uso na Umbanda', value: selectedHerb.umbandaUse },
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