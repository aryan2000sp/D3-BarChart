import React from 'react';
import './style.css';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const svgHeight = 200;
const svgWidth = 200;
const barPaddings = 5;

export default function App() {
  // A ref for the svg
  const svgRef = useRef(null);

  // Store the input data state from text fields.
  const [data, setData] = useState({
    data1: '',
    data2: '',
    data3: '',
  });

  // Store the chart data state.
  const [chartData, setChartData] = useState([
    { color: '#ff0000', chartData: 80 },
    { color: '#00ff00', chartData: 56 },
    { color: '#0000ff', chartData: 140 },
  ]);

  // Function the handle the submit
  const handleSubmit = (eventObject) => {
    eventObject.preventDefault();
    setChartData([
      { color: '#ff0000', chartData: parseInt(data.data1) },
      { color: '#00ff00', chartData: parseInt(data.data2) },
      { color: '#0000ff', chartData: parseInt(data.data3) },
    ]);
  };

  // Function to handle the form change
  const handleChange = (eventObject) => {
    const name = eventObject.target.name;
    const value = eventObject.target.value;

    setData({ ...data, [name]: value });
  };

  // Whenever chartData changed call this function
  useEffect(() => {
    let barWidth = svgWidth / chartData.length;

    const svg = d3
      .select(svgRef.current)
      .attr('height', svgHeight)
      .attr('width', svgWidth);

    svg
      .selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('width', barWidth - barPaddings)
      .attr('height', (d) => {
        return d.chartData;
      })
      .attr('y', (d) => {
        return svgHeight - d.chartData;
      })
      // This creates bars on different locations
      .attr('transform', (d, i) => {
        let translate = [barWidth * i, 0];
        return 'translate(' + translate + ')';
      })
      .attr('fill', (d) => {
        return d.color;
      });

    // Before updating the chart clear the all the rects in the svg
    return () => {
      svg.selectAll('rect').remove();
    };
  }, [chartData]);

  return (
    <main>
      <div className="form-div">
        <svg ref={svgRef}></svg>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            required
            className="textField"
            variant="outlined"
            label="Data 1"
            name="data1"
            type="number"
            value={data.data1}
            onChange={handleChange}
          />
          <TextField
            required
            className="textField"
            variant="outlined"
            label="Data 2"
            name="data2"
            type="number"
            value={data.data2}
            onChange={handleChange}
          />
          <TextField
            required
            className="textField"
            variant="outlined"
            label="Data 3"
            name="data3"
            type="number"
            value={data.data3}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="success">
            submit
          </Button>
        </form>
      </div>
    </main>
  );
}
