import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { DetailModal } from '@/components/DetailModal';

const READINGS = [
  {
    id: '1',
    title: 'Introdução à Umbanda',
    subtitle: 'Fundamentos e História',
    description: 'Uma introdução aos fundamentos e história da Umbanda, suas origens e principais conceitos.',
    content: 'A Umbanda é uma religião genuinamente brasileira que sintetiza elementos de várias tradições espirituais. Surgida no início do século XX, ela incorpora elementos do Candomblé, Catolicismo, Kardecismo e tradições indígenas.',
    image: 'https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg'
  },
  {
    id: '2',
    title: 'Orixás',
    subtitle: 'Guias e Protetores',
    description: 'Conheça os principais Orixás da Umbanda e suas características.',
    content: 'Os Orixás são entidades espirituais que representam forças da natureza e aspectos da personalidade humana. Cada Orixá tem suas características próprias, domínios de atuação e formas de trabalho.',
    image: 'https://images.pexels.com/photos/6152994/pexels-photo-6152994.jpeg'
  }
];

export default function ReadingScreen() {
  const [selectedReading, setSelectedReading] = useState<typeof READINGS[0] | null>(null);

  return (
    <View style={styles.container}>
      <Header title="Leitura" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {READINGS.map((reading) => (
            <ItemCard
              key={reading.id}
              title={reading.title}
              subtitle={reading.subtitle}
              image={reading.image}
              onPress={() => setSelectedReading(reading)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailModal
        visible={!!selectedReading}
        onClose={() => setSelectedReading(null)}
        title={selectedReading?.title || ''}
        description={selectedReading?.description || ''}
        image={selectedReading?.image || ''}
        details={selectedReading ? [
          { label: 'Conteúdo', value: selectedReading.content }
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