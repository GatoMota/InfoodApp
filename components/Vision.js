import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Dialog from 'react-native-dialog';
import { traducirDato } from './DataTranslator';

export default function Barcode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState("")
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async ({type, data}) => {
    setVisible(false);
    let input 
    if(data === undefined) {
      input = text
    } else {
      input = data
    }
    setScanned(true);
    onChangeText("")
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/search/' + input
    let response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
        },
      })
      let dataJumbo = await response.json();
      if(Object.keys(dataJumbo.products).length > 0) {
        let productList = []
        let int = 0
        for await (let product of dataJumbo.products) {
            productList.push(traducirDato(dataJumbo, int))
          int++
          if (int >= 10) break;
        }
        navigation.navigate('SearchList',{productList: productList, data: dataJumbo})
      } else  {
        console.log('no se encontró el producto')
      }
    //navigation.navigate('SearchList',{inputList: data})
  };
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleSearch}
        style={styles.camera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.text}>Escanear otra vez</Text>
          </TouchableOpacity>
        </View>
        <View>
        <Button title="Buscar manualmente" onPress={showDialog} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Buscar producto</Dialog.Title>
        <Dialog.Input onChangeText={onChangeText} value={text} label="Ingrese nombre del producto"></Dialog.Input>
        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Buscar" onPress={handleSearch} />
      </Dialog.Container>
      </View>
      </BarCodeScanner>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#59C1BD'
  },
  camera: {
    aspectRatio: 0.7,
    paddingTop: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  permission: {
    textAlign: 'center',
    fontSize: 20
  },

});