import apiKey from './secret'
import { createObject } from './utils/characterHelper'

export const setSearchTerm = () => ({
  type: 'SET_SEARCH_TERM'
})

export const setValue = (value) => ({
  type: 'SET_VALUE',
  payload: value,
})

export const callMarvel = (value) => {
  console.log('callMarvel w/', value)
  let url = `https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=${apiKey}`;
  const results = fetch(url).then((response) => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((res) => {
    let newCharacter;
    if (res.data === 1) {
      newCharacter = createObject(res);
    }
    return newCharacter;
  }).catch((error) => {
    console.log(`ERROR: ${error.message}`)
  })
  return { type: 'GET_CHARACTER', payload: results }
}