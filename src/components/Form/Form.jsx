import React from 'react'
import pt from 'prop-types'
import Spinner from '../Spinner'
import './Form.css'

const Form = ({
  handleSubmit,
  handleChange,
  value,
  loading,
  noData,
}) => (
    <form
      onSubmit={(e) => {e.preventDefault(); handleSubmit(value)}}
      autoComplete='off'>
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
      {
        noData &&
        <h4>No character found. Try again</h4>
      }
    </form>
  )

export default Form

Form.propTypes = {
  handleChange: pt.func.isRequired,
  handleSubmit: pt.func.isRequired,
  value: pt.string.isRequired,
  loading: pt.bool.isRequired,
  noData: pt.bool.isRequired,
};
