import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'  // add destructor
import './Chart.css'

export default class Chart extends Component {
  componentDidUpdate () {
    this.createChart()
  }

  createChart = () => {
    const margin = {top: 20, right: 20, bottom: 10, left: 75};
    const width = 900 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const data = this.props.data;
    const node = this.refs.chart;

    const dataMax = d3.max(data);
    const xScale = d3.scaleLinear()
      .domain([0, dataMax])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(['Series', 'Stories', 'Events', 'Comics'])
      .range([height, 0]);

    const t = d3.transition()
      .duration(1000);

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .transition(t)
      .remove();

    d3.select(node)
      .selectAll('g')
      .data(data)
      .exit()
      .remove();

    d3.select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', 'rgba(181,15,22,.8)')
      .transition(t)
      .attr('x', margin.left)
      .attr('y', (d, i) => (yScale.bandwidth() * i) + 5)
      .attr('height', yScale.bandwidth() - 10)
      .attr('width', d => xScale(d))
      .attr('stroke', '#212121');

    let yAxis = d3.axisLeft()
      .scale(yScale);

    d3.select(node)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', 0)')
      .attr('class', 'Stats--axis')
      .call(yAxis);

    let xAxis = d3.axisBottom()
      .scale(xScale);

    d3.select(node)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + height + ')')
      .attr('class', 'Stats--axis')
      .call(xAxis)
  }

  render () {
    return (
      <svg width={900} height={200} ref={el => this.chart = el} />
    )
  }
}

Chart.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.number)
};
