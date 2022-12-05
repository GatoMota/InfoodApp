import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Card,  ListItem, Icon } from 'react-native-elements'
import { Search } from './Search';
import Scrapper from './Scrapper';
import { deleteData, deleteItem, getData } from './Cache';
import { useState } from 'react';
import { traducirDatos } from './DataTranslator';

export function Jumbo({ route, navigation }) {
  const [productList, setProductList] = useState([])
  const [totales, setTotales] = useState({})
  const getCache = async () => {
    let cache = await getData()
    if(cache != null){
      await getPrecios()
      setProductList(cache)
    }else setProductList([])
  }
  const getPrecios = async () => {
    let totalJumbo = 0
    let totalSantaIsabel = 0
    let totalez = {}
    for await (let product of productList) {
      let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/search/' + product.id
      let response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
        },
      })
      let url2 = 'https://apis.santaisabel.cl:8443/catalog/api/v1/pedrofontova/search/' + product.id
      let response2 = await fetch(url2, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
          },
        })
        let priceJumbo = await response.json()
        let priceSantaIsabel = await response2.json()
        priceJumbo = priceSantaIsabel.products[0].items[0].sellers[0].commertialOffer.Price
        priceSantaIsabel = priceSantaIsabel.products[0].items[0].sellers[0].commertialOffer.Price
        product.Jumbo = priceJumbo
        product.SantaIsabel = priceSantaIsabel
        totalJumbo += priceJumbo * product.cantidad
        totalSantaIsabel += priceSantaIsabel * product.cantidad
      }
      totalez['totalJumbo'] = totalJumbo
      totalez['totalSantaIsabel'] = totalSantaIsabel
      setTotales(totalez)
    }

  const products = productList.map(item => {
        
        return (
          <Card key={item.name} style={styles.card}>
            <View style={styles.card}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
            <TouchableOpacity key={item.name} onPress={() => navigation.navigate('CardInfo',{item: item})}>
            <Text key={item.name} style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            <Text key={item.Jumbo} style={styles.price}>${item.Jumbo * item.cantidad}</Text>
            <Text key={item.name + item.cantidad} style={styles.cantidad}>{'cant. '+item.cantidad}</Text>
            </View>
          </Card> 
        );
      })

  return (
    <View style={styles.container} onLayout={getCache}>
      <ScrollView >
        {products}
      </ScrollView>
      <Button title={"Total $"+totales.totalJumbo.toString()} onPress={getCache}/>
      <Button title="Eliminar Lista" onPress={deleteData}/>
      <StatusBar style="auto" /> 
    </View>
  );
}

export function SantaIsabel({ route, navigation }) {
  const [productList, setProductList] = useState([])
  const [totales, setTotales] = useState({})
  const getCache = async () => {
    let cache = await getData()
    if(cache != null){
      await getPrecios()
      setProductList(cache)
    }else setProductList([])
  }
  const getPrecios = async () => {
    let totalJumbo = 0
    let totalSantaIsabel= 0
    let totalez = {}
    let aux = 0
    for await (let product of productList) {
      let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/search/' + product.id
      let response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
        },
      })
      let url2 = 'https://apis.santaisabel.cl:8443/catalog/api/v1/pedrofontova/search/' + product.id
      let response2 = await fetch(url2, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
          },
        })
        let priceJumbo = await response.json()
        let priceSantaIsabel = await response2.json()
        priceJumbo = priceSantaIsabel.products[0].items[0].sellers[0].commertialOffer.Price
        priceSantaIsabel = priceSantaIsabel.products[0].items[0].sellers[0].commertialOffer.Price
        product.Jumbo = priceJumbo
        product.SantaIsabel = priceSantaIsabel

        totalJumbo += priceJumbo * product.cantidad
        totalSantaIsabel += priceSantaIsabel * product.cantidad
      }
      totalez['totalJumbo'] = totalJumbo
      totalez['totalSantaIsabel'] = totalSantaIsabel
      setTotales(totalez)
    }
let products = productList.map(item => {
        
  return (
    <Card key={item.name} style={styles.card}>
      <View style={styles.card}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: item.image }}
      />
      <TouchableOpacity key={item.name} onPress={() => navigation.navigate('CardInfo',{item: item})}>
      <Text key={item.name} style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <Text key={item.SantaIsabel} style={styles.price}>${item.SantaIsabel * item.cantidad}</Text>
      <Text key={item.name + item.cantidad} style={styles.cantidad}>{'cant. '+item.cantidad}</Text>
      </View>
    </Card> 
  );
      })

  return (
    <View style={styles.container}>
      <ScrollView>
        {products}
        <View>
          <Text style={styles.container}>{productList.totalSantaIsabel}</Text>
        </View>
      </ScrollView>
      <Button title={"Total $"+totales.totalJumbo.toString()} onPress={getCache}/>
      <Button title="Eliminar Lista" onPress={deleteData}/>
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
      minWidth: vw(50),
      maxWidth: vw(50),
      fontWeight: 'bold',
      fontSize:16,
    },
    price: {
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 18,
      textAlign: 'right'
    },
    cantidad: {
      right: 40,
      textAlign: 'left'
    },

  });