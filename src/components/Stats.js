import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'  // destructor

class Stats extends Component {
  constructor (props) {
    super(props)
    this.createChart = this.createChart.bind(this)
  }

  componentDidUpdate () {
    this.createChart()
  }

  createChart () {
    const margin = {top: 20, right: 20, bottom: 20, left: 20}
    const width = 700 - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom

    const data = this.props.data
    const node = this.node
    console.log('node', node)

    const x = d3.scaleLinear().range([0, width])
    const y = d3.scaleBand().range([height, 0])
    const barHeight = 25
    const xAxis = d3.axisTop(x).ticks(10, '%')
    const yAxis = d3.axisLeft(y)

    const dataMax = d3.max(data)
    x.domain([0, dataMax])
    y.domain(['Comics', 'Events', 'Stories', 'Series']).padding(0.1)

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
      .attr('x', 0)
      .attr('y', (d, i) => barHeight * i)
      .attr('height', barHeight)
      .attr('width', d => x(d))
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
  stats: PropTypes.arrayOf(PropTypes.number)
}
