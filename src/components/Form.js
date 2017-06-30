import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Form.css'

class Form extends Component {
  render () {
    const {handleSubmit, handleChange} = this.props
    return (
      <form className='Form' onSubmit={handleSubmit}>
        <label>City: </label>
        <input type='text' name='city_name' onChange={handleChange} />
        <button type='submit' className='Form--btn'>Submit</button>
      </form>
    )
  }
}

export default Form

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
