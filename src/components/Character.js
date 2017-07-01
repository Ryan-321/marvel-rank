import React from 'react'
import PropTypes from 'prop-types'
import './Character.css'

const Character = ({name, bio, imageSrc, index, handleDelete, wiki}) => {
  return (
    <div className='Character' id={index}>
      <img src={imageSrc} alt={name} className='Character--img' />
      <h2 className='Character--name'>{name}</h2>
      <p className='Character--bio'><span>Bio:</span> {bio}</p>
      <a
        href={wiki}
        target='_blank'
        className='Character--link'
        rel='noopener noreferrer'>
          learn more
        </a>
      <span
        className='Character--delete'
        onClick={() => handleDelete(index)}
      />
    </div>
  )
}

export default Character

Character.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
}
