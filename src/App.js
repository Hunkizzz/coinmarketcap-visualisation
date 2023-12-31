import React, { Component } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from "axios";

class CryptoChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoData: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8095/coinmarketcap/api/crypto')
      .then((response) => {
        this.setState({ cryptoData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

componentDidUpdate() {
  const { cryptoData } = this.state;

  // group the data by name instead of ID
  const groupedData = cryptoData.reduce((accumulator, currentValue) => {
    const name = currentValue.name;
    if (!accumulator[name]) {
      accumulator[name] = [];
    }
    accumulator[name].push(currentValue);
    return accumulator;
  }, {});

  // sort each group by insertDate
  Object.values(groupedData).forEach((group) => {
    group.sort((a, b) => new Date(a.insertDate) - new Date(b.insertDate));
  });

  const chartData = {
    labels: Object.values(groupedData)[0].map((data) => {
      const date = new Date(data.insertDate);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }),
    datasets: Object.entries(groupedData).map(([name, group]) => {
      const currencyData = {
        label: name,
        data: [],
        fill: false,
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // generate a random color
      };

      group.forEach((d) => {
        const date = new Date(d.insertDate);
        currencyData.data.push({x: date, y: d.price});
      });

      return currencyData;
    }),
  };

  const options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            hour: 'MMM D, h:mm a',
          },
        },
        ticks: {
          source: 'data',
          autoSkip: true,
        },
      }],
      yAxes: [{
        ticks: {
          stepSize: 1,
        },
      }],
    },
    legend: {
      position: 'right',
    },
  };

  if (this.chart) {
    this.chart.data = chartData;
    this.chart.options = options;
    this.chart.update();
  } else {
    this.chart = new ChartJS('chart', {
      type: 'line',
      data: chartData,
      options: options,
    });
  }
}

  render() {
    return (
      <div>
        <h2>Cryptocurrency Chart</h2>
        <canvas id="chart" />
      </div>
    );
  }
}

export default CryptoChart;