/* global fetch */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Character from '../components/Character'
import StatsContainer from './StatsContainer'
import characterHelper from '../utils/characterHelper'
import { CSSTransitionGroup } from 'react-transition-group'
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
        // console.log('response', res)
        if (res.data.count === 1) {
          const newCharacter = characterHelper.createObject(res)
          console.log('newCharacter', newCharacter)
          let state = this.state.characters
          state.unshift(newCharacter)
          const copy = JSON.parse(JSON.stringify(state)) // TODO investigate
          const rank = characterHelper.rank(copy)
          this.setState({characters: state, value: '', rank: rank})
        } else {
          // TODO Need to let the user know no results came back
        }
      })
    }
  }

  handleDelete (id) {
    const oldState = this.state.characters
    const newState = oldState.filter(character => character.id !== id)
    const copy = JSON.parse(JSON.stringify(newState))
    const rank = characterHelper.rank(copy)
    this.setState({characters: newState, rank: rank})
  }

  render () {
    const { characters, rank } = this.state
    return (
      <div className='CharacterContainer'>
        <section className='CharacterContainer--ranks'>
          <StatsContainer rank={rank} />
        </section>
        <section className='CharacterContainer--list'>
          <CSSTransitionGroup
            className='CharacterContainer-transitions'
            transitionName='transition-cards'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
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
          </CSSTransitionGroup>
        </section>
      </div>
    )
  }
}

export default CharacterContainer

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
}
