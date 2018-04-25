import React from 'react'
import PropTypes from 'prop-types'
import './Character.css'

const Character = ({name, bio, imageSrc, index, handleDelete, wiki}) => {
    return <div className='character' id={index}>
        <img src={imageSrc} alt={name} className='character--img'/>
        <h2 className='character--name'>{name}</h2>
        <p className='character--bio'><span>Bio:</span> {bio}</p>
        <a
            href={wiki}
            target='_blank'
            className='character--link'
            rel='noopener noreferrer'>
        </a>
        <span
            className='character--delete'
            onClick={() => handleDelete(index)}
        />
    </div>
};

export default Character

Character.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
};
