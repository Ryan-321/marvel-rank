import React from 'react'
import PropTypes from 'prop-types'
import './Form.css'

const Form = ({handleSubmit, handleChange, value}) => (
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit(value)}}>
      <label>Enter a character: </label>
      <input
        type='text'
        name='city_name'
        onChange={handleChange}
        value={value}
      />
      <button type='submit'>Find</button>
    </form>
  )

export default Form

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
