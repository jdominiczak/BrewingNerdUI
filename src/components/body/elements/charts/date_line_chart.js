import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory';
import BnDate from '../../../../util/date'

export default class DateLineChart extends Component {
  render() {
    const styles = this.getStyles();
    //const tickValues = this.getTickValues(this.props.data);

      return (
      <VictoryChart
        theme={VictoryTheme.material}
        height={100}
        domainPadding={{x:0, y:5}}
        padding={{ left:20, right:20, top:10, bottom:40}} >

          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears}

            tickFormat={
              (x) => {
                return (x.getMonth() + 1) + "/" + x.getDate() + "/" + String(x.getFullYear()).slice(-2);

              }
            }
          />
          <VictoryAxis dependentAxis

            scale="linear"
            offsetX={30}
            orientation="left"
            standalone={false}
            style={styles.axisOne}
          />

          <VictoryLine
            style={{
              data: { stroke: "#c43a31"},
              parent: { border: "1px solid #ccc"},
            }}
            data={this.props.data}
          />
        </VictoryChart>
      )
  }

  getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";

    return {
      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize =
              tick.getDay() === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 6,
          padding: 2
        }
      },

      // DATA SET ONE
      axisOne: {

        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 6
        }
      }
    };
  }

  getTickValues(data) {
    //console.log(data)
    let tickArray = []
    // First sort the data array by date
    let sortedData = data.slice().sort(function(a, b) {
      return a.x<b.x ? -1 : a.x>b.x ? 1 : 0;
    });
    let diff = BnDate.diffDate(sortedData[0].x, data[sortedData.length-1].x)
    //console.log(diff)
    if (diff[0] > 0) {

    }

    return tickArray
  }

}
