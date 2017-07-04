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

  componentDidMount () {
    const selected = this.props.selected
    const stats = characterHelper.getStats(selected)
    console.log('stats', stats)
    this.setState({selected, stats})
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    console.log(this.props)
    if (this.props.selected !== nextProps.selected) {
      const selected = nextProps.selected
      const stats = characterHelper.getStats(selected)
      console.log('stats', stats)
      console.log('selected', selected)
      this.setState({selected, stats})
    }
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
    const { stats } = this.state
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
          <Stats data={stats} />
        </div>
      </div>
    )
  }
}

export default StatsContainer

StatsContainer.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.objects)
}
