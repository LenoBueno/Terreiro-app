import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import {
  User,
  Bell,
  Moon,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

console.log('SettingsNewScreen: Módulo carregado');

export default function SettingsNewScreen() {
  console.log('SettingsNewScreen: Renderizando tela de configurações');
  
  const { user, signOut } = useAuth();
  const { currentTenant } = useTenant();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('SettingsNewScreen: Componente montado');
    return () => {
      console.log('SettingsNewScreen: Componente desmontado');
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('SettingsNewScreen: Tela em foco');
      return () => {
        console.log('SettingsNewScreen: Tela perdeu foco');
      };
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
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
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    scrollView: {
      flex: 1,
    },
    profileSection: {
      alignItems: 'center',
      padding: 24,
      backgroundColor: '#1E1E1E',
      marginBottom: 16,
    },
    profileAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    profileInitial: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
    },
    profileInfo: {
      alignItems: 'center',
    },
    profileName: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    profileEmail: {
      color: '#888',
      fontSize: 14,
    },
    section: {
      backgroundColor: '#1E1E1E',
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
    },
    sectionTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    settingItemLast: {
      borderBottomWidth: 0,
    },
    settingText: {
      color: '#fff',
      fontSize: 16,
    },
    settingLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingIcon: {
      marginRight: 12,
    },
    settingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    settingButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    logoutButton: {
      backgroundColor: '#D32F2F',
      borderRadius: 8,
      padding: 12,
      marginTop: 16,
      justifyContent: 'center',
      borderBottomWidth: 0,
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    aboutSection: {
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 24,
    },
    tenantName: {
      color: '#888',
      fontSize: 14,
      marginBottom: 4,
    },
    versionText: {
      color: '#888',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Configurações" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileAvatar}
            onPress={() => console.log('Clicou no avatar')}
          >
            <Text style={styles.profileInitial}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Text>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.name || 'Usuário'}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || 'usuario@exemplo.com'}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color="#888" style={styles.settingIcon} />
              <Text style={styles.settingText}>Notificações</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingLabelContainer}>
              <Moon size={20} color="#888" style={styles.settingIcon} />
              <Text style={styles.settingText}>Modo Escuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => console.log('Editar perfil')}
          >
            <View style={styles.settingLabelContainer}>
              <User size={20} color="#888" style={styles.settingIcon} />
              <Text style={styles.settingButtonText}>Editar Perfil</Text>
            </View>
            <ChevronRight size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => console.log('Ajuda')}
          >
            <View style={styles.settingLabelContainer}>
              <HelpCircle size={20} color="#888" style={styles.settingIcon} />
              <Text style={styles.settingButtonText}>Ajuda</Text>
            </View>
            <ChevronRight size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingButton, styles.logoutButton]}
            onPress={handleSignOut}
          >
            <View style={styles.settingLabelContainer}>
              <LogOut size={20} color="#fff" style={styles.settingIcon} />
              <Text style={[styles.settingButtonText, styles.logoutText]}>
                Sair
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutSection}>
          <Text style={styles.tenantName}>
            {currentTenant?.name || 'Terreiro App'}
          </Text>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
