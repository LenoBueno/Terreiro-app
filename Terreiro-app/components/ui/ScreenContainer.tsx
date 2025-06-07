import { StyleSheet, View, ScrollView, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

export function ScreenContainer({ 
  children, 
  scrollable = true, 
  style, 
  contentContainerStyle,
  backgroundColor = '#f5f5f5'
}: ScreenContainerProps) {
  const Container = scrollable ? ScrollView : View;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      <Container 
        style={[styles.content, contentContainerStyle]} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={!scrollable ? styles.contentContainer : undefined}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
