var client = require('../client');
import React from 'react';
import ReactDOM from 'react-dom';
import ActivityList from './ActivityList.jsx'
import DisplayOptionsMenu from './DisplayOptionsMenu.jsx'

class CohortsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            particlesLoaded: false,
            analyticView: 'cohort',
            selectedCohort: false,
            phase: false,
            week: false,
            day: false,
        };
        this.updateAnalytics = this.updateAnalytics.bind(this);
        this.pickPhaseDay = this.pickPhaseDay.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setAnalyticView = this. setAnalyticView.bind(this);
        this.getActivitiesForAllCohorts = this.getActivitiesForAllCohorts.bind(this);
        this.pickCohort = this.pickCohort.bind(this);
        this.loadCohortsFromServer = this.loadCohortsFromServer.bind(this);
        this.loadParticles = this.loadParticles.bind(this);
    }

    updateAnalytics() {
        let options = {
            phase: this.state.phase,
            week: this.state.week,
            day: this.state.day,
            cohort: this.state.selectedCohort
        };
        let readyOptions = _.pickBy(options, _.identity);

        client.getActivitiesByQuery(readyOptions, (activities) => {
            if (this.state.analyticView == 'cohort') {
                this.setState({activities: _.groupBy(activities, 'cohort')})
            } else {
                this.setState({activities: _.groupBy(activities, '_user.email')})
            }

        });

    }

    pickPhaseDay(phaseOptions) {
        this.setState({phase: phaseOptions.phase, week: phaseOptions.phaseWeek, day: phaseOptions.phaseDay})
        this.updateAnalytics();

    }


    componentDidMount() {
        this.loadCohortsFromServer();
    }


    setAnalyticView(type) {
        this.setState({analyticView: type});
        this.getActivitiesForAllCohorts();
    }

    getActivitiesForAllCohorts() {
        this.setState({selectedCohort: false});
        this.updateAnalytics();
    }


    pickCohort(cohort) {
        this.setState({analyticView: 'students', selectedCohort: cohort});
        this.updateAnalytics();
    }


    loadCohortsFromServer() {
        client.getFurthestActivities((activities) => {
                this.setState({activities: _.groupBy(activities, '_user.email')})
                if (activities.length != this.state.activities.length) {
                    this.loadParticles();
                }
            }
        )
    }


    loadParticles() {
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
        if (!this.state.particlesLoaded) {
            particlesJS.load('particles-js', 'public/assets/particles.json', function () {

            });
            this.setState({particlesLoaded: true})
        }
    }

    render() {
        const lists = [];

        let i = 0;

        _.forIn(this.state.activities, (activities, person) => (
            i += 1,
                lists.push(
                    <ActivityList key={person} activities={activities} el_id={i}
                                  user={activities[0]._user} person={person}
                    />)
        ));

        return (
            <div>
                <DisplayOptionsMenu pickPhaseDay={this.pickPhaseDay} setAnalyticViewType={this.setAnalyticView}
                                    pickCohort={this.pickCohort}/>
                {this.state.analyticView}
                <div className="ui three column doubling stackable grid" style={{margin:'auto'}}>
                    {lists}
                </div>
            </div>)

    }
};

ReactDOM.render(
    <CohortsDashboard />,
    document.getElementById('content')
);
