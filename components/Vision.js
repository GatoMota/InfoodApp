import { Camera, CameraType, } from 'expo-camera';
import React, { useState, useEffect, yaruseRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import Scrapper from './Scrapper';
import GetWebView from './WebView';

export default function App({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null)
  const [photo, setPhoto] = useState(null);
  const [onReady, setOnReady] = useState(true)

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" style={styles.button} />
      </View>
    );
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
              { type: "PRODUCT_SEARCH", maxResults: 5 }

              //{maxResults: 1}
            ],
            
            image: {
              content: image.base64,
              source: {
                //imageUri: uri.slice(0,93)
              }
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "AIzaSyCiV-j-vSWNvMkLPIIMuC1zQ8p571dDNNo",
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
  //let responseJson = photoToVision()
  //console.log(Object.values(responseJson.responses[0].logoAnnotations[0]))
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}  ref={ref => {setCameraRef(ref)}} onCameraReady={async() => {
        while(cameraRef != null) {
        let responseJson = await photoToVision()
        //console.log(responseJson)
        console.log(Object.keys(responseJson.responses[0]))
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
              console.log(feature)
              console.log(responseJson.responses[0].textAnnotations[0].description)
              alerta += `${feature}: ${responseJson.responses[0].textAnnotations[0].description}`
            } else if(feature === 'fullTextAnnotation') {
              console.log(feature)
              console.log(responseJson.responses[0].fullTextAnnotation.text)
              alerta += `${feature}: ${responseJson.responses[0].fullTextAnnotation.text}`
              //Scrapper('https://www.jumbo.cl/nectar-naranja-sin-azucar-anadida-15-l/')
              setOnReady(false)
              navigation.navigate('Info', {
                uri: 'https://www.jumbo.cl/busqueda?ft=' + responseJson.responses[0].fullTextAnnotation.text,
              })
            } else if(feature === 'productSearch') {
              console.log(feature)
              console.log(responseJson.responses[0])
              alerta += `${feature}: ${responseJson.responses[0]}`
              //Scrapper('https://www.jumbo.cl/nectar-naranja-sin-azucar-anadida-15-l/')
              setOnReady(false)
              navigation.navigate('Info', {
                uri: 'https://www.jumbo.cl/busqueda?ft=' + responseJson.responses[0].fullTextAnnotation.text,
              })
            }
            //createAlert(alerta)
          })
          }
        }
      }
        }>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={async() => {
            setCameraRef(null)
            }} title="Analyze!"/>
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
    flex: 1,
    aspectRatio: 0.7,
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
});
