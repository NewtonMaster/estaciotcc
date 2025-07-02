import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Apenas as telas desejadas, sem o botão Explore */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="cadastrar-produto"
        options={{
          title: 'Cadastrar',
        }}
      />
      <Tabs.Screen
        name="buscar-produto"
        options={{
          title: 'Buscar',
        }}
      />
      <Tabs.Screen
        name="relatorios"
        options={{
          title: 'Relatórios',
        }}
      />
      <Tabs.Screen
        name="estoque"
        options={{
          title: 'Estoque',
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
        }}
      />
      {/* NÃO adicione <Tabs.Screen name="explore" ... /> */}
    </Tabs>
  );
}
