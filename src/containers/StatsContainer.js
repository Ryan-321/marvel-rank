import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StatsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        {/* how to do d3 in react? */}
      </div>
    )
  }
}

export default StatsContainer

StatsContainer.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.objects)
}
