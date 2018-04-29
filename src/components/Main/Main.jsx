import React, { Component } from 'react'
import Form from '../../components/Form/Form'
import { CSSTransitionGroup } from 'react-transition-group'
import Character from '../Character/index'
import Chart from '../Chart/index';
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
            rank.length > 0 &&
            <div className='StatsContainer'>
              <div className='StatsContainer-rank'>
                <h3 className='StatsContainer--h3'>Ranking</h3>
                <ul>
                  {rank.map(({imageSrc, name, id}) => {
                    return <li
                      className='StatsContainer--li'
                      key={id}
                      onClick={(e) => {e.preventDefault(); handleClick(id)}}
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
          </section>
        </div>
      </main>
    )
  }
}

export default Main