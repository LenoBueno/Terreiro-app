import { View, StyleSheet, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StandardPage from '@/components/templates/StandardPage';
import BookProgressCard from '@/components/BookProgressCard';
import SmallBookCard from '@/components/SmallBookCard';
import FloatingActionButton from '@/components/common/FloatingActionButton';
import AddBookForm from '@/components/AddBookForm';

interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: string;
  currentPage: string;
  percentage: number;
  image: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    paddingHorizontal: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 1000,
  },
});

export default function ReadingScreen() {
  const router = useRouter();
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [readingBooks, setReadingBooks] = useState<Book[]>([]);
  const [myLibrary, setMyLibrary] = useState<Omit<Book, 'currentPage' | 'percentage'>[]>([]);

  // Carregar livros do AsyncStorage ao iniciar
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedReadingBooks = await AsyncStorage.getItem('readingBooks');
        const savedMyLibrary = await AsyncStorage.getItem('myLibrary');
        
        // Log para verificar se as imagens estão sendo encontradas
        try {
          console.log('Tentando carregar imagens de exemplo...');
          const images = [
            require('../../assets/images/ebooks/01.jpg'),
            require('../../assets/images/ebooks/02.jpg'),
            require('../../assets/images/ebooks/03.webp'),
            require('../../assets/images/ebooks/04.jpg')
          ];
          console.log('Imagens carregadas com sucesso:', images);
        } catch (error) {
          console.error('Erro ao carregar imagens de exemplo:', error);
        }
        
        // Se não houver livros salvos, carrega os exemplos
        if (!savedReadingBooks) {
          const exampleBooks: Book[] = [
            {
              id: '1',
              title: 'A Força do Pensamento',
              author: 'Autor Desconhecido',
              totalPages: '200',
              currentPage: '50',
              percentage: 25,
              image: require('../../assets/images/ebooks/01.jpg'),
            },
            {
              id: '2',
              title: 'O Poder da Mente',
              author: 'Autor Desconhecido',
              totalPages: '180',
              currentPage: '45',
              percentage: 25,
              image: require('../../assets/images/ebooks/02.jpg'),
            },
            {
              id: '3',
              title: 'Caminhos da Fé',
              author: 'Autor Desconhecido',
              totalPages: '220',
              currentPage: '55',
              percentage: 25,
              image: require('../../assets/images/ebooks/03.webp'),
            },
            {
              id: '4',
              title: 'Sabedoria Ancestral',
              author: 'Autor Desconhecido',
              totalPages: '190',
              currentPage: '48',
              percentage: 25,
              image: require('../../assets/images/ebooks/04.jpg'),
            },
          ];
          
          setReadingBooks(exampleBooks);
          await AsyncStorage.setItem('readingBooks', JSON.stringify(exampleBooks));
        } else {
          setReadingBooks(JSON.parse(savedReadingBooks));
        }
        
        if (savedMyLibrary) {
          setMyLibrary(JSON.parse(savedMyLibrary));
        } else {
          // Inicializa a biblioteca com os mesmos livros, mas sem os dados de progresso
          const initialLibrary = readingBooks.length > 0 ? readingBooks.map(({ id, title, author, totalPages, image }) => ({
            id,
            title,
            author,
            totalPages,
            image,
          })) : [];
          setMyLibrary(initialLibrary);
          if (initialLibrary.length > 0) {
            await AsyncStorage.setItem('myLibrary', JSON.stringify(initialLibrary));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };
    
    loadInitialData();
  }, []);

  const handleAddBook = () => {
    setShowAddBookModal(true);
  };

  const handleSaveBook = async (newBook: { 
    title: string; 
    author: string; 
    totalPages: string; 
    image: any 
  }) => {
    try {
      const newBookData = {
        ...newBook,
        id: Date.now().toString(),
        currentPage: '0',
        percentage: 0,
      };

      const newReadingBooks = [...readingBooks, newBookData];
      setReadingBooks(newReadingBooks);
      
      await AsyncStorage.setItem('readingBooks', JSON.stringify(newReadingBooks));
      setShowAddBookModal(false);
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  const handleBookPress = (bookId: string) => {
    // Navegar para os detalhes do livro
    router.push(`/(tabs)/book/${bookId}` as any);
  };

  return (
    <View style={styles.container}>
      <StandardPage 
        title="Leitura" 
        showBackButton={true}
        contentStyle={{ backgroundColor: '#fff' }}
      >
        <ScrollView style={styles.content}>
          {/* Seção Minha Biblioteca - Agora em cima */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minha Biblioteca</Text>
            <View style={styles.booksContainer}>
              {readingBooks.map((book) => (
                <SmallBookCard
                  key={book.id}
                  imageSource={book.image}
                  title={book.title}
                  author={book.author}
                  onPress={() => handleBookPress(book.id)}
                />
              ))}
            </View>
          </View>

          {/* Seção de Leitura Atual - Agora embaixo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continuar Lendo</Text>
            {readingBooks.length > 0 ? (
              readingBooks.map((book) => (
                <BookProgressCard
                  key={book.id}
                  imageSource={book.image}
                  title={book.title}
                  author={book.author}
                  currentPage={parseInt(book.currentPage, 10)}
                  percentage={book.percentage}
                  onPress={() => handleBookPress(book.id)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum livro em andamento</Text>
            )}
          </View>
        </ScrollView>
      </StandardPage>

      {/* Modal para adicionar novo livro */}
      <Modal
        visible={showAddBookModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAddBookModal(false)}
      >
        <AddBookForm
          onSubmit={handleSaveBook}
          onCancel={() => setShowAddBookModal(false)}
        />
      </Modal>

      <FloatingActionButton 
        icon="add" 
        onPress={handleAddBook}
        style={styles.fab}
      />
    </View>
  );
}