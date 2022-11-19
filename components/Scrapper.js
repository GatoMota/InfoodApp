
export default async function Scrapper(url){
return fetch(url, {
    mode: 'cors', 
    headers: {
      'x-api-key': 'AIzaSyCx80ru6-RXeTi3GvqkFsMVyMf-vpgIoVw',
      'User-Agent' : 'My-App',
      'Accept': '*/*',
    },
  })
  .then(response => console.log(response.json()))
  .catch(error => console.log('Error while fetching:', error))
}