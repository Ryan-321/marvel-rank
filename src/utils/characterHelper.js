const characterHelper = {
  createObject: (data) => {
      const obj = data.data.results[0]
      const newObj = {}
      newObj['name'] = obj.name
      newObj['bio'] = obj.description === "" ? 'None, thanks Marvel' : obj.description
      newObj['imageSrc'] = `${obj.thumbnail.path}.${obj.thumbnail.extension}`
      newObj['id'] = obj.id
      return newObj
  }
}

export default characterHelper
