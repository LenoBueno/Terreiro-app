import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ThemedText';

export const RecentActivities = () => (
  <Card style={styles.section}>
    <ThemedText type="subtitle" style={styles.sectionTitle}>
      Atividades Recentes
    </ThemedText>
    <ThemedText type="default" style={styles.sectionText}>
      Acompanhe suas atividades e notificações recentes aqui.
    </ThemedText>
  </Card>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
