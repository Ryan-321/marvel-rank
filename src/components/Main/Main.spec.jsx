import React from 'react'
import { shallow } from 'enzyme'
import Main from './Main'

const defaultProps = {
  handleChange: () => {},
  handleDelete: () => {},
  handleClick: () => {},
  handleSubmit: () => {},
  value: '',
  characters: [],
  rank: [],
  selected: {},
  stats: [],
  loading: false,
  noData: false,
}

describe('Main', () => {
  it('stats displays depending on rank', () => {
    let wrapper = shallow(<Main {...defaultProps}/>)
    expect(wrapper.find('.statsContainer').length).toBe(0)

    const rankProps = {...defaultProps, rank: [3,6,9,12]}
    wrapper = shallow(<Main {...rankProps} />)
    expect(wrapper.find('.statsContainer').length).toBe(1)
  })
})