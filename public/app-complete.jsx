// // THIS FILE IS SHIT. IT WAS A COPY. COHORTSDASHBOARD IS WHERE ITS AT
//
// var client = require('./client');
// import React from 'react';
// import ReactDOM from 'react-dom';
//
// class ActivityList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             graphType: 'scale',
//             activities: []
//         };
//         this.getNewStats  = this.getNewStats.bind(this);
//         this.setGraphType = this.setGraphType.bind(this);
//         this.queryType    = this.queryType.bind(this);
//     }
//
//     componentDidMount() {
//         $('#content .person-data')
//             .popup();
//     }
//
//     queryType(type, cb) {
//         switch (type) {
//             case 'line':
//                 return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
//             case 'scale':
//                 return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
//             case 'pie':
//                 return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
//             case 'list':
//                 return cb(client.getActivitiesByPerson({_user: this.props.activities[0]._user._id}));
//         }
//
//     }
//
//     getNewStats(type, cb) {
//         this.queryType(type, (data) => {
//                 data.then(function (activities) {
//                     cb(activities);
//                 })
//             }
//         )
//     }
//
//     setGraphType(type, triggeredByUser){
//         this.getNewStats(type, (activities)=> {
//             if (JSON.stringify(this.props.activities) != JSON.stringify(activities) || triggeredByUser) {
//                 this.setState({graphType: type, activities: activities});
//             }
//         })
//     };
//
//     render() {
//         const activities = this.props.activities.map((activity) => (
//             <Activity
//                 key={activity._id}
//                 type={activity.activity_type}
//                 challenge={activity.repo}
//                 user={activity._user || {email: 'unknown'}}
//             />
//         ));
//
//         const activitiesGraph =
//             <ActivityGraph
//                 key={ this.props.person}
//                 id={ this.props.el_id}
//                 activities={this.props.activities}
//                 user={ this.props.person|| {email: 'unknown'}}
//             />;
//
//         const doughnutGraph =
//             <DoughnutGraph
//                 key={ this.props.person}
//                 id={ this.props.el_id}
//                 activities={this.props.activities}
//                 user={ this.props.person|| {email: 'unknown'}}
//             />;
//
//
//         const colorScaleGraph =
//             <ColorScale
//                 key={ this.props.person}
//                 id={ this.props.el_id}
//                 activities={this.props.activities}
//                 user={ this.props.person|| {email: 'unknown'}}
//             />;
//
//         if (this.state.graphType == 'pie') {
//             return (
//                 <div key={this.props.person} className="column">
//                     <UserActivityGraphsHeader setGraphType={this.setGraphType}
//                                               person={this.props.person}
//                                               activities={this.props.activities}/>
//                     <div>{doughnutGraph}</div>
//                 </div>
//             )
//         } else if (this.state.graphType == 'line') {
//             return (
//                 <div key={this.props.person} className="column">
//                     <UserActivityGraphsHeader setGraphType={this.setGraphType}
//                                               person={this.props.person}
//                                               activities={this.props.activities}/>
//                     <div>{activitiesGraph}</div>
//                 </div>)
//         } else if (this.state.graphType == 'scale') {
//             return (
//                 <div key={this.props.person} className="column">
//                     <UserActivityGraphsHeader setGraphType={this.setGraphType}
//                                               person={this.props.person}
//                                               activities={this.props.activities}/>
//                     <div>{colorScaleGraph}</div>
//                 </div>)
//         } else {
//             return (
//                 <div key={this.props.person} className="column">
//                     <UserActivityGraphsHeader setGraphType={this.setGraphType}
//                                               person={this.props.person}
//                                               activities={this.props.activities}/>
//                     <table className="ui attached segment celled striped table column">
//                         <thead>
//                         </thead>
//                         <tbody>
//                         {activities}
//                         </tbody>
//                     </table>
//                 </div>
//             )
//         }
//     }
// }
// ;
//
// class DoughnutGraph extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: 'doughnut'
//         };
//     }
//
//     renderD3(id) {
//         let dataSet = _.groupBy(this.props.activities, 'activity_type');
//         let dataSetData = _.map(dataSet, function (obj) {
//             return obj.length
//         });
//         let data = {
//             labels: _.keys(dataSet),
//             datasets: [
//                 {
//                     data: dataSetData,
//                     backgroundColor: [
//                         "rgb(127, 255, 0)",
//                         "rgb(237, 20, 61)",
//                         "rgb(255, 215, 0)"
//                     ],
//                     hoverBackgroundColor: [
//                         "#FF6384",
//                         "#36A2EB",
//                         "#FFCE56"
//                     ]
//                 }]
//         };
//         let ctx = document.getElementById(id);
//         let myDoughnutChart = new Chart(ctx, {
//             type: 'doughnut',
//             data: data,
//         });
//     }
//
//     componentDidUpdate() {
//         this.renderD3(this.props.id + this.state.name);
//     }
//
//     componentDidMount() {
//         this.renderD3(this.props.id + this.state.name);
//     }
//
//     render() {
//
//
//         return (<canvas id={this.props.id + this.state.name}></canvas>)
//
//         // this.renderD3(this.props.id + this.state.name)
//         // Probably should check if canvas with id is on the page before just returning null
//
//     }
// }
// ;
//
// class UserActivityGraphsHeader extends React.Component {
//     componentDidMount() {
//
//     }
//
//     render() {
//         return (
//             <div id="person-data" className="ui top attached header person-data inverted"
//                  data-title={this.props.person}
//                  data-content={this.props.activities.length + " challenges"}>
//                 <h2>{this.props.person}</h2>
//                 <div className="ui icon buttons">
//                     <button className="ui button inverted blue " onClick={() => this.props.setGraphType('scale',true)}>
//                         <i
//                             className="bar chart icon"></i></button>
//                     <button className="ui button inverted blue " onClick={() => this.props.setGraphType('line',true)}>
//                         <i
//                             className="line chart icon"></i></button>
//                     <button className="ui button inverted blue " onClick={() => this.props.setGraphType('pie',true)}>
//                         <i
//                             className="pie chart icon"></i></button>
//                     <button className="ui button inverted blue " onClick={() => this.props.setGraphType('list',true)}>
//                         <i
//                             className="list icon"></i></button>
//                 </div>
//             </div>
//
//         )
//     }
// }
// ;
//
// class ColorScale extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: 'scale'
//         };
//     }
//
//     componentDidUpdate() {
//         this.updateBlocks();
//     }
//
//     updateBlocks() {
//         let data = this.props.activities;
//
//         let total = data.length;
//         let completed = _.filter(data, {activity_type: 'completed'}).length;
//         let progress = $('.challenge-block-container#' + this.props.id + ' .ui.progress');
//         let percent = (completed / data.length) * 100;
//         progress.progress('reset');
//         progress.progress({
//             percent: percent,
//             duration: 1000,
//             text: {
//                 active: false,
//                 error: false,
//                 success: false,
//                 warning: false,
//                 percent: 'Challenge Completion {percent}%',
//                 ratio: '{value} of {total}'
//             }
//         });
//     }
//
//     componentDidMount() {
//
//         $('#content .challenge-block')
//             .popup();
//         this.updateBlocks();
//
//
//     }
//
//     render() {
//
//         let data = this.props.activities;
//
//
//         let completed = _.filter(data, {activity_type: 'completed'}).length;
//         let percent = (completed / data.length) * 100;
//         switch (true) {
//             case(percent >= 80):
//                 this.state.color = 'green';
//                 break;
//             case(percent >= 50):
//                 this.state.color = 'yellow';
//                 break;
//             case(percent <= 49):
//                 this.state.color = 'red';
//                 break;
//             default:
//                 this.state.color = 'yellow';
//         }
//
//
//         const blocks = _.map(data, (group, key) => {
//             return (<ChallengeBlock key={group.repo + key} repo={group.repo} activity_type={group.activity_type}/>
//             )
//         });
//         return (
//             <div className='challenge-block-container' id={this.props.id}>
//                 {blocks}
//                 <div className={"ui " + this.state.color + " inverted progress block-progress"}>
//                     <div className="bar">
//                         <div className="progress label">
//                         </div>
//                     </div>
//                     <div className="label">Dates of 1-12-16 to 1-21-16</div>
//                 </div>
//             </div>
//         )
//
//     }
// }
// ;
//
// class ChallengeBlock extends React.Component {
//     blockColor() {
//         let color;
//         switch (this.props.activity_type) {
//             case 'completed':
//                 color = "completed-block";
//                 break;
//             case 'blocked':
//                 color = "blocked-block";
//                 break;
//             case 'started':
//                 color = "started-block";
//                 break;
//             default:
//                 color = "default-block";
//                 break;
//         }
//         return color
//     }
//
//     render() {
//         return (  <div className={"challenge-block " + this.blockColor() }
//                        data-title={this.props.repo}
//                        data-content={this.props.activity_type}
//         >
//         </div>)
//     }
// }
// ;
//
// const STATUS = {0: 'unknown', 1: 'started', 2: 'blocked', 3: 'completed'};
//
// class ActivityGraph extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: 'line'
//         };
//     }
//
//     renderD3(id) {
//
//         let data = this.props.activities;
//         let ctx = document.getElementById(id);
//         let self = this;
//         var chart = new Chart(ctx, {
//             type: 'line',
//             options: {
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             fontColor: 'rgba(190, 168, 25, 0.88)',
//                             callback(value, index, values) {
//                                 return STATUS[value]
//                             }
//                         }
//                     }],
//                     xAxes: [{
//                         ticks: {
//                             fontColor: 'rgba(190, 168, 25, 0.88)',
//                         }
//                     }]
//                 }
//             },
//             data: {
//                 labels: _.map(data, function (obj) {
//                     return obj.repo.substr(0, 5)
//                 }),
//                 datasets: [{
//                     scaleOverride: true,
//                     scaleSteps: 1,
//                     scaleLabel: "<%=data[0]%>",
//                     scaleStepWidth: Math.ceil(4 / 1),
//                     label: "Challenge Completion",
//                     fill: false,
//                     lineTension: 0.1,
//                     backgroundColor: "rgba(75,192,192,0.4)",
//                     borderColor: "rgba(75,192,192,1)",
//                     borderCapStyle: 'butt',
//                     borderDash: [],
//                     borderDashOffset: 0.0,
//                     borderJoinStyle: 'miter',
//                     pointBorderColor: "rgba(75,192,192,1)",
//                     pointBackgroundColor: "#FFFFFF",
//                     pointBorderWidth: 1,
//                     pointHoverRadius: 5,
//                     pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                     pointHoverBorderColor: "rgba(220,220,220,1)",
//                     pointHoverBorderWidth: 2,
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                     data: data.map(this.activityTypeToNum)
//                 }]
//             }
//         })
//     }
//
//     activityTypeToNum(activity) {
//         return _.findKey(STATUS, function (key) {
//             return key === activity.activity_type
//         })
//     }
//
//     componentDidUpdate() {
//         this.renderD3(this.props.id + this.state.name);
//     }
//
//     componentDidMount() {
//         this.renderD3(this.props.id + this.state.name);
//     }
//
//     render() {
//         return (<canvas id={this.props.id + this.state.name}></canvas>)
//     }
// }
// ;
//
// class Activity extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     getIcon() {
//         let icon;
//         switch (this.props.type) {
//             case 'completed':
//                 icon = <i className="fa fa-check" aria-hidden="true"></i>
//                 break;
//             case 'blocked':
//                 icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
//                 break;
//             case 'started':
//                 icon = <i className="fa fa-plane" aria-hidden="true"></i>
//                 break;
//             default:
//                 icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
//                 break;
//         }
//         return icon
//     }
//
//     render() {
//         return (
//             <tr>
//                 <td>
//                     {this.getIcon()}
//                 </td>
//                 <td className="collapsing">
//                     <i className="folder icon"></i> {this.props.challenge}
//                 </td>
//                 <td className="right aligned collapsing">{this.props.user.email}</td>
//             </tr>
//         )
//     }
// }
// ;
//
// class RangeDatePicker extends React.Component {
//     componentDidMount() {
//         $('#rangestart').calendar({
//             type: 'date',
//             endCalendar: $('#rangeend')
//         });
//         $('#rangeend').calendar({
//             type: 'date',
//             startCalendar: $('#rangestart')
//         });
//     }
//
//     render() {
//         return (
//             <div style={{marginTop: '1em' }}>
//                 <h4>OR</h4>
//                 <h4>Search by Date Range</h4>
//                 <div className="ui form">
//                     <div className="two fields">
//                         <div className="field">
//                             <label>Start date</label>
//                             <div className="ui calendar" id="rangestart">
//                                 <div className="ui inverted input left icon">
//                                     <i className="calendar icon"></i>
//                                     <input type="text" placeholder="Start"></input>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="field">
//                             <label>End date</label>
//                             <div className="ui calendar" id="rangeend">
//                                 <div className="ui inverted input left icon">
//                                     <i className="calendar icon"></i>
//                                     <input type="text" placeholder="End"></input>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// ;
//
// class CohortPicker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             content: []
//         };
//     }
//
//
//     componentDidMount() {
//         // [{title: 'aus-red-pandas-2016'}, {title: 'aus-squirrels-2016'}]
//         client.getCohorts({}, (cohorts) => {
//
//             this.setState({
//                 content: cohorts.map(function (cohort) {
//                     return {title: cohort}
//                 })
//             })
//
//
//             $('.ui.search#cohort-search')
//                 .search({
//                     source: this.state.content,
//                     onSelect: (chosen) => (
//                         this.props.pickCohort(chosen.title)
//                     )
//                 })
//
//
//             $('.ui.search#cohort-search input').blur((event) => {
//                 let value = $(event.currentTarget).val();
//                 if (value == '') {
//                     this.props.pickCohort('');
//                 }
//             })
//
//         });
//     }
//
//     render() {
//         return (
//             <div className="ui search" id="cohort-search">
//                 <div className="ui icon input">
//                     <input className="prompt" type="text" placeholder="Search Cohorts"></input>
//                     <i className="search icon"></i>
//                 </div>
//                 <div className="ui column center aligned">
//                     <div className="results"></div>
//                 </div>
//             </div>)
//     }
// }
// ;
//
//
// class PhaseWeekDayPicker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             content: [
//                 {title: 'Phase 1 - Week 1 - Day 1', params: '1-1-1'},
//                 {title: 'Phase 1 - Week 1 - Day 2', params: '1-1-2'},
//                 {title: 'Phase 1 - Week 1 - Day 3', params: '1-1-3'},
//                 {title: 'Phase 1 - Week 1 - Day 4', params: '1-1-4'},
//                 {title: 'Phase 1 - Week 1 - Day 5', params: '1-1-5'},
//                 {title: 'Phase 1 - Week 2 - Day 1', params: '1-2-1'},
//                 {title: 'Phase 1 - Week 2 - Day 2', params: '1-2-2'},
//                 {title: 'Phase 1 - Week 2 - Day 3', params: '1-2-3'},
//                 {title: 'Phase 1 - Week 2 - Day 4', params: '1-2-4'},
//                 {title: 'Phase 1 - Week 2 - Day 5', params: '1-2-5'},
//                 {title: 'Phase 1 - Week 3 - Day 1', params: '1-3-1'},
//                 {title: 'Phase 1 - Week 3 - Day 2', params: '1-3-2'},
//                 {title: 'Phase 1 - Week 3 - Day 3', params: '1-3-3'},
//                 {title: 'Phase 1 - Week 3 - Day 4', params: '1-3-4'},
//                 {title: 'Phase 1 - Week 3 - Day 5', params: '1-3-5'},
//
//                 {title: 'Phase 2 - Week 1 - Day 1', params: '2-1-1'},
//                 {title: 'Phase 2 - Week 1 - Day 2', params: '2-1-2'},
//                 {title: 'Phase 2 - Week 1 - Day 3', params: '2-1-3'},
//                 {title: 'Phase 2 - Week 1 - Day 4', params: '2-1-4'},
//                 {title: 'Phase 2 - Week 1 - Day 5', params: '2-1-5'},
//                 {title: 'Phase 2 - Week 2 - Day 1', params: '2-2-1'},
//                 {title: 'Phase 2 - Week 2 - Day 2', params: '2-2-2'},
//                 {title: 'Phase 2 - Week 2 - Day 3', params: '2-2-3'},
//                 {title: 'Phase 2 - Week 2 - Day 4', params: '2-2-4'},
//                 {title: 'Phase 2 - Week 2 - Day 5', params: '2-2-5'},
//                 {title: 'Phase 2 - Week 3 - Day 1', params: '2-3-1'},
//                 {title: 'Phase 2 - Week 3 - Day 2', params: '2-3-2'},
//                 {title: 'Phase 2 - Week 3 - Day 3', params: '2-3-3'},
//                 {title: 'Phase 2 - Week 3 - Day 4', params: '2-3-4'},
//                 {title: 'Phase 2 - Week 3 - Day 5', params: '2-3-5'},
//
//                 {title: 'Phase 3 - Week 1 - Day 1', params: '3-1-1'},
//                 {title: 'Phase 3 - Week 1 - Day 2', params: '3-1-2'},
//                 {title: 'Phase 3 - Week 1 - Day 3', params: '3-1-3'},
//                 {title: 'Phase 3 - Week 1 - Day 4', params: '3-1-4'},
//                 {title: 'Phase 3 - Week 1 - Day 5', params: '3-1-5'},
//                 {title: 'Phase 3 - Week 2 - Day 1', params: '3-2-1'},
//                 {title: 'Phase 3 - Week 2 - Day 2', params: '3-2-2'},
//                 {title: 'Phase 3 - Week 2 - Day 3', params: '3-2-3'},
//                 {title: 'Phase 3 - Week 2 - Day 4', params: '3-2-4'},
//                 {title: 'Phase 3 - Week 2 - Day 5', params: '3-2-5'},
//                 {title: 'Phase 3 - Week 3 - Day 1', params: '3-3-1'},
//                 {title: 'Phase 3 - Week 3 - Day 2', params: '3-3-2'},
//                 {title: 'Phase 3 - Week 3 - Day 3', params: '3-3-3'},
//                 {title: 'Phase 3 - Week 3 - Day 4', params: '3-3-4'},
//                 {title: 'Phase 3 - Week 3 - Day 5', params: '3-3-5'},
//
//
//             ]
//         }
//     }
//
//     componentDidMount() {
//
//         let self = this;
//
//         $('.ui.dropdown')
//             .dropdown()
//             .change(function () {
//                 let stateObj = {};
//                 let attr = $(this).find('input').attr('name');
//                 stateObj[attr] = $(this).find('input').val();
//                 self.setState(stateObj);
//                 self.submitPhaseOptions();
//             });
//
//
//     }
//
//     submitPhaseOptions() {
//         let options = {phase: this.state.phase, phaseDay: this.state.phaseDay, phaseWeek: this.state.phaseWeek}
//
//         this.props.pickPhaseDay(options)
//     }
//
//     render() {
//         return (
//             <div>
//                 <div className="ui selection dropdown" id="phase">
//                     <input type="hidden" ref="phase" name="phase"></input>
//                     <i className="dropdown icon"></i>
//                     <div className="default text">Phase</div>
//                     <div className="menu">
//                         <div className="item" data-value="1">ONE</div>
//                         <div className="item" data-value="2">TWO</div>
//                         <div className="item" data-value="3">THREE</div>
//                     </div>
//                 </div>
//
//                 <div className="ui selection dropdown" id="phaseWeek">
//                     <input type="hidden" ref="phase-week" name="phaseWeek"></input>
//                     <i className="dropdown icon"></i>
//                     <div className="default text">Week</div>
//                     <div className="menu">
//                         <div className="item" data-value="1">ONE</div>
//                         <div className="item" data-value="2">TWO</div>
//                         <div className="item" data-value="3">THREE</div>
//                     </div>
//                 </div>
//
//                 <div className="ui selection dropdown" id="phaseDay">
//                     <input type="hidden" ref="phase-day" name="phaseDay"></input>
//                     <i className="dropdown icon"></i>
//                     <div className="default text">Day</div>
//                     <div className="menu">
//                         <div className="item" data-value="1">ONE</div>
//                         <div className="item" data-value="2">TWO</div>
//                         <div className="item" data-value="3">THREE</div>
//                         <div className="item" data-value="3">FOUR</div>
//                         <div className="item" data-value="3">FIVE</div>
//                     </div>
//                 </div>
//
//                 <br></br>
//             </div>
//         )
//     }
// }
// ;
//
// class DisplayOptionsMenu extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isOpen: false
//         };
//         this.toggleCohortView = this.toggleCohortView.bind(this);
//         this.toggleSettings   = this.toggleSettings.bind(this);
//     }
//
//     toggleCohortView() {
//         this.props.setAnalyticViewType('cohort')
//     }
//
//     toggleSettings() {
//         this.setState({isOpen: !this.state.isOpen})
//     }
//
//     render() {
//         return (
//             <div className="ui two column centered grid">
//                 <div className="ui segment inverted column center aligned " id="options-menu">
//                     <button id='settings-button' className="ui inverted button"><i onClick={this.toggleSettings}
//                                                                                    className="settings icon"></i>
//                     </button>
//                     <button id='cohorts-button' className="ui inverted button"><i onClick={this.toggleCohortView}
//                                                                                   className="cubes icon"></i></button>
//                     <div id="inner-menu-options" style={{display: this.state.isOpen ? '' : 'none'}}>
//                         <CohortPicker pickCohort={this.props.pickCohort}/>
//                         <PhaseWeekDayPicker pickPhaseDay={this.props.pickPhaseDay}/>
//                         <RangeDatePicker />
//                     </div>
//                 </div>
//             </div>)
//     }
// }
// ;
//
// class CohortsDashboard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activities: [],
//             particlesLoaded: false,
//             analyticView: 'cohort',
//             selectedCohort: false,
//             phase: false,
//             week: false,
//             day: false,
//         };
//         this.updateAnalytics = this.updateAnalytics.bind(this);
//         this.pickPhaseDay = this.pickPhaseDay.bind(this);
//         this.componentDidMount = this.componentDidMount.bind(this);
//         this.setAnalyticView = this. setAnalyticView.bind(this);
//         this.getActivitiesForAllCohorts = this.getActivitiesForAllCohorts.bind(this);
//         this.pickCohort = this.pickCohort.bind(this);
//         this.loadCohortsFromServer = this.loadCohortsFromServer.bind(this);
//         this.loadParticles = this.loadParticles.bind(this);
//     }
//
//     updateAnalytics() {
//         let options = {
//             phase: this.state.phase,
//             week: this.state.week,
//             day: this.state.day,
//             cohort: this.state.selectedCohort
//         };
//         let readyOptions = _.pickBy(options, _.identity);
//
//         client.getActivitiesByQuery(readyOptions, (activities) => {
//             if (this.state.analyticView == 'cohort') {
//                 this.setState({activities: _.groupBy(activities, 'cohort')})
//             } else {
//                 this.setState({activities: _.groupBy(activities, '_user.email')})
//             }
//
//         });
//
//     }
//
//     pickPhaseDay(phaseOptions) {
//         this.setState({phase: phaseOptions.phase, week: phaseOptions.phaseWeek, day: phaseOptions.phaseDay})
//         this.updateAnalytics();
//
//     }
//
//
//     componentDidMount() {
//         this.loadCohortsFromServer();
//     }
//
//
//     setAnalyticView(type) {
//         this.setState({analyticView: type})
//         this.getActivitiesForAllCohorts();
//     }
//
//     getActivitiesForAllCohorts() {
//         this.setState({analyticView: 'cohort', selectedCohort: false});
//         this.updateAnalytics();
//     }
//
//
//     pickCohort(cohort) {
//         this.setState({analyticView: 'students', selectedCohort: cohort});
//         this.updateAnalytics();
//     }
//
//
//     loadCohortsFromServer() {
//         client.getFurthestActivities((activities) => {
//                 this.setState({activities: _.groupBy(activities, '_user.email')})
//                 if (activities.length != this.state.activities.length) {
//                     this.loadParticles();
//                 }
//             }
//         )
//     }
//
//
//     loadParticles() {
//         /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
//         if (!this.state.particlesLoaded) {
//             particlesJS.load('particles-js', 'public/assets/particles.json', function () {
//
//             });
//             this.setState({particlesLoaded: true})
//         }
//     }
//
//     render() {
//         const lists = [];
//
//         let i = 0;
//
//         _.forIn(this.state.activities, (activities, person) => (
//             i += 1,
//                 lists.push(
//                     <ActivityList key={person} activities={activities} el_id={i}
//                                   user={activities[0]._user} person={person}
//                     />)
//         ));
//
//         return (
//             <div>
//                 <DisplayOptionsMenu pickPhaseDay={this.pickPhaseDay} setAnalyticViewType={this.setAnalyticView}
//                                     pickCohort={this.pickCohort}/>
//                 {this.state.analyticView}
//                 <div className="ui three column doubling stackable grid" style={{margin:'auto'}}>
//                     {lists}
//                 </div>
//             </div>)
//
//     }
// };
//
//
// ReactDOM.render(
//     <CohortsDashboard />,
//     document.getElementById('content')
// );
