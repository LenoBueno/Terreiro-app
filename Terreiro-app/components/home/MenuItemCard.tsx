import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ThemedText';

type MenuItemCardProps = {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
};

export const MenuItemCard = ({ title, icon, onPress }: MenuItemCardProps) => (
  <Card style={styles.menuCard} onPress={onPress}>
    <View style={styles.menuCardContent}>
      <MaterialIcons name={icon} size={32} color="#4CAF50" />
    </View>
    <ThemedText type="default" style={styles.menuCardText}>
      {title}
    </ThemedText>
  </Card>
);

const styles = StyleSheet.create({
  menuCard: {
    width: '48%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  menuCardContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
