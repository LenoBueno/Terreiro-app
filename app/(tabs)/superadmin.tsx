import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { TenantCard } from '@/components/TenantCard';
import {
  Plus,
  Users,
  CreditCard,
  Palette,
  FileText,
} from 'lucide-react-native';
import { Tenant } from '@/types';
import { fetchTenants } from '@/services/tenantService';

SuperAdminScreen.displayName = 'SuperAdminScreen';

export default function SuperAdminScreen() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTenants = async () => {
      try {
        setLoading(true);
        const fetchedTenants = await fetchTenants();
        setTenants(fetchedTenants);
      } catch (error) {
        console.error('Failed to load tenants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTenants();
  }, []);

  const navigateToCreateTenant = () => {
    router.push('/superadmin/tenants/create');
  };

  const navigateToTenantDetails = (tenantId: string) => {
    router.push(`/superadmin/tenants/${tenantId}`);
  };

  return (
    <ScreenTemplate
      title="{tenants.length}"
      subtitle=""
      showBackButton={false}
      showMenuButton={true}
      showUserAvatar={true}
    >
      <Header title="Super Admin" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{tenants.length}</Text>
            <Text style={styles.statLabel}>Clientes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Planos</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Temas</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Gestão</Text>

          <View style={styles.menuGrid}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/superadmin/tenants')}
            >
              <View style={styles.menuIconContainer}>
                <Users size={24} color="#000000" />
              </View>
              <Text style={styles.menuItemText}>Clientes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/superadmin/plans')}
            >
              <View style={styles.menuIconContainer}>
                <CreditCard size={24} color="#000000" />
              </View>
              <Text style={styles.menuItemText}>Planos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/superadmin/themes')}
            >
              <View style={styles.menuIconContainer}>
                <Palette size={24} color="#000000" />
              </View>
              <Text style={styles.menuItemText}>Temas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/superadmin/logs')}
            >
              <View style={styles.menuIconContainer}>
                <FileText size={24} color="#000000" />
              </View>
              <Text style={styles.menuItemText}>Logs</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tenantsContainer}>
          <View style={styles.tenantsHeader}>
            <Text style={styles.tenantsTitle}>Clientes Recentes</Text>
            <TouchableOpacity
              onPress={() => router.push('/superadmin/tenants')}
            >
              <Text style={styles.viewAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Carregando clientes...</Text>
          ) : tenants.length > 0 ? (
            tenants.map((tenant) => (
              <TenantCard
                key={tenant.id}
                tenant={tenant}
                onPress={() => navigateToTenantDetails(tenant.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum cliente cadastrado</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={navigateToCreateTenant}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenTemplate>
  );
}
