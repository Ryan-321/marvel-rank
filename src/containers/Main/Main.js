import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from '../../components/Form/Form'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../../components/Character/Character'
import StatsContainer from '../StatsContainer/StatsContainer'
import { deleteCharacter, getCharacter, setSearchTerm, setValue } from '../../actionCreators'
import { createObject } from '../../utils/characterHelper'
import apiKey from '../../secret'
import './Main.css'

class Main extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.callMarvel(nextProps.value)
    }
  }

  render () {
    const {
      handleSubmit,
      handleChange,
      handleDelete,
      value,
      characters,
      rank,
      selected
    } = this.props
    console.log('rank', rank)
    return (
      <main className='Main'>
        <section className='Main--section'>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            value={value}
          />
        </section>
        <div className='character-container'>
          {rank.length && <StatsContainer rank={rank} selected={selected}/>}
          <section className='character-container--list'>
            <CSSTransitionGroup
              className='character-container-transitions'
              transitionName='transition-cards'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {characters.map(({imageSrc, name, bio, id, wiki}) =>
                <Character
                  imageSrc={imageSrc}
                  name={name}
                  bio={bio}
                  key={id}
                  index={id}
                  handleDelete={handleDelete}
                  wiki={wiki}
                />
              )}
            </CSSTransitionGroup>
          </section>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  searchTerm: state.mainReducer.searchTerm,
  value: state.mainReducer.value,
  characters: state.characterReducer.characters,
  rank: state.characterReducer.rank,
  selected: state.characterReducer.selected,
})

const mapDispatchToProps = (dispatch) => ({

  handleChange: (e) => {
    dispatch(setValue(e.target.value))
  },
  handleSubmit: (e) => {
    e.preventDefault()
    dispatch(setSearchTerm())
  },
  handleDelete: (id) => {
    dispatch(deleteCharacter(id))
  },
  callMarvel: (value) => {
    let url =
      `https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=${apiKey}`
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    }).then((res) => {
      if (res.data) {
        const character = createObject(res)
        dispatch(getCharacter(character))
      }
    }).catch((error) => {
      console.log(`ERROR: ${error.message}`)
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)