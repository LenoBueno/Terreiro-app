import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export function DetailModal({ visible, onClose, title, description, image, details }: DetailModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={24} color="#000000" />
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            
            <Text style={styles.description}>{description}</Text>
            
            {details && details.map((detail, index) => (
              <View key={index} style={styles.detailSection}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  info: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#616161',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  detailValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    lineHeight: 22,
  },
});