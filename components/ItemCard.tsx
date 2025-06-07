import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageSourcePropType, 
  StyleProp, 
  ViewStyle, 
  ImageStyle, 
  TextStyle,
  TouchableOpacityProps 
} from 'react-native';

export interface ItemCardProps extends TouchableOpacityProps {
  title: string;
  subtitle?: string;
  image: string | ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  aspectRatio?: number;
  imageAspectRatio?: number;
  showShadow?: boolean;
  onPress?: () => void;
}

export function ItemCard({
  title,
  subtitle,
  image,
  style,
  containerStyle,
  imageStyle,
  contentStyle,
  titleStyle,
  subtitleStyle,
  aspectRatio = 1,
  imageAspectRatio = 0.7,
  showShadow = true,
  onPress,
  ...rest
}: ItemCardProps) {
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        showShadow && styles.shadow,
        { aspectRatio },
        containerStyle,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
      {...rest}
    >
      <View style={[styles.imageContainer, { aspectRatio: imageAspectRatio }]}>
        <Image 
          source={imageSource} 
          style={[styles.image, imageStyle]} 
          resizeMode="cover"
        />
      </View>
      <View style={[styles.content, contentStyle]}>
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  shadow: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  } as TextStyle,
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
  } as TextStyle,
});