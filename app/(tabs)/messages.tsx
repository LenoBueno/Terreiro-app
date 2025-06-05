import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Message {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  date: string;
  read: boolean;
}

// Mock data function
const fetchMessages = async (): Promise<Message[]> => {
  // Simulate API call
  return [
    {
      id: '1',
      title: 'Mensagem de Fé',
      subtitle: 'Enviado por Pai João',
      content: 'Que a paz de Oxalá esteja com você hoje e sempre. Que as bênçãos dos orixás iluminem seu caminho e tragam sabedoria para suas decisões.',
      imageUrl: 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg',
      date: '2023-05-15',
      read: false,
    },
    {
      id: '2',
      title: 'Oração do Dia',
      subtitle: 'Prece de Proteção',
      content: 'Que os raios de Xangô nos fortaleçam, que o manto de Iemanjá nos cubra e que a luz de Oxalá nos ilumine. Que assim seja!',
      date: '2023-05-14',
      read: true,
    },
  ];
};

interface MessageCardProps {
  message: Message;
  onPress: (message: Message) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.messageCard}
      onPress={() => onPress(message)}
    >
      <Image
        source={{
          uri: message.imageUrl || 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg',
        }}
        style={styles.messageImage}
        resizeMode="cover"
      />
      <View style={styles.messageContent}>
        <Text
          style={[styles.messageTitle, !message.read && styles.unreadMessage]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {message.title}
        </Text>
        <Text
          style={styles.messageSubtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {message.subtitle}
        </Text>
        <Text
          style={styles.messagePreview}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {message.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { width } = Dimensions.get('window');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const toggleDrawer = () => {
    // @ts-ignore - Navigation type will be properly handled by React Navigation
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const loadMessages = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const fetchedMessages = await fetchMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadMessages(true);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleDrawer}>
            <MaterialIcons
              name="menu"
              size={28}
              color="#fff"
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Títulos */}
      <View style={styles.titlesContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        <View style={styles.titlesText}>
          <Text style={styles.headerTitle}>Mensagens</Text>
          <Text style={styles.headerSubtitle}>
            Mensagens espirituais e orações
          </Text>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageCard message={item} onPress={setSelectedMessage} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#006B3F']}
              tintColor="#006B3F"
            />
          }
          ListEmptyComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#006B3F" />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="chat" size={48} color="#9E9E9E" />
                <Text style={styles.emptyText}>
                  Nenhuma mensagem encontrada
                </Text>
              </View>
            )
          }
        />
      </View>

      {/* Modal de Detalhes */}
      <Modal
        visible={!!selectedMessage}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedMessage(null)}
      >
        {selectedMessage && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedMessage.title}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedMessage(null)}
                >
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                {selectedMessage.imageUrl && (
                  <Image
                    source={{ uri: selectedMessage.imageUrl }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                )}

                <Text style={styles.modalText}>{selectedMessage.content}</Text>
                
                <Text style={styles.modalDate}>
                  {new Date(selectedMessage.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titlesText: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  unreadMessage: {
    fontWeight: 'bold',
  },
  messageSubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 12,
    color: '#CCCCCC',
    opacity: 0.8,
  },
  messagesList: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 22,
    marginBottom: 16,
  },
  modalDate: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'right',
  },
});

export default MessagesScreen;
