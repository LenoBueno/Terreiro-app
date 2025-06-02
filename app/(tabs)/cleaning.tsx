import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { DetailModal } from '@/components/DetailModal';

const CLEANINGS = [
  {
    id: '1',
    title: 'Defumação',
    subtitle: 'Limpeza Energética',
    description: 'Técnica de limpeza espiritual com ervas sagradas.',
    method: 'Acenda as ervas secas em um defumador e circule o ambiente em sentido horário, começando pela porta de entrada.',
    benefits: 'Purifica o ambiente, remove energias negativas e harmoniza as vibrações do local.',
    image: 'https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg'
  },
  {
    id: '2',
    title: 'Sal Grosso',
    subtitle: 'Purificação',
    description: 'Método tradicional de limpeza com sal grosso.',
    method: 'Espalhe sal grosso nos cantos do ambiente e deixe agir por 24 horas antes de recolher.',
    benefits: 'Absorve energias densas e negativas, protege o ambiente e seus ocupantes.',
    image: 'https://images.pexels.com/photos/4207792/pexels-photo-4207792.jpeg'
  }
];

export default function CleaningScreen() {
  const [selectedCleaning, setSelectedCleaning] = useState<typeof CLEANINGS[0] | null>(null);

  return (
    <View style={styles.container}>
      <Header title="Limpeza" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {CLEANINGS.map((cleaning) => (
            <ItemCard
              key={cleaning.id}
              title={cleaning.title}
              subtitle={cleaning.subtitle}
              image={cleaning.image}
              onPress={() => setSelectedCleaning(cleaning)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailModal
        visible={!!selectedCleaning}
        onClose={() => setSelectedCleaning(null)}
        title={selectedCleaning?.title || ''}
        description={selectedCleaning?.description || ''}
        image={selectedCleaning?.image || ''}
        details={selectedCleaning ? [
          { label: 'Método', value: selectedCleaning.method },
          { label: 'Benefícios', value: selectedCleaning.benefits }
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