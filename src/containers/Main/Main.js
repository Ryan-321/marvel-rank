import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from '../../components/Form/Form'
import CharacterContainer from '../CharacterContainer/CharacterContainer'
import { setSearchTerm, setValue } from '../../actionCreators'

import './Main.css'

class Main extends Component {
  render () {
    const { searchTerm, handleSubmit, handleChange, value } = this.props;
    return (
      <main className='Main'>
        <section className='Main--section'>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            value={value}
          />
        </section>
        <CharacterContainer value={searchTerm} />
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  searchTerm: state.mainReducer.searchTerm,
  value: state.mainReducer.value,
})

const mapDispatchToProps = (dispatch) => ({

  handleChange: (e) => {
    dispatch(setValue(e.target.value))
  },
  handleSubmit: (e) => {
    e.preventDefault();
    dispatch(setSearchTerm())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)