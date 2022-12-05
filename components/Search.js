
import React, { useReducer, useState, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';

export default async function Search(input){
    console.log(input)
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
      console.log(data)
      
    }