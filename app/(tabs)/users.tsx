import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { UserListItem } from '@/components/UserListItem';
import { Search, Plus, Filter } from 'lucide-react-native';
import { User } from '@/types';
import { fetchUsers } from '@/services/userService';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'admin', 'member'
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers(roleFilter);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [roleFilter]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToCreateUser = () => {
    router.push('/users/create');
  };

  const handleUserPress = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Usuários" />
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuários..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, roleFilter === 'all' && styles.activeFilter]} 
          onPress={() => setRoleFilter('all')}
        >
          <Text style={[styles.filterText, roleFilter === 'all' && styles.activeFilterText]}>
            Todos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, roleFilter === 'admin' && styles.activeFilter]} 
          onPress={() => setRoleFilter('admin')}
        >
          <Text style={[styles.filterText, roleFilter === 'admin' && styles.activeFilterText]}>
            Administradores
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, roleFilter === 'member' && styles.activeFilter]} 
          onPress={() => setRoleFilter('member')}
        >
          <Text style={[styles.filterText, roleFilter === 'member' && styles.activeFilterText]}>
            Membros
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserListItem user={item} onPress={() => handleUserPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Carregando usuários...' : 'Nenhum usuário encontrado'}
            </Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.fab} onPress={navigateToCreateUser}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
  },
  activeFilter: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#616161',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9E9E9E',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});