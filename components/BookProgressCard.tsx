import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  imageSource: any;
  title: string;
  author: string;
  currentPage: number;
  percentage: number;
  onPress?: () => void;
}

export default function BookProgressCard({
  imageSource,
  title,
  author,
  currentPage,
  percentage,
  onPress,
}: Props) {
  return (
    <View style={styles.wrapper}>
    {/* Card branco com a capa */}
    <TouchableOpacity 
      style={styles.coverCard}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      <Image source={imageSource} style={styles.coverImage} />
    </TouchableOpacity>
    
    {/* Card vermelho com as informações */}
    <View style={styles.backgroundCard}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.page}>
          Página • {currentPage}       <Text style={styles.percent}>{percentage}%</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progressTrack} />
          <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          <View style={[styles.progressDot, { left: `${percentage}%` }]} />
        </View>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    marginHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  coverCard: {
    width: 90,
    height: 120,
    top: -20,
    left: 20,
    borderRadius: 6,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 2,
    marginRight: -90, // Sobreposição do card vermelho
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backgroundCard: {
    backgroundColor: '#B20000',
    borderRadius: 10,
    paddingLeft: 130,  // Ajuste para a sobreposição
    paddingRight: 30,
    paddingTop: 22,
    paddingBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    minHeight: 120,
    justifyContent: 'center',
    width: '90%',
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '700',
  },
  author: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 8,
  },
  page: {
    color: '#fff',
    fontSize: 10,
  },
  percent: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    right: 0,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginTop: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  progressTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    width: '100%',
    top: '50%',
    transform: [{ translateY: -2 }],
  },
  progressFill: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    top: '50%',
    transform: [{ translateY: -2 }],
  },
  progressDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#B20000',
    top: '50%',
    transform: [{ translateY: -7 }],
  },
});
