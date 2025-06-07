import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type FloatingActionButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  style?: ViewStyle;
  iconColor?: string;
  backgroundColor?: string;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  style,
  iconColor = '#fff',
  backgroundColor = '#006B3F',
}) => {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon as any} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default FloatingActionButton;
