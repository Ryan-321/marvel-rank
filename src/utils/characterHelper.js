const characterHelper = {
  createObject: (data) => {
    const obj = data.data.results[0];
    // NOTE better way to create this???
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
    return newObj
  },
  rank: (characters) => {
    const newArr = characters.sort((a, b) => {
      const sumA = a['comics'] + a['events'] + a['series'] + a['stories'];
      const sumB = b['comics'] + b['events'] + b['series'] + b['stories'];
      return sumB - sumA
    });
    return newArr
  },
  getStats: (character) => {
    const stats = [];
    const keys = ['comics', 'events', 'stories', 'series'];
    keys.forEach(key => stats.push(character[key]));
    return stats
  }
};

export default characterHelper
