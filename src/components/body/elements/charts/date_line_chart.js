import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';
import PropTypes from 'prop-types';
// import BnDate from '../../../../util/bn_date';

export default class DateLineChart extends Component {
  /*
  static getTickValues(data) {
    // console.log(data)
    const tickArray = [];
    // First sort the data array by date
    const sortedData = data.slice().sort((a, b) => {
      if (a.x < b.x) {
        return -1;
      } else if (a.x > b.x) {
        return 1;
      }
      return 0;
    });
    // const diff = BnDate.diffDate(sortedData[0].x, data[sortedData.length-1].x)
    // console.log(diff)

    if (diff[0] > 0) {

    }

    return tickArray
  }
  */

  static getStyles() {
    const BLUE_COLOR = '#00a3de';
    // const RED_COLOR = "#7c270b";

    return {
      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: 'black', strokeWidth: 1 },
        ticks: {
          size: (tick) => {
            const tickSize =
              tick.getDay() === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: 'black',
          strokeWidth: 1,
        },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 6,
          padding: 2,
        },
      },

      // DATA SET ONE
      axisOne: {

        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 6,
        },
      },
    };
  }

  render() {
    // const styles = this.getStyles();
    // const tickValues = this.getTickValues(this.props.data);

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        height={100}
        domainPadding={{ x: 0, y: 5 }}
        padding={{ left: 20, right: 20, top: 10, bottom: 40 }}
      >

        <VictoryAxis
          scale="time"
          standalone={false}
          style={DateLineChart.getStyles().axisYears}
          tickFormat={
            (x) => {
              const tick = `${x.getMonth() + 1}/${x.getDate()}/${String(x.getFullYear()).slice(-2)}`;
              return tick;
            }
          }
        />
        <VictoryAxis
          dependentAxis
          scale="linear"
          offsetX={30}
          orientation="left"
          standalone={false}
          style={DateLineChart.getStyles().axisOne}
        />

        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          data={this.props.data}
        />
      </VictoryChart>
    );
  }
}

DateLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.object.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
};
