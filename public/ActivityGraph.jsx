var client = require('./client');
import React from 'react';

const STATUS = {0: 'unknown', 1: 'started', 2: 'blocked', 3: 'completed'};

class ActivityGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'line'
        };
    }

    renderD3(id) {

        let data = this.props.activities;
        let ctx = document.getElementById(id);
        let self = this;
        var chart = new Chart(ctx, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgba(190, 168, 25, 0.88)',
                            callback(value, index, values) {
                                return STATUS[value]
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgba(190, 168, 25, 0.88)',
                        }
                    }]
                }
            },
            data: {
                labels: _.map(data, function (obj) {
                    return obj.repo.substr(0, 5)
                }),
                datasets: [{
                    scaleOverride: true,
                    scaleSteps: 1,
                    scaleLabel: "<%=data[0]%>",
                    scaleStepWidth: Math.ceil(4 / 1),
                    label: "Challenge Completion",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: data.map(this.activityTypeToNum)
                }]
            }
        })
    }

    activityTypeToNum(activity) {
        return _.findKey(STATUS, function (key) {
            return key === activity.activity_type
        })
    }

    componentDidUpdate() {
        this.renderD3(this.props.id + this.state.name);
    }

    componentDidMount() {
        this.renderD3(this.props.id + this.state.name);
    }

    render() {
        return (<canvas id={this.props.id + this.state.name}></canvas>)
    }
}
;

export default ActivityGraph;