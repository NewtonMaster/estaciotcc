import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProductContext } from '@/context/ProductContext';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function diasRestantes(data: string) {
  const [d, m, a] = data.split('/').map(Number);
  const dt = new Date(a, m - 1, d);
  const hoje = new Date();
  return Math.ceil((dt.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

export default function RelatoriosScreen() {
  const { products } = useContext(ProductContext);

  const prestesAVencer = products.filter(p => {
    const dias = diasRestantes(p.dataCadastro);
    return dias <= 7;
  });

  const acabando = products.filter(p => Number(p.quantidade) <= 5);

  const maisVendidos = [...products].sort((a, b) => (b.vendidos ?? 0) - (a.vendidos ?? 0)).slice(0, 3);
  const menosVendidos = [...products].sort((a, b) => (a.vendidos ?? 0) - (b.vendidos ?? 0)).slice(0, 3);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ThemedText type="title">Relatórios</ThemedText>
      <ThemedText type="subtitle">Produtos prestes a vencer (cadastro há 7 dias ou mais):</ThemedText>
      {prestesAVencer.length
        ? prestesAVencer.map(p => (
            <ThemedText key={p.codigoBarras}>
              {p.nome} - {p.dataCadastro}
            </ThemedText>
          ))
        : <ThemedText>Nenhum.</ThemedText>
      }

      <ThemedText type="subtitle">Produtos acabando ({"<= 5"} no estoque):</ThemedText>
      {acabando.length
        ? acabando.map(p => (
            <ThemedText key={p.codigoBarras}>
              {p.nome} - {p.quantidade} unidades
            </ThemedText>
          ))
        : <ThemedText>Nenhum.</ThemedText>
      }

      <ThemedText type="subtitle">Mais vendidos:</ThemedText>
      {maisVendidos.map(p => (
        <ThemedText key={p.codigoBarras}>
          {p.nome} - {p.vendidos ?? 0} vendidos
        </ThemedText>
      ))}
      <ThemedText type="subtitle">Menos vendidos:</ThemedText>
      {menosVendidos.map(p => (
        <ThemedText key={p.codigoBarras}>
          {p.nome} - {p.vendidos ?? 0} vendidos
        </ThemedText>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
