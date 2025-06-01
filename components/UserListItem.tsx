import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '@/types';
import { User as UserIcon } from 'lucide-react-native';

interface UserListItemProps {
  user: User;
  onPress?: () => void;
}

export function UserListItem({ user, onPress }: UserListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      
      <View style={[
        styles.roleIndicator,
        user.role === 'admin' && styles.adminRoleIndicator
      ]}>
        <Text style={styles.roleText}>
          {user.role === 'admin' ? 'Admin' : 'Membro'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
  },
  roleIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  adminRoleIndicator: {
    backgroundColor: '#000000',
  },
  roleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#000000',
  },
  adminRoleText: {
    color: '#FFFFFF',
  },
});