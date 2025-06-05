import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Feather } from '@expo/vector-icons';

type AdminCardProps = {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
};

const AdminCard = ({ title, description, icon, onPress }: AdminCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardIconContainer}>
      <Feather name={icon as any} size={24} color="#fff" />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {description}
      </Text>
    </View>
    <Feather name="chevron-right" size={24} color="#888" />
  </TouchableOpacity>
);

export default function SuperAdminScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  const handleTenantPress = (tenantId?: string) => {
    if (tenantId) {
      router.push(`/(tabs)/superadmin/tenants/${tenantId}` as any);
    } else {
      router.push('/(tabs)/superadmin/tenants' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <DrawerToggleButton tintColor="#fff" />
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Super Admin</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gerenciamento</Text>
          
          <AdminCard
            title="Inquilinos"
            description="Gerencie todos os inquilinos do sistema"
            icon="users"
            onPress={() => handleTenantPress()}
          />
          
          <AdminCard
            title="Novo Inquilino"
            description="Adicione um novo inquilino"
            icon="user-plus"
            onPress={() => router.push('/(tabs)/superadmin/tenants/create' as any)}
          />
          
          <AdminCard
            title="Planos"
            description="Gerencie os planos disponíveis"
            icon="credit-card"
            onPress={() => router.push('/(tabs)/superadmin/plans' as any)}
          />
          
          <AdminCard
            title="Temas"
            description="Personalize os temas do aplicativo"
            icon="palette"
            onPress={() => router.push('/(tabs)/superadmin/themes' as any)}
          />
          
          <AdminCard
            title="Logs do Sistema"
            description="Visualize os logs do sistema"
            icon="file-text"
            onPress={() => router.push('/(tabs)/superadmin/logs' as any)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Sistema</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Usuário:</Text>
            <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tenant Atual:</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {currentTenant?.name || 'Nenhum tenant selecionado'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#888',
    fontSize: 13,
    lineHeight: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    maxWidth: '60%',
  },
});
