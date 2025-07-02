import { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ProductContext } from '@/context/ProductContext';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EstoqueScreen() {
  const { products, updateProduct, venderProduto } = useContext(ProductContext);
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [modo, setModo] = useState<'entrada' | 'saida'>('entrada');
  const produto = products.find(p => p.codigoBarras === codigo);
  const insets = useSafeAreaInsets();

  function handleEstoque() {
    if (!produto) {
      Alert.alert('Produto não encontrado!');
      return;
    }
    const qtd = Number(quantidade);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('Quantidade inválida!');
      return;
    }
    if (modo === 'entrada') {
      updateProduct(produto.codigoBarras, { quantidade: String(Number(produto.quantidade) + qtd) });
      Alert.alert('Estoque atualizado!');
    } else {
      if (Number(produto.quantidade) < qtd) {
        Alert.alert('Quantidade insuficiente em estoque!');
        return;
      }
      venderProduto(produto.codigoBarras, qtd);
      Alert.alert('Venda registrada!');
    }
    setQuantidade('');
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ThemedText type="title">Controle de Estoque</ThemedText>
      <TextInput placeholder="Código de Barras" value={codigo} onChangeText={setCodigo} style={styles.input} />
      <View style={styles.row}>
        <Button title="Adicionar ao Estoque" onPress={() => setModo('entrada')} color={modo === 'entrada' ? 'green' : undefined} />
        <Button title="Informar Venda" onPress={() => setModo('saida')} color={modo === 'saida' ? 'red' : undefined} />
      </View>
      <TextInput placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} style={styles.input} keyboardType="numeric" />
      <Button title={modo === 'entrada' ? 'Adicionar' : 'Vender'} onPress={handleEstoque} />
      {produto ? (
        <View style={{ marginTop: 16 }}>
          <ThemedText>Produto: {produto.nome}</ThemedText>
          <ThemedText>Estoque atual: {produto.quantidade}</ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 4 },
  row: { flexDirection: 'row', gap: 8, marginVertical: 8 },
});
