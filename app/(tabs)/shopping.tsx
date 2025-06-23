import { View, StyleSheet, Text } from 'react-native';
import StandardPage from '@/components/templates/StandardPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default function BathsScreen() {
  return (
    <StandardPage 
      title="Compras" 
      showBackButton={true}
      contentStyle={{ backgroundColor: '#fff' }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Conteúdo em desenvolvimento</Text>
      </View>
    </StandardPage>
  );
}