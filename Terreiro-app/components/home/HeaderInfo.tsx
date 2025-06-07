import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

type HeaderInfoProps = {
  userName: string;
  formattedDate: string;
};

export const HeaderInfo = ({ userName, formattedDate }: HeaderInfoProps) => (
  <>
    <ScreenHeader 
      title={`Olá, ${userName}`} 
      backgroundColor="#4CAF50"
    />
    <View style={styles.headerInfo}>
      <ThemedText type="default" style={styles.date}>
        {formattedDate}
      </ThemedText>
    </View>
  </>
);

const styles = StyleSheet.create({
  headerInfo: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
