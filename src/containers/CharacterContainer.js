import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import apiKey from './../secret'
import { createObject } from './../utils/characterHelper'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../components/Character'
import StatsContainer from './StatsContainer'
import { getCharacter, deleteCharacter } from '../actionCreators'
import './CharacterContainer.css'

class CharacterContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.callMarvel(nextProps.value)
    }
  }

  render () {
    const { characters, rank, selected, handleDelete } = this.props;
    return (
      <div className='CharacterContainer'>
        <section className='CharacterContainer--ranks'>
          {rank.length > 0 && <StatsContainer rank={rank} selected={selected} />}
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
                handleDelete={handleDelete}
                wiki={wiki}
              />
            })}
          </CSSTransitionGroup>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  value: state.mainReducer.searchTerm,
  characters: state.characterReducer.characters,
  rank: state.characterReducer.rank,
  selected: state.characterReducer.selected,

})

const mapDispatchToProps = (dispatch) => ({
  //  todo this is messy, move somewhere else, use redux saga???
  callMarvel: (value) => {
    let url =
      `https://gateway.marvel.com:443/v1/public/characters?name=${value}&apikey=${apiKey}`;
    fetch(url).then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then((res) => {
      if (res.data) {
        const character = createObject(res);
        dispatch(getCharacter(character));
      }
    }).catch((error) => {
      console.log(`ERROR: ${error.message}`)
    })
  },
  handleDelete: (id) => {
    dispatch(deleteCharacter(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
};

