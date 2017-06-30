import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from '../components/Character'
import apiKey from '../secret'

class CharacterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      characters: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      let url = `https://gateway.marvel.com:443/v1/public/characters?name=${nextProps.value}&apikey=${apiKey}`
      fetch(url).then((response) => {
        return response.json()
      }).then((data) => {
        const obj = data.data.results[0]
        console.log(data.data.results[0])
        const objNew = {}
        objNew['name'] = obj.name
        objNew['bio'] = obj.description
        objNew['imageSrc'] = `${obj.thumbnail.path}.${obj.thumbnail.extension}`
        objNew['id'] = obj.id
        console.log(objNew)
        var newState = this.state.characters
        newState.unshift(objNew)
        this.setState({characters: newState})
      })
    }
  }

  render () {
    const { characters } = this.state
    return (
      <section>
        {characters.map((character) => {
          return <Character
            imageSrc={character.imageSrc}
            name={character.name}
            bio={character.bio}
            key={character.id}
          />
        })}
      </section>
    )
  }
}

export default CharacterContainer

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
}
