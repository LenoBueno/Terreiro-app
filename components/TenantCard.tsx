import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tenant } from '@/types';
import { Users, Calendar, Globe } from 'lucide-react-native';

interface TenantCardProps {
  tenant: Tenant;
  onPress?: () => void;
}

export function TenantCard({ tenant, onPress }: TenantCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{tenant.name}</Text>
        <View style={[
          styles.statusIndicator,
          tenant.status === 'active' && styles.activeIndicator,
          tenant.status === 'inactive' && styles.inactiveIndicator
        ]}>
          <Text style={styles.statusText}>
            {tenant.status === 'active' ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description}>{tenant.description}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Users size={16} color="#616161" style={styles.infoIcon} />
          <Text style={styles.infoText}>{tenant.userCount} usuários</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Calendar size={16} color="#616161" style={styles.infoIcon} />
          <Text style={styles.infoText}>Desde {new Date(tenant.createdAt).toLocaleDateString('pt-BR')}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Globe size={16} color="#616161" style={styles.infoIcon} />
          <Text style={styles.infoText}>{tenant.domain}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: '#E0E0E0',
  },
  inactiveIndicator: {
    backgroundColor: '#E0E0E0',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#000000',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
  },
});