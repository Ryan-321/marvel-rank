import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from '../../components/Form/Form'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../../components/Character/index'
import Chart from '../../components/Chart/index';
import {
  deleteCharacter,
  getCharacter,
  getStats,
  setSearchTerm,
  setValue
} from '../../actionCreators'
import { createObject } from '../../utils/characterHelper'
import apiKey from '../../secret'
import './Main.css'

class Main extends Component {
  componentDidMount () {
    this.props.loadStats(this.props.selected);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.callMarvel(nextProps.value)
    }
    if (this.props.selected !== nextProps.selected) {
      this.props.loadStats(nextProps.selected);
    }
  }

  render () {
    const {
      handleSubmit,
      handleChange,
      handleDelete,
      handleClick,
      value,
      characters,
      rank,
      selected,
      stats,
    } = this.props

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
          {
            rank.length !== 0 &&
            <div className='StatsContainer'>
              <div className='StatsContainer-rank'>
                <h3 className='StatsContainer--h3'>Ranking</h3>
                <ul>
                  {rank.map(({imageSrc, name, id}) => {
                    return <li
                      className='StatsContainer--li'
                      key={id}
                      onClick={() => handleClick(id)}
                    >
                      <img src={imageSrc} alt={name} />
                      <p>{name}</p>
                    </li>
                  })}
                </ul>
              </div>
              <div className='StatsContainer-stats'>
                <h3 className='StatsContainer--h3'>{selected.name}</h3>
                <Chart data={stats} />
              </div>
            </div>
          }
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
  stats: state.statsReducer.stats,
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
  loadStats: (selected) => {
    dispatch(getStats(selected))
  },
  handleClick: (id) => {
    const { rank } = this.props;
    const index = rank.map(r => r.id).indexOf(id);
    const selected = rank[index];
    dispatch(getStats(selected))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)