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
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  lastLogin?: string;
}

// Mock data function
const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  return [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastLogin: '2023-05-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
      role: 'user',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastLogin: '2023-05-14T15:45:00Z',
    },
  ];
};

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => onPress(user)}
    >
      <Image
        source={{
          uri: user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
        }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <View style={styles.userMeta}>
          <View style={[styles.statusBadge, styles[`status${user.status}`]]}>
            <Text style={styles.statusText}>{user.status}</Text>
          </View>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );
};

const UsersScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { width } = Dimensions.get('window');
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadUsers(true);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Usuários</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuários..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={setSelectedUser} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
              <MaterialIcons name="people" size={48} color="#999" />
              <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
            </View>
          )
        }
      />

      {/* User Details Modal */}
      <Modal
        visible={!!selectedUser}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedUser(null)}
      >
        {selectedUser && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalhes do Usuário</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedUser(null)}
                >
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalContent}>
                <View style={styles.userModalHeader}>
                  <Image
                    source={{
                      uri: selectedUser.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
                    }}
                    style={styles.modalAvatar}
                  />
                  <Text style={styles.modalUserName}>{selectedUser.name}</Text>
                  <Text style={styles.modalUserEmail}>{selectedUser.email}</Text>
                  <View style={[styles.statusBadge, styles[`status${selectedUser.status}`]]}>
                    <Text style={styles.statusText}>{selectedUser.status}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cargo:</Text>
                  <Text style={styles.detailValue}>{selectedUser.role}</Text>
                </View>
                
                {selectedUser.lastLogin && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Último acesso:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(selectedUser.lastLogin).toLocaleString('pt-BR')}
                    </Text>
                  </View>
                )}

                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                    <MaterialIcons name="edit" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => {
                      // Handle delete
                      setSelectedUser(null);
                    }}
                  >
                    <MaterialIcons name="delete" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#006B3F',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  statusactive: {
    backgroundColor: '#e3f8e8',
  },
  statusinactive: {
    backgroundColor: '#ffebee',
  },
  statuspending: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  userRole: {
    fontSize: 12,
    color: '#666',
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
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  userModalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalUserEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#006B3F',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default UsersScreen;
