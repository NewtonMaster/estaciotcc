import { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ProductContext } from '@/context/ProductContext';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CadastrarProdutoScreen() {
  const { addProduct } = useContext(ProductContext);
  const [form, setForm] = useState({
    codigoBarras: '',
    nome: '',
    tipo: 'bebida' as 'bebida' | 'alimento',
    preco: '',
    quantidade: '',
    foto: '',
    dataCadastro: '',
    dataVencimento: '', // novo campo
  });

  const insets = useSafeAreaInsets();

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    if (!result.canceled && result.assets.length > 0) {
      setForm((f) => ({ ...f, foto: result.assets[0].uri }));
    }
  }

  function handleChange(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit() {
    if (
      !form.codigoBarras ||
      !form.nome ||
      !form.preco ||
      !form.quantidade ||
      !form.dataCadastro ||
      !form.dataVencimento // validação do novo campo
    ) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }
    addProduct(form);
    Alert.alert('Produto cadastrado!');
    setForm({
      codigoBarras: '',
      nome: '',
      tipo: 'bebida',
      preco: '',
      quantidade: '',
      foto: '',
      dataCadastro: '',
      dataVencimento: '', // reset novo campo
    });
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ThemedText type="title">Cadastrar Produto</ThemedText>
      <TextInput placeholder="Código de Barras" value={form.codigoBarras} onChangeText={v => handleChange('codigoBarras', v)} style={styles.input} />
      <TextInput placeholder="Nome" value={form.nome} onChangeText={v => handleChange('nome', v)} style={styles.input} />
      <TextInput placeholder="Tipo (bebida/alimento)" value={form.tipo} onChangeText={v => handleChange('tipo', v)} style={styles.input} />
      <TextInput placeholder="Preço" value={form.preco} onChangeText={v => handleChange('preco', v)} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Quantidade" value={form.quantidade} onChangeText={v => handleChange('quantidade', v)} style={styles.input} keyboardType="numeric" />
      <TextInput
        placeholder="Data de Cadastro (dd/mm/aaaa)"
        value={form.dataCadastro}
        onChangeText={v => handleChange('dataCadastro', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Vencimento (dd/mm/aaaa)"
        value={form.dataVencimento}
        onChangeText={v => handleChange('dataVencimento', v)}
        style={styles.input}
      />
      <Button title="Adicionar Foto" onPress={pickImage} />
      {form.foto ? <Image source={{ uri: form.foto }} style={{ width: 100, height: 100, margin: 8 }} /> : null}
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 4 },
});

// Adicione esta linha no terminal para instalar o pacote:
// expo install expo-image-picker

// No código, mantenha o import assim:
// import * as ImagePicker from 'expo-image-picker';
