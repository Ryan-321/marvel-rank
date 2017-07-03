import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from '../components/Stats'
import characterHelper from '../utils/characterHelper'
import './StatsContainer.css'

class StatsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {},
      stats: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    const { rank } = this.props
    const index = rank.map(r => r.id).indexOf(id)
    const selected = rank[index]
    const stats = characterHelper.getStats(selected)
    console.log('stats', stats)
    this.setState({selected, stats})
  }

  render () {
    const { rank } = this.props
    return (
      <div className='StatsContainer'>
        <div className='StatsContainer-rank'> {/* NOTE make inline */}
          <ol>
            {rank.map(({imageSrc, name, id}) => {
              return <li
                className='StatsContainer--li'
                key={id}
                onClick={() => this.handleClick(id)}
              >
                <p><img src={imageSrc} alt={name} /> {name}</p>
              </li>
            })}
          </ol>
        </div>
        <div className='StatsContainer-stats'>
          <Stats data={this.state.stats} />
        </div>
      </div>
    )
  }
}

export default StatsContainer

StatsContainer.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.objects)
}
