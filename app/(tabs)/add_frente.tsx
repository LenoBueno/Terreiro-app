import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '@/@types/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function AddFrenteScreen() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    orixas: '',
    attributes: '',
    day: '',
    color: '#FFFFFF',
    elements: '',
    offerings: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para salvar a nova frente
    console.log('Dados do formulário:', formData);
    // Após salvar, volta para a lista de frentes
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Frente</Text>
        <TouchableOpacity 
          onPress={handleSubmit}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome da Frente</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Ex: Oxalá"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Descreva a frente..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Orixás (separados por vírgula)</Text>
          <TextInput
            style={styles.input}
            value={formData.orixas}
            onChangeText={(text) => handleInputChange('orixas', text)}
            placeholder="Ex: Oxalá, Oxaguiã, Oxalufã"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Atributos (separados por vírgula)</Text>
          <TextInput
            style={styles.input}
            value={formData.attributes}
            onChangeText={(text) => handleInputChange('attributes', text)}
            placeholder="Ex: Paz, Harmonia, Sabedoria"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Dia da Semana</Text>
            <TextInput
              style={styles.input}
              value={formData.day}
              onChangeText={(text) => handleInputChange('day', text)}
              placeholder="Ex: Domingo"
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Cor</Text>
            <View style={styles.colorPickerContainer}>
              <View 
                style={[styles.colorPreview, { backgroundColor: formData.color }]} 
              />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.color}
                onChangeText={(text) => handleInputChange('color', text)}
                placeholder="#FFFFFF"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Elementos (separados por vírgula)</Text>
          <TextInput
            style={styles.input}
            value={formData.elements}
            onChangeText={(text) => handleInputChange('elements', text)}
            placeholder="Ex: Ar, Céu"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Oferendas (uma por linha)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.offerings}
            onChangeText={(text) => handleInputChange('offerings', text)}
            placeholder="Ex: Flores brancas\nArroz doce\nCanjica branca"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem</Text>
          <TouchableOpacity style={styles.imageUpload}>
            <MaterialIcons name="add-a-photo" size={40} color="#999" />
            <Text style={styles.uploadText}>Adicionar Imagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#006B3F',
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins_500Medium',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  colorPickerContainer: {
    position: 'relative',
  },
  colorPreview: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1,
  },
  imageUpload: {
    height: 120,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
});
