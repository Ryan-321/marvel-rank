/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from '../components/Character'
import characterHelper from '../utils/characterHelper'
import apiKey from '../secret'
import './CharacterContainer.css'

class CharacterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      characters: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      let url = `https://gateway.marvel.com:443/v1/public/characters?name=${nextProps.value}&apikey=${apiKey}`
      fetch(url).then((response) => {
        return response.json()
      }).then((res) => {
        console.log('response', res)
        if (res.data.count === 1) {
          const obj = characterHelper.createObject(res)
          let newState = this.state.characters
          newState.unshift(obj)
          this.setState({characters: newState})
        } else {
          // TODO Need to let the user know no results came back
        }
      })
    }
  }

  handleDelete (id) {
    const characters = this.state.characters
    let newState = characters.filter(character => character.id !== id)
    this.setState({characters: newState})
  }

  render () {
    const { characters } = this.state
    return (
      <section className='CharacterContainer'>
        {characters.map(({imageSrc, name, bio, id}) => {
          return <Character
            imageSrc={imageSrc}
            name={name}
            bio={bio}
            key={id}
            index={id}
            handleDelete={this.handleDelete}
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
