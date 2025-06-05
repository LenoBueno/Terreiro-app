import { useNavigation as useBaseNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { RootStackParamList } from '@/@types/navigation';

type NavigationProp = DrawerNavigationProp<RootStackParamList>;

export function useNavigationWithBack() {
  const navigation = useBaseNavigation<NavigationProp>();
  const router = useRouter();

  const handleBackPress = () => {
    // Navega para a tela inicial (/(tabs))
    router.replace('/(tabs)');
  };

  return {
    navigation,
    router,
    handleBackPress,
  };
}

export default useNavigationWithBack;
