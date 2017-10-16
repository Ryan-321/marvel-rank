import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Stats from '../../components/Stats/Stats'
import { getStats } from '../../actionCreators'
import './StatsContainer.css'

class StatsContainer extends Component {
  componentDidMount () {
    this.props.loadStats(this.props.selected);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.props.loadStats(nextProps.selected);
    }
  }

  render () {
    const { rank, stats, handleClick, selected } = this.props;
    return (
      <div className='StatsContainer'>
        <div className='StatsContainer-rank'>
          <h3 className='StatsContainer--h3'>Ranking</h3>
          <ul>
            {rank.map(({imageSrc, name, id}) => {
              return <li
                className='StatsContainer--li'
                key={id}
                onClick={() => handleClick(id)}
              >
                <img src={imageSrc} alt={name} />
                <p>{name}</p>
              </li>
            })}
          </ul>
        </div>
        <div className='StatsContainer-stats'>
          <h3 className='StatsContainer--h3'>{selected.name}</h3>
          <Stats data={stats} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { selected, rank } = state.characterReducer;
  const { stats } = state.statsReducer;

  return {
    selected,
    rank,
    stats
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadStats: (selected) => {
    dispatch(getStats(selected))
  },
  // pretty hacky, willing to deal with it on this size app
  handleClick: (id) => {
    const { rank } = this.props;
    const index = rank.map(r => r.id).indexOf(id);
    const selected = rank[index];
    dispatch(getStats(selected))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer)

StatsContainer.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.object
};
