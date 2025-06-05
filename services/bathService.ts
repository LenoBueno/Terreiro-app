export interface Bath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  preparation: string;
  benefits: string;
  imageUrl?: string;
  tips?: string;
}

export const fetchBaths = async (): Promise<Bath[]> => {
  // Simulando uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Banho de Arruda',
          subtitle: 'Proteção e Limpeza',
          description: 'Banho poderoso para proteção e limpeza espiritual.',
          preparation: '1. Ferva 1 litro de água\n2. Adicione um punhado de folhas de arruda\n3. Deixe em infusão por 10 minutos\n4. Coe e deixe esfriar\n5. Tome o banho do pescoço para baixo após o banho normal',
          benefits: '• Proteção contra energias negativas\n• Limpeza espiritual\n• Fortalecimento da aura\n• Afasta inveja e mau-olhado',
          imageUrl: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg',
          tips: 'Faça este banho preferencialmente à noite, antes de dormir. Evite se secar com toalha, deixe o corpo secar naturalmente.'
        },
        {
          id: '2',
          title: 'Banho de Alfazema',
          subtitle: 'Paz e Harmonia',
          description: 'Banho calmante e harmonizador para acalmar os ânimos e trazer equilíbrio emocional.',
          preparation: '1. Ferva 1 litro de água\n2. Adicione um punhado de flores de alfazema\n3. Deixe em infusão por 15 minutos\n4. Coe e deixe amornar\n5. Use após o banho normal, despejando do pescoço para baixo',
          benefits: '• Acalma a mente\n• Traz paz interior\n• Harmoniza o ambiente\n• Alivia o estresse e a ansiedade',
          imageUrl: 'https://images.pexels.com/photos/4207794/pexels-photo-4207794.jpeg',
          tips: 'Pode ser usado também para borrifar o ambiente, trazendo paz e harmonia para a casa.'
        },
        {
          id: '3',
          title: 'Banho de Alecrim',
          subtitle: 'Energização e Proteção',
          description: 'Banho energizante que ajuda a renovar as energias e afastar más influências.',
          preparation: '1. Ferva 2 litros de água\n2. Adicione um ramo de alecrim\n3. Deixe ferver por 5 minutos\n4. Desligue e abafe por 10 minutos\n5. Coe e use após o banho normal',
          benefits: '• Renova as energias\n• Aumenta a autoestima\n• Afasta energias negativas\n• Melhora o ânimo',
          imageUrl: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg',
          tips: 'Ideal para começar a semana ou após situações desgastantes. Pode ser usado também para lavar os cabelos, fortalecendo os fios.'
        }
      ]);
    }, 1000);
  });
};
