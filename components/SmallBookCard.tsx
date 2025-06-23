import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle, ImageStyle, TextStyle, StyleProp } from 'react-native';

interface SmallBookCardProps {
  imageSource: any;
  title: string;
  author: string;
  onPress?: () => void;
}

const SmallBookCard: React.FC<SmallBookCardProps> = ({
  imageSource,
  title,
  author,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface Styles {
  container: ViewStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  author: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    width: 90,
    aspectRatio: 2/3,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 6,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent', // Borda transparente
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 1,
    textAlign: 'center',
  },
  author: {
    fontSize: 9,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
  },
});

export default SmallBookCard;
