import React from 'react'
import PropTypes from 'prop-types'

const Character = ({name, bio, imageSrc}) => {
  return (
    <div className='Character'>
      <h2 className='Character--name'>{name}</h2>
      <img src={imageSrc} alt={name} className='Character--img' />
      <p className='Character--bio'>{bio}</p>
    </div>
  )
}

export default Character

Character.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
}
