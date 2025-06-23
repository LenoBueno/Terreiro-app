import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTenant } from '@/hooks/useTenant';
import { Mail } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { currentTenant } = useTenant();

  const handleResetPassword = async () => {
    if (!email) {
      setError('Email é obrigatório');
      return;
    }
    
    try {
      setError(null);
      // Implementar lógica de redefinição de senha aqui
      setSuccess(true);
    } catch (err) {
      setError('Falha ao enviar as instruções de redefinição. Por favor, tente novamente.');
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Verifique seu Email</Text>
          <Text style={styles.message}>
            Enviamos as instruções de redefinição de senha para {email}. 
            Por favor, verifique sua caixa de entrada.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.buttonText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Esqueci a Senha</Text>
        <Text style={styles.subtitle}>
          Digite seu endereço de email e enviaremos instruções para redefinir sua senha.
        </Text>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Mail size={20} color="#000000" />
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            placeholderTextColor="#9E9E9E"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.linkText}>Voltar para o Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 32,
    textAlign: 'center',
    color: '#616161',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 32,
    textAlign: 'center',
    color: '#616161',
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 24,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Light',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    color: '#B71C1C',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});