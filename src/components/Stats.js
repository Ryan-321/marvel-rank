import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'  // destructor

class Stats extends Component {
  constructor (props) {
    super(props)
    this.createChart = this.createChart.bind(this)
  }

  componentDidMount () {
    this.createChart()
  }

  componentDidUpdate () {
    this.createChart()
  }

  createChart () {
    const data = this.props.data || []
    const node = this.node
    console.log('node', node)
    const dataMax = d3.max(data)
    const yScale = d3.scaleLinear()
      .domain([0, dataMax])
      .range([0, 500])

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove()

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', 'magenta')
      .attr('y', (d, i) => i * 25)
      .attr('x', d => 500 - yScale(d))
      .attr('height', 25)
      .attr('width', d => yScale(d))
  }

  render () {
    return (
      <svg
        width={700}
        height={150}
        ref={node => this.node = node}
      />
    )
  }
}

export default Stats

Stats.propTypes = {

}
