import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import {Jumbo, SantaIsabel} from './Carrito';
import Vision from './Vision';

const Tab = createBottomTabNavigator()

export default function MarketTabs() {

  return (
    <Tab.Navigator>
        <Tab.Screen name="Jumbo" component={Jumbo} options={{ headerShown: false,
        tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/d/d3/Logo_Jumbo_Cencosud.png',
                }}
              />
            );
          },  }} />
        <Tab.Screen name="SantaIsabel" component={SantaIsabel} options={{ headerShown: false,
        tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/e/e5/Logo_Santa_Isabel_Cencosud.png',
                }}
              />
            );
          },  }} />
    </Tab.Navigator>
  );
}