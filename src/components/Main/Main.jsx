import React, { Component } from 'react'
import Form from '../../components/Form/Form'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../Character'
import Chart from '../Chart';
import Spinner from '../Spinner'
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
          />
          <div className='spinner'>
            { loading && <Spinner /> }
          </div>
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

export default Main