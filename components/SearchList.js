import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Card,  ListItem, Icon } from 'react-native-elements'

import { Search } from './Search';
import Scrapper from './Scrapper';
import { traducirDato } from './DataTranslator';

export default function SearchList({ route, navigation }) {
const {productList, data} = route.params;

let products = productList.map(item => {
        return (
          <Card key={item.name + item.image} style={styles.card}>
            <View style={styles.card}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
            <TouchableOpacity key={'key'} onPress={() => {navigation.navigate('CardInfo',{item: item})}}>
            <Text key={item.name} style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            </View>
          </Card>
        );
      })

  return (
    <View style={styles.container}>
      <ScrollView>
        {products}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 45,
      backgroundColor: '#59C1BD',
    },
    card: {
      flexDirection: 'row',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 5,
      alignSelf:'center',
    },
    name: {
      padding: 10,
      textAlignVertical: 'center',
      textAlign: 'left',
      minHeight: vw(20),
      maxHeight: vw(20),
      minWidth: vw(70),
      maxWidth: vw(70),
      fontWeight: 'bold',
      fontSize:16,
    },
    price: {
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 18,
      textAlign: 'right'
    }
  });