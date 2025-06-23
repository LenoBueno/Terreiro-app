import { View, Text, StyleSheet } from 'react-native';
import StandardPage from '@/components/templates/StandardPage';

export default function ChatScreen() {
  return (
    <StandardPage title="Chat">
      <View style={styles.container}>
        <Text style={styles.text}>Conteúdo em desenvolvimento</Text>
      </View>
    </StandardPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
