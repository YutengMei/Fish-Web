import React, { Component } from "react";
import Chart from "react-apexcharts";

class TideChart extends Component {
  generateSeries = () => {
    return [
      {
        name: "Solunar Hourly Rating",
        data: this.props.solunarRating
      }
    ];
  };

  generateOptions = () => {
    console.log("chart time", this.props.time);
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
        categories: this.props.time
      },
      tooltip: {
        x: {
          
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
