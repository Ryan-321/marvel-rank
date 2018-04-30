import { connect } from 'react-redux'
import Main from '../../components/Main'
import {
  marvelLoad,
  setValue,
  getCharacter,
  deleteCharacter,
} from '../../actionCreators'


const mapStateToProps = ({
  mainReducer: {
    value,
    characters,
    rank,
    selected,
    stats,
    loading,
}}) => ({
  value,
  characters,
  rank,
  selected,
  stats,
  loading,
})

const mapDispatchToProps = (dispatch) => ({

  handleChange: (e) => {
    dispatch(setValue(e.target.value))
  },
  handleDelete: (id) => {
    dispatch(deleteCharacter(id))
  },
  handleSubmit: (name) => {
    dispatch(marvelLoad(name));
  },
  handleClick: (id) => {
    dispatch(getCharacter(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)