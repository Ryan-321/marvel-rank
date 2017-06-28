import React, { Component } from 'react'
import Form from './Form'
import './Main.css'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    console.log(this.state.value)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('handleSubmit', this.state.value)
  }

  render () {
    return (
      <main>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {/* map out the objects I get returned here */}
      </main>
    )
  }
}

export default Main
