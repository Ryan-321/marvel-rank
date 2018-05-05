import React from 'react'
import { shallow } from 'enzyme'
import Form from './Form'

const props = {
  handleChange: () => {},
  handleSubmit: () => {},
  value: '',
  loading: false,
  noData: true,
}

describe('Form', () => {
  it('renders message if no characters', () => {
    const wrapper = shallow(<Form {...props} />)
    expect(wrapper.find('h4').text()).toEqual('No character found. Try again')
  })
})