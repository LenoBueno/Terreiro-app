import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle, StyleProp } from 'react-native';

type ScreenTemplateProps = {
  children: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
};

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  title,
  style,
  scrollable = true,
}) => {
  const Container = scrollable ? ScrollView : View;
  
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Container style={styles.content}>
        {children}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
