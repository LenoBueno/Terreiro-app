export interface Message {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  author?: string;
  date?: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
  // Simulando uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Mensagem do Dia',
          subtitle: 'Reflexão Diária',
          content: 'A fé move montanhas, mas o amor transforma vidas. Cultive a paz interior e compartilhe luz com todos ao seu redor.',
          imageUrl: 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg',
          author: 'Pai João',
          date: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Prece de Proteção',
          subtitle: 'Oração Diária',
          content: 'Que os Orixás nos cubram com seu manto sagrado, nos protegendo e guiando em nossa jornada espiritual.',
          imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg',
          author: 'Mãe Maria',
          date: new Date(Date.now() - 86400000).toISOString() // Ontem
        },
        {
          id: '3',
          title: 'Sabedoria Ancestral',
          subtitle: 'Ensinamentos',
          content: 'A sabedoria dos mais velhos é como uma árvore frondosa, oferece sombra e frutos para as gerações futuras.',
          imageUrl: 'https://images.pexels.com/photos/3758106/pexels-photo-3758106.jpeg',
          author: 'Vovó Joana',
          date: new Date(Date.now() - 172800000).toISOString() // Há 2 dias
        }
      ]);
    }, 1000);
  });
};
