import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function GetWebView({ route, navigation }) {
  const { uri } = route.params;
  return (
    <WebView
      style={styles.container}
      source={{ uri: uri }}
    />
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