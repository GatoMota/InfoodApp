export function traducirDato(data, id) {
    let product = {}
    let referenceId = data.products[id].items[0].referenceId[0].Value
    let productName = data.products[id].productName
    let productImage = data.products[id].items[0].images[0].imageUrl
    let productJumboPrice = data.products[id].items[0].sellers[0].commertialOffer.Price
    let productCondicionAlimentaria = "Sin información sobre condición alimentaria."
    let productIngredients = "Sin información sobre ingredientes"
    let isVegan = ""
    data.products[id].specificationGroups.find((caracteristicas) => {
        if(caracteristicas.name === 'Características') {
            productCondicionAlimentaria = caracteristicas.specifications.find(condicionesAlimentarias => condicionesAlimentarias.name === 'Condiciones Alimentarias')
            isVegan = productCondicionAlimentaria.values.find(vegano => vegano === 'Vegano')
            productCondicionAlimentaria = productCondicionAlimentaria.values.join(", ")
            productIngredients = caracteristicas.specifications.find(condicionesAlimentarias => condicionesAlimentarias.name === 'Ingredientes')
            productIngredients = productIngredients.values
        }
    })
    product['id'] = referenceId
    product['name'] = productName
    product['image'] = productImage
    product['Jumbo'] = productJumboPrice
    //product['caracteristicas'] = caracteristicas
    product['productCondicionAlimentaria'] = productCondicionAlimentaria
    product['productIngredients'] = productIngredients
    product['isVegan'] = isVegan
    product['cantidad'] = 1
   return product
}

export function setSantaIsabelPrice(item, productSantaIsabelPrice) {
 item['SantaIsabel'] = productSantaIsabelPrice
 return item
}