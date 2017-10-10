
export const createObject = (data) => {
  const obj = data.data.results[0];
  // todo better way to create this???
  const newObj = {};
  newObj['name'] = obj.name;
  newObj['bio'] = obj.description === '' ? 'None, thanks Marvel' : obj.description;
  newObj['imageSrc'] = `${obj.thumbnail.path}.${obj.thumbnail.extension}`;
  newObj['id'] = obj.id;
  newObj['comics'] = obj.comics.available;
  newObj['events'] = obj.events.available;
  newObj['series'] = obj.series.available;
  newObj['stories'] = obj.stories.available;
  newObj['wiki'] = obj.urls[1].url;
  return newObj;
}
export const rank = (characters) => {
  return characters.sort((a, b) => {
    const sumA = a['comics'] + a['events'] + a['series'] + a['stories'];
    const sumB = b['comics'] + b['events'] + b['series'] + b['stories'];
    return sumB - sumA
  });
}

export const extractStats = (character) => {
  const stats = [];
  const keys = ['comics', 'events', 'stories', 'series'];
  keys.forEach(key => stats.push(character[key]));
  return stats
}

export const updateCharacter = (state, character) => {
  const characters = state.characters.slice();
  characters.unshift(character);
  const characterRank = rank(characters);

  return {
    characters,
    rank: characterRank,
    selected: character,
  }
}

export const deleteCharacter = (state, id) => {
  const copy = state.characters.slice();
  const characters = copy.filter((c) => c.id !== id);
  const charRank = rank(characters);

  return {
    ...state,
    characters,
    rank: charRank,
  }
}

