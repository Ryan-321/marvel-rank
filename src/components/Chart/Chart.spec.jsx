import React from 'react'
import { shallow } from 'enzyme'
import Chart from './Chart'

describe('Chart', () => {
  it('Smoke Test', () => {
    shallow(<Chart data={[1,2,3,4]} />)
  })
})