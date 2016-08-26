const CohortsDashboard = React.createClass({
    getInitialState: function () {

        return {
            activities: [],
            particlesLoaded: false,
            analyticView: 'cohort'
        }
    },
    componentDidMount: function () {
        this.loadCohortsFromServer();
    },
    setAnalyticView: function(type){
        this.setState({analyticView: type})
    },
    pickCohort: function(cohort){
        this.setState({analyticView: 'students'})
        console.log(cohort)
        let self = this;
        client.getFurthestActivitiesByCohort({cohort: cohort},function(activities) {
            console.log(activities)
                self.setState({activities: _.groupBy(activities, '_user.email')})
            })
    },
    loadCohortsFromServer: function () {
        client.getFurthestActivities((activities) => {
                // console.log(_.groupBy(activities, '_user.email')),
                this.setState({activities: _.groupBy(activities, '_user.email')})
                if (activities.length != this.state.activities.length) {
                    this.loadParticles();
                }
            }
        )
    },
    loadParticles: function () {
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
        if (!this.state.particlesLoaded) {
            particlesJS.load('particles-js', 'assets/particles.json', function () {
                console.log('callback - particles.js config loaded');
            });
            this.setState({particlesLoaded: true})
        }
    },
    render: function () {
        const lists = [];
        _.forIn(this.state.activities, (activities, person) => (
            lists.push(
                <ActivityList key={person} activities={activities}
                              user={activities[0]._user} person={person}
                />)
        ));
        return (
            <div>
                <DisplayOptionsMenu setAnalyticViewType={this.setAnalyticView} pickCohort={this.pickCohort}/>
                {this.state.analyticView}
                <div className="ui three column doubling stackable grid" style={{margin:'auto'}}>
                    {lists}
                </div>
            </div>)

    }
});

const ActivityList = React.createClass({
    getInitialState: function () {
        return {
            graphType: 'line',
            activities: []
        }
    },
    componentDidMount: function () {
        $('#content .person-data')
            .popup();
        console.log('here!')
        console.log(this.props.activities)
        // this.setState({activities: this.props.activities})
        // setInterval(() => {
        //     this.setGraphType(this.state.graphType, false)
        // }, 5000);

        // client.getFurthestActivities((activities) => {
        //         var newactivities = _.groupBy(activities, '_user.email');
        //         this.setState({activities: newactivities[this.props.person]})
        //     }
        // )
    },
    queryType: function (type, cb) {
        switch (type) {
            case 'line':
                return cb(client.getActivitiesByPerson({_user: this.state.activities[0]._user._id}));
            case 'scale':
                return cb(client.getActivitiesByPerson({_user: this.state.activities[0]._user._id}));
            case 'pie':
                return cb(client.getActivitiesByPerson({_user: this.state.activities[0]._user._id}));
            case 'list':
                return cb(client.getActivitiesByPerson({_user: this.state.activities[0]._user._id}));
        }

    },
    getNewStats: function (type, cb) {
        this.queryType(type, (data) => {
                data.then(function (activities) {
                    cb(activities);
                })
            }
        )
    },
    setGraphType: function (type, triggeredByUser) {
        this.getNewStats(type, (activities)=> {
            if (JSON.stringify(this.state.activities) != JSON.stringify(activities) || triggeredByUser) {
                this.setState({graphType: type, activities: activities});
            }

        })

    },
    render: function () {


        const activities = this.state.activities.map((activity) => (
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
                id={ this.props.person}
                activities={this.state.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;

        const doughnutGraph =
            <DoughnutGraph
                key={ this.props.person}
                id={ this.props.person}
                activities={this.state.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;


        const colorScaleGraph =
            <ColorScale
                key={ this.props.person}
                id={ this.props.person}
                activities={this.state.activities}
                user={ this.props.person|| {email: 'unknown'}}
            />;

        if (this.state.graphType == 'pie') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.state.activities}/>
                    <div>{doughnutGraph}</div>
                </div>
            )
        } else if (this.state.graphType == 'line') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.state.activities}/>
                    <div>{activitiesGraph}</div>
                </div>)
        } else if (this.state.graphType == 'scale') {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.state.activities}/>
                    <div>{colorScaleGraph}</div>
                </div>)
        } else {
            return (
                <div key={this.props.person} className="column">
                    <UserActivityGraphsHeader setGraphType={this.setGraphType}
                                              person={this.props.person}
                                              activities={this.state.activities}/>
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
    },
});

