import React, { Component } from "react";
import Chart from "react-apexcharts";

class TideChart extends Component {
  generateSeries = () => {
    return [
      {
        name: this.props.name,
        data: this.props.tideLevel
      }
    ];
  };

  generateOptions = () => {
    const time = this.props.time.map(timeStamp => {
      return timeStamp.split(" ").join("T") + ":00.000Z";
    });
    return {
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: time
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  };

  render() {
    return (
      <div className="tideChart">
        <Chart
          options={this.generateOptions()}
          series={this.generateSeries()}
          type="area"
          width="800"
        />
      </div>
    );
  }
}

export default TideChart;
