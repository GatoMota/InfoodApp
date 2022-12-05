import { Camera, CameraType, } from 'expo-camera';
import React, { useState, useEffect, yaruseRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Dialog from 'react-native-dialog';
import { getFunctions } from 'firebase/functions'
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import {Search} from './Search'
import MarketTabs from './MarketsTabs';
import { traducirDato } from './DataTranslator';

export default function App({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null)
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState("")

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async () => {
    setVisible(false);
    let input = text 
    onChangeText("")
    let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/search/' + input
    let response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
        },
      })
      let data = await response.json();
      if(Object.keys(data.products).length > 0) {
        let productList = []
        let int = 0
        for await (let product of data.products) {
          let referenceId = product.items[0].referenceId[0].Value
          let url = 'https://apis.santaisabel.cl:8443/catalog/api/v1/pedrofontova/search/' + referenceId
          let response = await fetch(url, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Accept': '*/*',
                'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
              },
            })
            let priceSantaIsabel = await response.json()
            priceSantaIsabel = priceSantaIsabel.products[0].items[0].sellers[0].commertialOffer.Price
            productList.push(traducirDato(data, int, priceSantaIsabel))
          int++
          if (int >= 10) break;
        }
        navigation.navigate('SearchList',{productList: productList, data: data})
      } else  {
        console.log('no se encontró el producto')
      }
    //navigation.navigate('SearchList',{inputList: data})
  };
  const searchOCR = async (input) => {
    let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/search/' + input
    let response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
        },
      })
      let data = await response.json();
      if(Object.keys(data.products).length > 0) {
        let productList = []
        let int = 0
        for await (let product of data.products) {
            productList.push(traducirDato(data, int))
          int++
          if (int >= 10) break;
        }
        navigation.navigate('SearchList',{productList: productList, data: data})
      } else  {
        console.log('no se encontró el producto')
      }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View >
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
        <Text style={styles.text}></Text>
        <Text style={styles.permission}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" style={styles.button} />
      </View>
    );
  }
  const firebaseConfig = {
    apiKey: "AIzaSyCaBWNxp8v3TUQjJGopnEe8QnmW1Aw-cak",
    authDomain: "infood-57981.firebaseapp.com",
    projectId: "infood-57981",
    storageBucket: "infood-57981.appspot.com",
    messagingSenderId: "587726608381",
    appId: "1:587726608381:web:743fcd178f8d3f6b52ab94",
    measurementId: "G-BPGFH8B4YH"
  };
    // Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId: '270532658966-130gtfj4vcql2kgrihm6t2fphgb5sgaf.apps.googleusercontent.com',
  appId: '1:270532658966:android:4b8155b4d463f02b7fb237',
  apiKey: 'AIzaSyBao89InminK6QtdMNZiOblfcCTzymeTQc',
  databaseURL: 'https://products-369700-default-rtdb.firebaseio.com',
  storageBucket: 'products-369700.appspot.com',
  messagingSenderId: '270532658966',
  projectId: 'products-369700',
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: '270532658966-d6r8uuej7fr8gpb7jum7q1f589ap6go6.apps.googleusercontent.com',
  appId: '1:270532658966:ios:9f29f267ea1ce8727fb237',
  apiKey: 'AIzaSyCGM3d3yiraXOUJLNn0c06lzDTkwfiv1ys',
  databaseURL: 'https://products-369700-default-rtdb.firebaseio.com',
  storageBucket: 'products-369700.appspot.com',
  messagingSenderId: '270532658966',
  projectId: 'products-369700',
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: 'SECONDARY_APP',
};

  async function getCities() {
    const app = initializeApp(firebaseConfig, config);
    const db = getFirestore(app)
    const citiesCol = collection(db, 'products');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(Object.keys(cityList))
    //let functions= getFunctions(app)
    return cityList;
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const createAlert = (alerta) =>
    Alert.alert('Alert Title', alerta, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  async function photoToVision() {
    if(cameraRef){
      let photo = await cameraRef.takePictureAsync({ base64: true });
      //let photo = await cameraRef.recordAsync()({ base64: true });
      const manipResult = await manipulateAsync(photo.uri, [/*{ resize: { width: 640, height: 480 } }*/], {
        compress: 0,
        format: SaveFormat.JPEG,
        base64: true,
    });
      let responseJson = await submitToGoogle(manipResult)
      return responseJson
    }
  }

  submitToGoogle = async (image) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              //{ type: "LABEL_DETECTION", maxResults: 10 },
              //{ type: "LANDMARK_DETECTION", maxResults: 5 },
              //{ type: "FACE_DETECTION", maxResults: 5 },
              //{ type: "LOGO_DETECTION", maxResults: 5 },
              { type: "TEXT_DETECTION", maxResults: 5 },
              //{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              //{ type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              //{ type: "IMAGE_PROPERTIES", maxResults: 5 },
              //{ type: "CROP_HINTS", maxResults: 5 },
              //{ type: "WEB_DETECTION", maxResults: 5 }
              //{ type: "PRODUCT_SEARCH", maxResults: 5 }

              //{maxResults: 1}
            ],
            
            image: {
              content: image.base64,
              source: {
                //imageUri: uri.slice(0,93)
              }
            },
            imageContext: {
              productSearchParams: {
                productSet: 'projects/infood-57981/locations/us-west1/productSets/products',
                productCategories: ['general-v1'],
                filter: ''
              },
            },
          },
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "AIzaSyCaBWNxp8v3TUQjJGopnEe8QnmW1Aw-cak",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      return await response.json()
    } catch (error) {
      console.log(error);
    }
  };
  const sendVision = async () => {
    while(cameraRef) {
      let responseJson = await photoToVision()
      //console.log(responseJson)
      //console.log(responseJson.responses[0])
      if (Object.keys(responseJson.responses[0]).length != 0) {
        Object.keys(responseJson.responses[0]).map(feature => {
          let alerta = ''
          if(feature === 'webDetection') {
            console.log(feature)
            console.log(Object.values(responseJson.responses[0].webDetection.bestGuessLabels[0]))
            alerta += `${feature}: ${Object.values(responseJson.responses[0].webDetection.bestGuessLabels[0])}`
          } else if(feature === 'logoAnnotations') {
            console.log(feature)
            console.log(responseJson.responses[0].logoAnnotations[0].description)
            alerta += `${feature}: ${responseJson.responses[0].logoAnnotations[0].description}`
          } else if(feature === 'textAnnotations') {
            //console.log(feature)
            //console.log(responseJson.responses[0].textAnnotations[0].description)
            //alerta += `${feature}: ${responseJson.responses[0].textAnnotations[0].description}`
            //setCameraRef(null)
            searchOCR(responseJson.responses[0].textAnnotations[0].description)
          } else if(feature === 'fullTextAnnotation') {
            //console.log(feature)
            //console.log(responseJson.responses[0].fullTextAnnotation.text)
            //alerta += `${feature}: ${responseJson.responses[0].fullTextAnnotation.text}`
            //Scrapper('https://www.jumbo.cl/nectar-naranja-sin-azucar-anadida-15-l/')
            //setOnReady(false)
            //navigation.navigate('Info', {
            //  uri: 'https://www.jumbo.cl/busqueda?ft=' + responseJson.responses[0].fullTextAnnotation.text,
            //})
            //let search = Search('https://apijumboweb.smdigital.cl/catalog/api/v1/search/'+ responseJson.responses[0].fullTextAnnotation.text)
            //let productName = search.products[0].linkText
            //console.log(productName)
            //let scrapper = Scrapper('https://apijumboweb.smdigital.cl/catalog/api/v1/product/' + productName)
          } else if(feature === 'productSearchResults') {
            console.log(feature)
            //console.log(responseJson.responses[0])
            alerta += `${feature}: ${responseJson.responses[0].productSearchResults.results}`
            //Scrapper('https://www.jumbo.cl/nectar-vivo-sabor-naranja-contiene-antioxidantes-naturales-190-cc/p')
            //setOnReady(false)
            //navigation.navigate('Info', {
            //  uri: 'https://www.jumbo.cl/busqueda?ft=' + responseJson.responses[0].fullTextAnnotation.text,
            //})
            //console.log(scrapper)
          }
          
          //createAlert(alerta)
        })
        }
        //let scrapper = await Scrapper('https://apijumboweb.smdigital.cl/catalog/api/v1/search/nectar%20naranja')
        //console.log(Object.values(scrapper))
      }
  }
  
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={sendVision} title="Tomar Foto"/>
        <View>
      <Button title="Escanear código de barras" onPress={navigation.navigate('Barcode')} />
      <Button title="Buscar manualmente" onPress={showDialog} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Buscar producto</Dialog.Title>
        <Dialog.Input onChangeText={onChangeText} value={text} label="Ingrese nombre del producto"></Dialog.Input>
        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Buscar" onPress={handleSearch} />
      </Dialog.Container>
    </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
