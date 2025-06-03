import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ItemCardProps {
  title: string;
  subtitle?: string;
  image: string;
  onPress: () => void;
}

export function ItemCard({ title, subtitle, image, onPress }: ItemCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  content: {
    padding: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#616161',
    marginTop: 2,
  },
});