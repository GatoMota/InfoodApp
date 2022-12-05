import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Card, ListItem, Icon } from 'react-native-elements'
import Scrapper from './Scrapper';

export default function Carrito() {
    initialArr = [
  {
    id: '',
    name: 'gatito',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1199242002.jpg',
    price: "$12312123"
  },
  {
    name: 'el mismo gatito pero con un nombre mucho mas largo para ver q xuxa',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1199242002.jpg',
    price: "$1231222"
  },
];

let products = initialArr.map(item => {
        return (
          <TouchableOpacity key={item.name}>
          <Card key={item.name} >
            <View style={styles.card}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
            <Text key={item.name} style={styles.name}>{item.name}</Text>
            <Text key={item.price} style={styles.price}>{item.price}</Text>
            </View>
          </Card>
          </TouchableOpacity>
        );
      })
  return (
    <ScrollView style={styles.container}>
      {products}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#59C1BD',
    },
    card: {
      flexDirection: 'row',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 2,
      alignSelf:'center',
    },
    name: {
      
      padding: 10,
      textAlignVertical: 'center',
      textAlign: 'left',
      minHeight: vw(20),
      maxHeight: vw(20),
      minWidth: vw(45),
      maxWidth: vw(45),
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