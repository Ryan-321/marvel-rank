import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../components/Character'
import StatsContainer from './StatsContainer'
import { rank } from '../utils/characterHelper'
import { callMarvel, setSearchTerm, setValue } from '../actionCreators'
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
      console.log('newValue', nextProps.value)
      callMarvel(nextProps.value)
    }
  }

  handleDelete (id) {
    const oldState = this.state.characters;
    const newState = oldState.filter(character => character.id !== id);
    const copy = JSON.parse(JSON.stringify(newState));
    const rank = rank(copy);
    this.setState({characters: newState, rank: rank})
  }

  render () {
    const { characters, rank, selected } = this.state;
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
  data: state.data
})

const mapDispatchToProps = (dispatch) => ({

  handleChange: (e) => {
    dispatch(setValue(e.target.value))
  },
  handleSubmit: (e) => {
    e.preventDefault();
    dispatch(setSearchTerm())
  }
})



export default connect(mapStateToProps)(CharacterContainer)

CharacterContainer.propTypes = {
  value: PropTypes.string.isRequired
};

