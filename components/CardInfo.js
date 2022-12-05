import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Card, ListItem, Icon } from 'react-native-elements'
import Scrapper from './Scrapper';
import { useState } from 'react';
import { deleteData, getData, storeData } from './Cache';
import { traducirDato } from './DataTranslator';

export default function CardInfo({ route }) {
const {item} = route.params;
let product = (
    <Card key={item.name + 'Card'} style={styles.card}>
      <View style={styles.card}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: item.image }}
      />
      <Text key={item.name} style={styles.name}>{item.name}</Text>
      <Button title='Agregar a mi lista' style={styles.button} onPress={() => {storeData(item)}}></Button>
      <Text key={item.Jumbo + 'Jumbo'} style={styles.price}>${item.Jumbo} Jumbo</Text>
      <Text key={item.SantaIsabel+ 'SantaIsabel'} style={styles.price}>${item.SantaIsabel} Santa Isabel</Text>
      {item.isVegan === 'Vegano' ? <Image
        style={styles.vegan}
        resizeMode="cover"
        source={{ uri: 'https://static.wixstatic.com/media/944d87_c676f708350f4030945d9cb114e30a0a~mv2.png/v1/fill/w_640,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/944d87_c676f708350f4030945d9cb114e30a0a~mv2.png' }}
      />
        : <Text />}
        <Text key={item.productIngredients} style={styles.ingredients}>{item.productIngredients}</Text>
        <Text key={item.productCondicionAlimentaria} style={styles.condicionAlimentaria}>{item.productCondicionAlimentaria}</Text>
        <Button title="Eliminar Lista" onPress={deleteData}/>
      </View>
    </Card>
)

  return (
    <ScrollView style={styles.container}>
      {product}
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
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 2,
      alignSelf:'center',
    },
    name: {
      padding: 10,
      fontWeight: 'bold',
      fontSize:16,
    },
    price: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
      textAlign: 'right'
    },
    ingredients: {
        paddingTop: 20
    },
    condicionAlimentaria: {
        paddingTop: 20

    },
    vegan: {
        width: 60,
        height: 75,
        borderRadius: 2,
        alignSelf:'flex-start',
    },
    button: {
      paddingTop: 20,
    }
  });