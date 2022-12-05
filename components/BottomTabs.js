import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import Carrito from './Carrito';
import MarketTabs from './MarketsTabs';
import Vision from './Vision';

const Tab = createBottomTabNavigator()

export default function MyTabs() {

  return (
    <Tab.Navigator>
        <Tab.Screen name="Cámara" component={Vision} options={{ headerShown: false,
        tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={{
                  uri:
                    'https://img2.freepng.es/20180205/xcw/kisspng-camera-icon-photo-camera-png-transparent-image-5a78fc6ad5cd85.7514379315178783788757.jpg',
                }}
              />
            );
          }, }}/>
        <Tab.Screen name="Carrito" component={MarketTabs} options={{  headerShown: false,
        tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={{
                  uri:
                    'https://cdn-icons-png.flaticon.com/512/107/107831.png',
                }}
              />
            );
          }, }}/>
    </Tab.Navigator>
  );
}