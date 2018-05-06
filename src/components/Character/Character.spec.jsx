import React from 'react'
import { shallow } from 'enzyme'
import Character from './Character'

const defaultProps = {
  name: 'Bob',
  bio: 'Builder',
  imageSrc: '',
  index: 1,
  wiki: '',
  handleDelete: () => {},
}

describe('Character', () => {
  it('Smoke Test', () => {
    shallow(<Character {...defaultProps} />)
  })
})