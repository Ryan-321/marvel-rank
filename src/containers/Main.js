import React, { Component } from 'react'
import Form from '../components/Form'
import CharacterContainer from './CharacterContainer'
import './Main.css'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({search: this.state.value})
  }

  render () {
    const { search } = this.state
    return (
      <main>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <CharacterContainer value={search} />
      </main>
    )
  }
}

export default Main
