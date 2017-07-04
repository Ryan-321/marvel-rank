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
    const margin = {top: 20, right: 20, bottom: 50, left: 100}
    const width = 700 - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom

    const data = this.props.data
    const node = this.refs.chart
    console.log('node', node)

    const dataMax = d3.max(data)
    const xScale = d3.scaleLinear()
      .domain([0, dataMax])
      .range([0, width])

    const yScale = d3.scaleBand()
      .domain(['Series', 'Stories', 'Events', 'Comics'])
      .range([height, 0])

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
      .selectAll('g')
      .data(data)
      .exit()
      .remove()

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', 'magenta')
      .attr('x', margin.left)
      .attr('y', (d, i) => yScale.bandwidth() * i)
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(d))
      .attr('stroke', 'mediumseagreen')

    let yAxis = d3.axisLeft()
      .scale(yScale)

    d3.select(node)
      .append('g')
      .attr('transform', 'translate(100, 0)')
      .call(yAxis)

    let xAxis = d3.axisBottom()
      .scale(xScale)

    d3.select(node)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + height + ')')
      .call(xAxis)

  }

  render () {
    return (
      <svg width={700} height={200} ref='chart' />
    )
  }
}

export default Stats

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.number)
}
