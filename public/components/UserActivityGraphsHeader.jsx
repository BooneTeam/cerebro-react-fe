import React from 'react';

class UserActivityGraphsHeader extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div id="person-data" className="ui top attached header person-data inverted"
                 data-title={this.props.person}
                 data-content={this.props.activities.length + " challenges"}>
                <h2>{this.props.person}</h2>
                <div className="ui icon buttons">
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('scale',true)}>
                        <i
                            className="bar chart icon"></i></button>
                    {/*<button className="ui button inverted blue " onClick={() => this.props.setGraphType('line',true)}>
                        <i
                            className="line chart icon"></i></button>*/}
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('pie',true)}>
                        <i
                            className="pie chart icon"></i></button>
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('list',true)}>
                        <i
                            className="list icon"></i></button>
                </div>
            </div>

        )
    }
}
;

export default UserActivityGraphsHeader;
