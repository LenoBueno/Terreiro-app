import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

export function Header({ 
  title, 
  showBackButton = false,
  onBackPress,
  rightComponent 
}: HeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
      )}
      
      <Text style={[
        styles.title,
        showBackButton && styles.titleWithBack
      ]}>
        {title}
      </Text>
      
      {rightComponent || <View style={styles.rightPlaceholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    paddingTop: 8, // Extra padding for status bar
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  titleWithBack: {
    textAlign: 'left',
  },
  rightPlaceholder: {
    width: 40,
  },
});