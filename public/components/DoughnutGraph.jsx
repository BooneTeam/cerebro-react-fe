import React from 'react';

class DoughnutGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'doughnut'
        };
    }

    renderD3(id) {
        let keys = ['complete','blocked', 'started'];
        let dataSet = _.groupBy(this.props.activities, 'activity_type');
        let arrayOfDiffs = _.difference(keys,_.keys(dataSet));
        arrayOfDiffs.forEach(function(aKey){
            dataSet[aKey] = []
        });
        dataSet = _(dataSet).toPairs().sortBy(0).fromPairs().value();
        let dataSetData = _.map(dataSet, function (obj) {
            return obj.length
        });
        let data = {
            labels: _.keys(dataSet),
            datasets: [
                {
                    data: dataSetData,
                    backgroundColor: [
                        "rgb(237, 20, 61)",
                        "rgb(127, 255, 0)",
                        "rgb(255, 215, 0)"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };
        let ctx = document.getElementById(id);
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
        });
    }

    componentDidUpdate() {
        this.renderD3(this.props.id + this.state.name);
    }

    componentDidMount() {
        this.renderD3(this.props.id + this.state.name);
    }

    render() {


        return (<canvas id={this.props.id + this.state.name}></canvas>)

        // this.renderD3(this.props.id + this.state.name)
        // Probably should check if canvas with id is on the page before just returning null

    }
}
;

export default DoughnutGraph;
