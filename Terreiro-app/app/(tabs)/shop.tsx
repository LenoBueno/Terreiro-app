import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { useNavigationUtils } from '@/hooks/useNavigationUtils';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
}

export default function ShopScreen() {
  const { navigateTo } = useNavigationUtils();

  // Dados de exemplo dos produtos
  const products: Product[] = [
    { 
      id: '1', 
      name: 'Vela de 7 Dias', 
      price: 'R$ 25,00', 
      image: '🕯️',
      category: 'Velas'
    },
    { 
      id: '2', 
      name: 'Incenso Natural', 
      price: 'R$ 15,00', 
      image: '🪔',
      category: 'Incensos'
    },
    { 
      id: '3', 
      name: 'Ervas para Banho', 
      price: 'R$ 18,00', 
      image: '🌿',
      category: 'Ervas'
    },
    { 
      id: '4', 
      name: 'Cristal Quartzo Rosa', 
      price: 'R$ 45,00', 
      image: '💎',
      category: 'Cristais'
    },
    { 
      id: '5', 
      name: 'Óleo Essencial', 
      price: 'R$ 32,00', 
      image: '🧴',
      category: 'Óleos'
    },
    { 
      id: '6', 
      name: 'Livro de Orações', 
      price: 'R$ 65,00', 
      image: '📖',
      category: 'Livros'
    },
  ];

  const handleProductPress = (productId: string) => {
    // Navegar para a página de detalhes do produto
    navigateTo(`/product/${productId}`);
  };

  return (
    <ScreenContainer>
      <ScreenHeader 
        title="Loja Espiritual" 
        backgroundColor="#9C27B0"
      />
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Produtos em Destaque</Text>
        
        <View style={styles.gridContainer}>
          {products.map((product) => (
            <Card 
              key={product.id} 
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
            >
              <View style={styles.productImage}>
                <Text style={styles.emoji}>{product.image}</Text>
              </View>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </Card>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
