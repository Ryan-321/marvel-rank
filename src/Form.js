import React, { Component } from 'react'

class Form extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {handleSubmit, handleChange} = this.props
    return (
      <form className='Form'>
        <label>City: </label>
        <input type='text' name='city_name' onChange={handleChange} />
        <button type='button' onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default Form
