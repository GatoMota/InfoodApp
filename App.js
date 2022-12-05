import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Vision from './components/Vision';
import Carrito from './components/Carrito';
import SearchList from './components/SearchList';
import MyTabs from './components/BottomTabs';
import CardInfo from './components/CardInfo';
import MarketsTabs from './components/MarketsTabs';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Supermercados" component={MarketsTabs} options={{ headerShown: false }} />
        <Stack.Screen name="CardInfo" component={CardInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchList" component={SearchList} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});