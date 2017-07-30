import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'

const Form = ({handleSubmit, handleChange}) => {
  return (
    <form className='Form' onSubmit={handleSubmit}>
      <label className='Form--label'>Enter a character: </label>
      <input
        type='text'
        name='city_name'
        className='Form--input'
        onChange={handleChange}
      />
      <button type='submit' className='Form--btn'>Find</button>
    </form>
  )
};

export default Form

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
