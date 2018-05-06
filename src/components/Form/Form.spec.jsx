import React from 'react'
import { shallow } from 'enzyme'
import Form from './Form'

const defaultProps = {
  handleChange: () => {},
  handleSubmit: () => {},
  value: '',
  loading: false,
  noData: false,
}

describe('Form', () => {
  it('renders message if no characters', () => {
    const noDataProps = {...defaultProps, noData: true}
    const wrapper = shallow(<Form  {...noDataProps}/>)
    expect(wrapper.find('h4').text()).toEqual('No character found. Try again')
  })

  it('renders Spinner when loading', () => {
    const loadingProps = {...defaultProps, loading: true}
    const wrapper = shallow(<Form {...loadingProps} />)
    expect(wrapper.find('Spinner').length).toBe(1)
  })
})