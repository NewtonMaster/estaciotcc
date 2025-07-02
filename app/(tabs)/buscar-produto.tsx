import { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { ProductContext } from '@/context/ProductContext';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BuscarProdutoScreen() {
  const { products } = useContext(ProductContext);
  const [codigo, setCodigo] = useState('');
  const produto = products.find(p => p.codigoBarras === codigo);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ThemedText type="title">Buscar Produto</ThemedText>
      <TextInput placeholder="Digite o código de barras" value={codigo} onChangeText={setCodigo} style={styles.input} />
      {produto ? (
        <View style={styles.result}>
          <ThemedText>Nome: {produto.nome}</ThemedText>
          <ThemedText>Tipo: {produto.tipo}</ThemedText>
          <ThemedText>Preço: {produto.preco}</ThemedText>
          <ThemedText>Quantidade: {produto.quantidade}</ThemedText>
          <ThemedText>Data Cadastro: {produto.dataCadastro}</ThemedText>
          {produto.foto ? <Image source={{ uri: produto.foto }} style={{ width: 100, height: 100 }} /> : null}
        </View>
      ) : codigo ? <ThemedText>Produto não encontrado.</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 4 },
  result: { marginTop: 16, gap: 4 },
});
