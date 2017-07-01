import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './StatsContainer.css'

class StatsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { rank } = this.props
    return (
      <div className='StatsContainer'>
        <div>
          <ol>
            {rank.map(({imageSrc, name, id}) => {
              return <li className='StatsContainer--li' key={id}>
                <p><img src={imageSrc} alt={name} /> {name}</p>
              </li>
            })}
          </ol>
        </div>
        {/* how to do d3 in react? - on click, show bar chart with stats*/}
      </div>
    )
  }
}

export default StatsContainer

StatsContainer.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.objects)
}
