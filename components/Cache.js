import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('products')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export const storeData = async (product) => {
    try {
      let cache = await getData()
      let clonado = false
      if(cache != null) {
        cache.forEach(p => {
          if(product.name === p.name){
            clonado = true
            p.cantidad++
          }

        });
        if(!clonado) {
          cache.push(product)
        }
      } else {
        cache = []
        cache.push(product)
      }
      //console.log(Object.keys(cache))
      const jsonValue = JSON.stringify(cache)
      await AsyncStorage.setItem('products', jsonValue)
      console.log('Guardado con éxito.')
      
    } catch (e) {
      console.log(e)
    }
}

export const deleteData = async (value) => {
  try {
      await AsyncStorage.removeItem('products');
      return true;
  }
  catch(exception) {
      return false;
  }
}

export const deleteItem = async (value) => {
  try {
      
      return true;
  }
  catch(exception) {
      return false;
  }
}