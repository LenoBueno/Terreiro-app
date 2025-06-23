import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';

interface AddBookFormProps {
  onSubmit: (book: {
    title: string;
    author: string;
    totalPages: string;
    image: any;
    document?: any;
  }) => void;
  onCancel: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [image, setImage] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setDocument({
          uri: result.assets[0].uri,
          name: result.assets[0].name || 'documento.pdf',
          type: result.assets[0].mimeType || 'application/pdf'
        });
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o documento.');
    }
  };

  const uploadDocument = async (fileUri: string) => {
    setIsUploading(true);
    try {
      // Aqui você pode implementar o upload para o seu servidor ou armazenamento
      // Por enquanto, vamos apenas retornar um objeto com as informações do arquivo
      return {
        uri: fileUri,
        name: fileUri.split('/').pop(),
        type: 'application/pdf'
      };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !author || !totalPages || !image) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      let uploadedDocument = null;
      if (document) {
        uploadedDocument = await uploadDocument(document.uri);
      }

      onSubmit({
        title,
        author,
        totalPages,
        image: { uri: image },
        document: uploadedDocument,
      });
    } catch (error) {
      console.error('Erro ao processar o documento:', error);
      Alert.alert('Erro', 'Não foi possível processar o documento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Livro</Text>
      
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="add-a-photo" size={40} color="#666" />
            <Text style={styles.imagePlaceholderText}>Adicionar Capa</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Título do Livro</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do livro"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Digite o nome do autor"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Total de Páginas</Text>
      <TextInput
        style={styles.input}
        value={totalPages}
        onChangeText={setTotalPages}
        placeholder="Digite o total de páginas"
        keyboardType="numeric"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Documento (PDF opcional)</Text>
      <TouchableOpacity 
        style={[styles.documentButton, document && styles.documentButtonSelected]}
        onPress={pickDocument}
        disabled={isUploading}
      >
        <MaterialIcons 
          name="insert-drive-file" 
          size={24} 
          color={document ? '#fff' : '#666'} 
        />
        <Text style={[styles.documentButtonText, document && styles.documentButtonTextSelected]}>
          {document ? document.name : 'Selecionar documento'}
        </Text>
        {isUploading && <ActivityIndicator color="#fff" style={styles.uploadIndicator} />}
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    width: 180,
    height: 240,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  documentButtonSelected: {
    backgroundColor: '#006B3F',
    borderColor: '#005a34',
  },
  documentButtonText: {
    marginLeft: 10,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  documentButtonTextSelected: {
    color: '#fff',
  },
  uploadIndicator: {
    marginLeft: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#006B3F',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});

export default AddBookForm;
