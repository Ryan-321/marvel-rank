import apiKey from '../secret'


export const fetchDataFromAPI = (name) => {
  let url =
    `https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=${apiKey}`
  return fetch(url)
    .then(response => response.json())
    .then(response => {
     // debugger
     return response.data.results[0]
    })
}