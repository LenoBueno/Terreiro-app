import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { DetailModal } from '@/components/DetailModal';

const MESSAGES = [
  {
    id: '1',
    title: 'Mensagem do Dia',
    subtitle: 'Reflexão Diária',
    description: 'Reflexão espiritual para iluminar seu dia.',
    content: 'A fé move montanhas, mas o amor transforma vidas. Cultive a paz interior e compartilhe luz com todos ao seu redor.',
    image: 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg'
  },
  {
    id: '2',
    title: 'Prece de Proteção',
    subtitle: 'Oração Diária',
    description: 'Prece para proteção e fortalecimento espiritual.',
    content: 'Que os Orixás nos cubram com seu manto sagrado, nos protegendo e guiando em nossa jornada espiritual.',
    image: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg'
  }
];

export default function MessagesScreen() {
  const [selectedMessage, setSelectedMessage] = useState<typeof MESSAGES[0] | null>(null);

  return (
    <View style={styles.container}>
      <Header title="Mensagens" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {MESSAGES.map((message) => (
            <ItemCard
              key={message.id}
              title={message.title}
              subtitle={message.subtitle}
              image={message.image}
              onPress={() => setSelectedMessage(message)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailModal
        visible={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.title || ''}
        description={selectedMessage?.description || ''}
        image={selectedMessage?.image || ''}
        details={selectedMessage ? [
          { label: 'Mensagem', value: selectedMessage.content }
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