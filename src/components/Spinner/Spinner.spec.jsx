import React from 'react'
import { shallow } from 'enzyme'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('Smoke Test', () => {
    shallow(<Spinner />)
  })
})
