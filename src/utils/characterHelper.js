
export const createCharacter = (data) => new Character(data)

function Character (data) {
  this.name = data.name
  this.bio = data.description === '' ? 'None, thanks Marvel' : data.description
  this.imageSrc = `${data.thumbnail.path}.${data.thumbnail.extension}`
  this.id = data.id
  this.comics = data.comics.available
  this.events = data.events.available
  this.series = data.series.available
  this.stories = data.stories.available
  this.wiki = data.urls[1].url
}

export const rank = (characters) => {
  return characters.sort((a, b) => {
    const sumA = a['comics'] + a['events'] + a['series'] + a['stories'];
    const sumB = b['comics'] + b['events'] + b['series'] + b['stories'];
    return sumB - sumA
  });
}

export const extractStats = (character) => {
  const keys = ['comics', 'events', 'stories', 'series'];
  return keys.map(key => character[key]);
}

