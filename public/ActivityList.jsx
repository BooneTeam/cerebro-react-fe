var client = require('./client');
import React from 'react';
import Activity from './Activity.jsx'
import ActivityGraph from './ActivityGraph.jsx'
import DoughnutGraph from './DoughnutGraph.jsx'
import ColorScale from './ColorScale.jsx'
import UserActivityGraphsHeader from './UserActivityGraphsHeader.jsx'

class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphType: 'scale',
            activities: []
        };
        this.getNewStats  = this.getNewStats.bind(this);
        this.setGraphType = this.setGraphType.bind(this);
        this.queryType    = this.queryType.bind(this);
    }

    componentDidMount() {
        $('#content .person-data')
            .popup();
    }

    queryType(type, cb) {
        switch (type) {
            case 'line':
                return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
            case 'scale':
                return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
            case 'pie':
                return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
            case 'list':
                return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
        }

    }

    getNewStats(type, cb) {
        this.queryType(type, (data) => {
                data.then(function (activities) {
                    cb(activities);
                })
            }
        )
    }

    setGraphType(type, triggeredByUser){
        this.getNewStats(type, (activities)=> {
            if (JSON.stringify(this.props.activities) != JSON.stringify(activities) || triggeredByUser) {
                this.setState({graphType: type, activities: activities});
            }
        })
    };

    render() {
        const activities = this.props.activities.map((activity) => (
            <Activity
                key={activity._id}
                type={activity.activity_type}
                challenge={activity.repo}
                user={activity._user || {email: 'unknown'}}
            />
        ));

        const activitiesGraph =
            <ActivityGraph
                key={ this.props.person}
                id={ this.props.el_id}
                activities={this.props.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;

        const doughnutGraph =
            <DoughnutGraph
                key={ this.props.person}
                id={ this.props.el_id}
                activities={this.props.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;


        const colorScaleGraph =
            <ColorScale
                key={ this.props.person}
                id={ this.props.el_id}
                activities={this.props.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;

        if (this.state.graphType == 'pie') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.props.activities}/>
                    <div>{doughnutGraph}</div>
                </div>
            )
        } else if (this.state.graphType == 'line') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.props.activities}/>
                    <div>{activitiesGraph}</div>
                </div>)
        } else if (this.state.graphType == 'scale') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.props.activities}/>
                    <div>{colorScaleGraph}</div>
                </div>)
        } else {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.props.activities}/>
                    <table className="ui attached segment celled striped table column">
                        <thead>
                        </thead>
                        <tbody>
                        {activities}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}
;

export default ActivityList;