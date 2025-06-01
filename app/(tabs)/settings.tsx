import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { User, Bell, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { currentTenant } = useTenant();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Configurações" />
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <TouchableOpacity 
          style={styles.profileSection}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
          </View>
          
          <ChevronRight size={20} color="#9E9E9E" />
        </TouchableOpacity>
        
        {/* Settings Sections */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color="#000000" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Notificações</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Moon size={20} color="#000000" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Modo Escuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E0E0E0', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => router.push('/profile/edit')}
          >
            <User size={20} color="#000000" style={styles.settingIcon} />
            <Text style={styles.settingButtonText}>Editar Perfil</Text>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingButton}
            onPress={() => router.push('/help')}
          >
            <HelpCircle size={20} color="#000000" style={styles.settingIcon} />
            <Text style={styles.settingButtonText}>Ajuda & Suporte</Text>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingButton, styles.logoutButton]}
            onPress={handleSignOut}
          >
            <LogOut size={20} color="#B71C1C" style={styles.settingIcon} />
            <Text style={[styles.settingButtonText, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutSection}>
          <Text style={styles.tenantName}>{currentTenant?.name || 'App'}</Text>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    marginTop: 4,
  },
  settingsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingButtonText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    color: '#B71C1C',
  },
  aboutSection: {
    padding: 16,
    alignItems: 'center',
  },
  tenantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },
});