const DoughnutGraph = React.createClass({
    getInitialState: function () {
        console.log('in a doignut')
        return {name: 'doughnut'}
    },
    renderD3: function (id) {
        console.log(id)
        let dataSet = _.groupBy(this.props.activities, 'activity_type');
        let dataSetData = _.map(dataSet, function (obj) {
            return obj.length
        });
        console.log(_.keys(dataSet));
        console.log(dataSetData)
        let data = {
            labels: _.keys(dataSet),
            datasets: [
                {
                    data: dataSetData,
                    backgroundColor: [
                        "rgb(127, 255, 0)",
                        "rgb(237, 20, 61)",
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
        console.log(id + '  is the id')
        let myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
        });
    },
    componentDidUpdate: function () {
        this.renderD3(this.props.id + this.state.name);
    },
    componentDidMount: function () {
        this.renderD3(this.props.id + this.state.name);
    },
    render: function () {
        console.log(this.props.id)
        console.log(this.state.name)
        return (<canvas id={this.props.id + this.state.name}></canvas>)

        // this.renderD3(this.props.id + this.state.name)
        // Probably should check if canvas with id is on the page before just returning null

    }
});

const UserActivityGraphsHeader = React.createClass({
    componentDidMount(){

        // console.log(example)
    },
    render: function () {

        return (
            <div id="person-data" className="ui top attached header person-data inverted"
                 data-title={this.props.person}
                 data-content={this.props.activities.length + " challenges"}>
                <h2>{this.props.person}</h2>
                <div className="ui icon buttons">
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('area',true)}>
                        <i
                            className="area chart icon"></i></button>
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('scale',true)}>
                        <i
                            className="bar chart icon"></i></button>
                    <button className="ui button inverted blue " onClick={() => this.props.setGraphType('line',true)}>
                        <i
                            className="line chart icon"></i></button>
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
});

const ColorScale = React.createClass({
    getInitialState: function () {
        return {
            name: 'scale'
        }
    },
    componentDidUpdate: function () {
    },
    componentDidMount: function () {
        $('#content .challenge-block')
            .popup();

        //
        let data = this.props.activities;

        let total = data.length;
        let completed = _.filter(data, {activity_type: 'completed'}).length;
        let progress = $('.ui.progress');
        let percent = (completed / data.length) * 100;

        progress.progress('reset');
        progress.progress({
            percent: percent,
            duration: 1000,
            text: {
                active: false,
                error: false,
                success: false,
                warning: false,
                percent: 'Challenge Completion {percent}%',
                ratio: '{value} of {total}'
            }
        });


    },
    render: function () {

        let data = this.props.activities;


        let completed = _.filter(data, {activity_type: 'completed'}).length;
        let percent = (completed / data.length) * 100;
        switch (true) {
            case(percent >= 80):
                this.state.color = 'green';
                break;
            case(percent >= 50):
                this.state.color = 'yellow';
                break;
            case(percent <= 49):
                this.state.color = 'red';
                break;
            default:
                this.state.color = 'yellow';
        }

        console.log(this.state.color)

        const blocks = _.map(data, function (group, key) {
            return (<ChallengeBlock key={group.repo} repo={group.repo} activity_type={group.activity_type}/>
            )
        });
        console.log(this.props.user)
        return (
            <div>
                {blocks}
                <div className={"ui " + this.state.color + " inverted progress block-progress"}>
                    <div className="bar">
                        <div className="progress label">
                        </div>
                    </div>
                    <div className="label">Dates of 1-12-16 to 1-21-16</div>
                </div>
            </div>
        )

    }
});

const ChallengeBlock = React.createClass({
    blockColor: function () {
        let color;
        switch (this.props.activity_type) {
            case 'completed':
                color = "completed-block";
                break;
            case 'blocked':
                color = "blocked-block";
                break;
            case 'started':
                color = "started-block";
                break;
            default:
                color = "default-block";
                break;
        }
        return color
    },
    render: function () {
        return (  <div className={"challenge-block " + this.blockColor() }
                       data-title={this.props.repo}
                       data-content={this.props.activity_type}
        >
        </div>)
    }
});

const STATUS = {0: 'unknown', 1: 'started', 2: 'blocked', 3: 'completed'};

const ActivityGraph = React.createClass({
    getInitialState: function () {
        return {name: 'line'}
    },
    renderD3: function (id) {
        console.log(id)

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
                            callback: function (value, index, values) {
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
    },
    activityTypeToNum: function (activity) {
        return _.findKey(STATUS, function (key) {
            return key === activity.activity_type
        })
    },
    componentDidUpdate: function () {
        this.renderD3(this.props.id + this.state.name);
    },
    componentDidMount: function () {
        this.renderD3(this.props.id + this.state.name);
    },
    render: function () {
        console.log(<div>{this.props.id + this.state.name}</div>)
        return (<canvas id={this.props.id + this.state.name}></canvas>)
    }
});

const Activity = React.createClass({
    getInitialState: function () {
        return {}
    },
    getIcon: function () {
        let icon;
        console.log(this.props.type)
        switch (this.props.type) {
            case 'completed':
                icon = <i className="fa fa-check" aria-hidden="true"></i>
                break;
            case 'blocked':
                icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
                break;
            case 'started':
                icon = <i className="fa fa-plane" aria-hidden="true"></i>
                break;
            default:
                icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
                break;
        }
        return icon
    },
    render: function () {
        return (
            <tr>
                <td>
                    {this.getIcon()}
                </td>
                <td className="collapsing">
                    <i className="folder icon"></i> {this.props.challenge}
                </td>
                <td className="right aligned collapsing">{this.props.user.email}</td>
            </tr>
        )
    },
});

const RangeDatePicker = React.createClass({
    componentDidMount:function(){
        $('#rangestart').calendar({
            type: 'date',
            endCalendar: $('#rangeend')
        });
        $('#rangeend').calendar({
            type: 'date',
            startCalendar: $('#rangestart')
        });
    },
    render: function () {
        return (
            <div >
                <h3>Date Range</h3>
                <div className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <label>Start date</label>
                            <div className="ui calendar" id="rangestart">
                                <div className="ui input left icon">
                                    <i className="calendar icon"></i>
                                    <input type="text" placeholder="Start"></input>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>End date</label>
                            <div className="ui calendar" id="rangeend">
                                <div className="ui input left icon">
                                    <i className="calendar icon"></i>
                                    <input type="text" placeholder="End"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const CohortPicker = React.createClass({
    getInitialState: function(){
        return {
            content: [{title: 'aus-red-pandas-2016'}, {title: 'aus-squirrels-2016'}]
        }
    },
    componentDidMount: function(){
        $('.ui.search')
            .search({
                source: this.state.content,
                onSelect: (chosen) => (
                    this.props.pickCohort(chosen.title)
                )
            })
    },
    render: function(){
      return(
          <div className="ui search">
            <div className="ui icon input">
                <input className="prompt" type="text" placeholder="Search countries..."></input>
                <i className="search icon"></i>
            </div>
            <div className="results"></div>
        </div>)
    }
});

const DisplayOptionsMenu = React.createClass({
    getInitialState: function(){
        return {
            isOpen:false,
        }
    },
    toggleCohortView: function(){
        this.props.setAnalyticViewType('cohort')
    },
    toggleSettings: function(){
      this.setState({ isOpen:!this.state.isOpen })
    },
    render: function () {
        return (
            <div>
                <button className="ui inverted button"><i onClick={this.toggleSettings} className="settings icon"></i></button>
                <button className="ui inverted button"><i onClick={this.toggleCohortView} className="cubes icon"></i></button>
            <div style={{display: this.state.isOpen ? '' : 'none'}}>
                <CohortPicker pickCohort={this.props.pickCohort}/>
            <RangeDatePicker />
        </div></div> )
    }
});

ReactDOM.render(
    <CohortsDashboard />,
    document.getElementById('content')
);
