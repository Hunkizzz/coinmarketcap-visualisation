import React, { Component } from 'react';
// import 'chartjs-adapter-moment';
import { Chart as ChartJS } from 'chart.js/auto'
import { Api } from '../api/Api';
import Button from 'react-bootstrap/Button';
import { useKeycloak } from '@react-keycloak/web';
class CryptoChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.chart = null;
        this.state = {
            cryptoData: [],
        };
    }
    

    componentDidMount() {
        this.fetchCryptoData(this.props.match.params.name, this.props.token);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
            this.fetchCryptoData(this.props.match.params.name, this.props.token);
        }
    }

    fetchCryptoData(name, token) {
        Api.getSingleCryptoCurrency(name, token)
            .then((response) => {
                const cryptoData = response.data;
                this.setState({ cryptoData }, () => {
                    this.updateChart();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleUpdate = (name, token) => {
        this.fetchCryptoData(name, token);
    };

    updateChart() {
        const { cryptoData } = this.state;

        // Group the data by name instead of ID
        const groupedData = cryptoData.reduce((accumulator, currentValue) => {
            const name = currentValue.name;
            if (!accumulator[name]) {
                accumulator[name] = [];
            }
            accumulator[name].push(currentValue);
            return accumulator;
        }, {});

        // Sort each group by insertDate
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
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Generate a random color
                };

                group.forEach((d) => {
                    const date = new Date(d.insertDate);
                    currencyData.data.push({ x: date, y: d.price });
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
            this.chart = new ChartJS(this.chartRef.current, {
                type: 'line',
                data: chartData,
                options: options,
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Cryptocurrency Chart</h2>
                    <canvas ref={this.chartRef} />
                </div>
                <div>
                    <>
                        <Button variant="info" size="lg" onClick={() => this.handleUpdate(this.props.match.params.name, this.props.token)}>
                            Обновить
                        </Button>
                    </>
                </div>
            </div>
        );
    }
}

export default CryptoChart;