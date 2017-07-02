/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from '../components/Character'
import StatsContainer from './StatsContainer'
import characterHelper from '../utils/characterHelper'
import apiKey from '../secret'
import './CharacterContainer.css'

class CharacterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      characters: [],
      rank: []
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
          const copy = JSON.parse(JSON.stringify(newState)) // TODO dig into why this works
          const rank = characterHelper.rank(copy)
          this.setState({characters: newState, value: '', rank: rank})
        } else {
          // TODO Need to let the user know no results came back
        }
      })
    }
  }

  handleDelete (id) {
    const characters = this.state.characters
    const newState = characters.filter(character => character.id !== id)
    this.setState({characters: newState})
  }

  render () {
    const { characters, rank } = this.state
    return (
      <div className='CharacterContainer'>
        <section className='CharacterContainer--ranks'>
          <StatsContainer rank={rank} />
        </section>
        <section className='CharacterContainer--list'>
          {characters.map(({imageSrc, name, bio, id, wiki}) => {
            return <Character
              imageSrc={imageSrc}
              name={name}
              bio={bio}
              key={id}
              index={id}
              handleDelete={this.handleDelete}
              wiki={wiki}
            />
          })}
        </section>
      </div>
    )
  }
}

export default CharacterContainer

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
}
