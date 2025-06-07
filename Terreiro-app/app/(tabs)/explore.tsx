import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Card } from '@/components/ui/Card';

export default function ExploreScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader 
        title="Explore" 
        backgroundColor="#6A1B9A"
      />
      
      <View style={styles.content}>
        <Card style={styles.section}>
          <Text style={styles.subtitle}>Bem-vindo ao Terreiro App</Text>
          <Text style={styles.text}>
            Navegue pelo menu lateral para acessar as funcionalidades do aplicativo.
          </Text>
        </Card>
        
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos Disponíveis</Text>
          <Text style={styles.text}>
            Explore nossos recursos e descubra como podemos ajudar em sua jornada espiritual.
          </Text>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
});
