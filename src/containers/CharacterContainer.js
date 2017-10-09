import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import apiKey from './../secret'
import { createObject } from './../utils/characterHelper'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../components/Character'
import StatsContainer from './StatsContainer'
import { rank } from '../utils/characterHelper'
import { getCharacter, setSearchTerm, setValue } from '../actionCreators'
import './CharacterContainer.css'

class CharacterContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      characters: [],
      rank: [],
      selected: {}
    };
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.callMarvel(nextProps.value)
    }
  }

  handleDelete (id) {
    // todo need to move this into redux
    const oldState = this.state.characters;
    const newState = oldState.filter(character => character.id !== id);
    const copy = JSON.parse(JSON.stringify(newState));
    const rank = rank(copy);
    this.setState({characters: newState, rank: rank})
  }

  render () {
    const { characters, rank, selected } = this.props;
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

const mapStateToProps = (state) => ({
  value: state.mainReducer.searchTerm,
  characters: state.characterReducer.characters,
  rank: state.characterReducer.rank,
  selected: state.characterReducer.selected,

})

const mapDispatchToProps = (dispatch) => ({
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
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
};

