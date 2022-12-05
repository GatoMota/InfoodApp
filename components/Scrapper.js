import storeData from "./Cache";

export default async function Scrapper(id){
  let productId = data.products[0].linkText //nombre para enviar a Scrapper()
  let url = 'https://apijumboweb.smdigital.cl/catalog/api/v1/product/' + id
  let response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': '*/*',
        'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j',
      },
    })
  let data = await response.json();

  let productName = data.products[0].productName
  let productImage = data.products[0].items[0].images[0].imageUrl
  let productPrice = data.products[0].items[0].sellers[0].commertialOffer.Price
  //let productCondicionAlimentaria = data.products[0].specificationGroups[5].specifications[1].values // map find "Características" y obtener "Condiciones Alimentarias"
  //let productIngredients = data.products[0].specificationGroups[5].specifications[2].values // map find "Características" y obtener "Ingredientes"
  
  console.log(productName)
  console.log(productImage)
  console.log(productPrice)

  const product = [
    {name: productName},
    {image: productImage},
    {price: productPrice}
  ]
  //storeData(product)

  //console.log(productCondicionAlimentaria)
  //console.log(productIngredients)
}