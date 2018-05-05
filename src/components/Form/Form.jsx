import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Spinner'
import './Form.css'

const Form = ({ handleSubmit, handleChange, value, loading }) => (
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit(value)}}>
      <label>Enter a character: </label>
      <input
        type='text'
        name='city_name'
        onChange={handleChange}
        value={value}
      />
      <button type='submit'>
        {loading ? <Spinner /> : 'Find'}
      </button>
    </form>
  )

export default Form

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.boolean,
};
