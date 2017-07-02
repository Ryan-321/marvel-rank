import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './StatsContainer.css'

class StatsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    const { rank } = this.props
    const index = rank.map(r => r.id).indexOf(id)
    const selected = rank[index]
    this.setState({selected})
    // TODO need to display stats w/ d3! Can do inside lifecycle method of child
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
          {/* make a new component called Selected to display data w/ d3 */}
        </div>
      </div>
    )
  }
}

export default StatsContainer

StatsContainer.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.objects)
}
