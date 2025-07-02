import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { useContext } from 'react';
import { useNavigation } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProductContext } from '@/context/ProductContext';

export default function HomeScreen() {
  const navigation = useNavigation() as any;
  const { products } = useContext(ProductContext);

  // Resumo simples
  const totalProdutos = products.length;
  const totalEstoque = products.reduce((acc, p) => acc + Number(p.quantidade), 0);
  const valorTotalEstoque = products.reduce((total, p) => {
    const preco = Number(p.preco) || 0;
    const quantidade = Number(p.quantidade) || 0;
    return total + preco * quantidade;
  }, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Resumo do Estoque</ThemedText>
        <ThemedText>Total de Produtos: {totalProdutos}</ThemedText>
        <ThemedText>Total em Estoque: {totalEstoque}</ThemedText>
        <ThemedText>
          Valor total em estoque: <ThemedText style={{ fontWeight: 'bold' }}>R$ {valorTotalEstoque.toFixed(2)}</ThemedText>
        </ThemedText>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('cadastrar-produto')}>
            <Text style={styles.buttonText}>Cadastrar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('buscar-produto')}>
            <Text style={styles.buttonText}>Buscar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('relatorios')}>
            <Text style={styles.buttonText}>Relatórios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('estoque')}>
            <Text style={styles.buttonText}>Estoque</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('configuracoes')}>
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
  },
  buttonsContainer: {
    marginTop: 32,
    gap: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 4,
    minWidth: 220,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
