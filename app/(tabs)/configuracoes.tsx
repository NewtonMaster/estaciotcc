import { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ConfiguracoesScreen() {
  const [logo, setLogo] = useState<string | null>(null);
  const [icone, setIcone] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  async function pickLogo() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    if (!result.canceled && result.assets.length > 0) {
      setLogo(result.assets[0].uri);
      Alert.alert('Logo alterada! (Apenas visual, não altera o ícone do app na loja)');
    }
  }

  async function pickIcone() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    if (!result.canceled && result.assets.length > 0) {
      setIcone(result.assets[0].uri);
      Alert.alert('Ícone alterado! (Apenas visual, para mudar o ícone real do app edite o app.json/app.config.js)');
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <ThemedText type="title">Configurações</ThemedText>
      <Button title="Alterar logo de fundo da Home" onPress={pickLogo} />
      {logo && <Image source={{ uri: logo }} style={styles.img} />}
      <Button title="Alterar ícone do aplicativo" onPress={pickIcone} />
      {icone && <Image source={{ uri: icone }} style={styles.img} />}
      <ThemedText style={{marginTop:16}} type="default">
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  img: { width: 100, height: 100, margin: 8, alignSelf: 'center' },
});
