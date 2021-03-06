import React, { Component } from 'react'
import pt from 'prop-types'
import Form from '../Form/Form'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../Character'
import Chart from '../Chart';
import { Charactertype } from '../../types'
import './Main.css'

class Main extends Component {
  render () {
    const {
      handleChange,
      handleDelete,
      handleClick,
      handleSubmit,
      value,
      characters,
      rank,
      selected,
      stats,
      loading,
      noData,
    } = this.props

    const statsContainer = rank.length > 0 ?
      (
        <div className='statsContainer'>
          <div className='rank'>
            <h3>Ranking</h3>
            <ul>
              {rank.map(({imageSrc, name, id}) => {
                return <li
                  key={id}
                  onClick={(e) => {e.preventDefault(); handleClick(id)}}
                >
                  <img src={imageSrc} alt={name} />
                  <p>{name}</p>
                </li>
              })}
            </ul>
          </div>
          <div>
            <h3>{selected.name}</h3>
            <Chart data={stats} />
          </div>
        </div>
      ) : ''


    return (
      <main>
        <div className='form'>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            value={value}
            loading={loading}
            noData={noData}
          />
        </div>
        <div className='characterContainer'>
          { statsContainer }
          <div className='characterContainer--list'>
            <CSSTransitionGroup
              className='characterContainer-transitions'
              transitionName='transition-cards'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {
                characters &&
                  characters.map(({imageSrc, name, bio, id, wiki}) =>
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
          </div>
        </div>
      </main>
    )
  }
}

Main.propTypes = {
  handleChange: pt.func.isRequired,
  handleDelete: pt.func.isRequired,
  handleClick: pt.func.isRequired,
  handleSubmit: pt.func.isRequired,
  value: pt.string.isRequired,
  loading: pt.bool.isRequired,
  noData: pt.bool.isRequired,
  characters: pt.arrayOf(Charactertype),
  rank: pt.arrayOf(Charactertype),
  selected: Charactertype,
  stats: pt.arrayOf(pt.number),
}

Main.defaultProps = {
  characters: [],
  rank: [],
  selected: {},
  stats: [],
}

export default Main