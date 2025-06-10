// app/components/Header.tsx
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
import { useRouter } from 'expo-router';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  rightComponent?: React.ReactNode;
};

export default function Header({ 
  title, 
  showBackButton = false,
  showLogo = true,
  rightComponent 
}: HeaderProps) {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const router = useRouter();

  return (
    <>
      {/* Cabeçalho Superior */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()}
            style={styles.menuButton}
          >
            <MaterialIcons 
              name="blur-on" 
              size={45} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
        
        {showLogo && (
          <View style={styles.headerCenter}>
            <Text style={styles.headerCenterText}>Ylê Axé</Text>
            <Text style={styles.headerCenterSubtext}>Xangô & Oxum</Text>
          </View>
        )}
        
        <View style={styles.headerIcons}>
          {rightComponent || (
            <Image 
              source={require('@/assets/images/profile/user.jpg')} 
              style={styles.avatar} 
            />
          )}
        </View>
      </View>

      {/* Título da Página */}
      <View style={styles.titlesContainer}>
        <View style={styles.titleContainer}>
          {showBackButton && (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <MaterialIcons name="navigate-before" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <Text style={[styles.headerTitle, !showBackButton && { marginLeft: 16 }]}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#006B3F',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerCenterText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerCenterSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins_400Regular',
  },
  headerIcons: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButton: {
    padding: 8,
    marginLeft: -8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titlesContainer: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#006B3F',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 0,
    marginLeft: -0,
    marginTop: -0,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: -0,
    marginBottom: 4,
  },
});