import pt from 'prop-types'

export const Charactertype = pt.shape({
  bio: pt.string,
  imageSrc: pt.string,
  name: pt.string,
  wiki: pt.string,
  comics: pt.number,
  events: pt.number,
  series: pt.number,
  stories: pt.number,
  id: pt.number,
})