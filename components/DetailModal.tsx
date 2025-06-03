import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export function DetailModal({ visible, onClose, title, subtitle, description, image, details }: DetailModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onClose}
        >
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          
          <View style={styles.info}>
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
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 1,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#616161',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 24,
  },
  info: {
    padding: 16,
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