import React from 'react';
import CohortPicker from './CohortPicker.jsx'
import StudentPicker from './StudentPicker.jsx'
import PhaseWeekDayPicker from './PhaseWeekDayPicker.jsx'
import RangeDatePicker from './RangeDatePicker.jsx'

class DisplayOptionsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleCohortView = this.toggleCohortView.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.toggleStudentView = this.toggleStudentView.bind(this);
    }

    toggleCohortView() {
        this.props.setAnalyticViewType('cohort')
    }

    toggleStudentView() {
        this.props.setAnalyticViewType('student')
    }

    toggleSettings() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div className="ui two column centered grid">
                <div className="ui segment inverted column center aligned " id="options-menu">
                    <button id='cohorts-button' className="ui inverted button" onClick={this.toggleCohortView}><i
                        className="users icon"></i></button>

                    <button id='cohorts-button' className="ui inverted button" onClick={this.toggleStudentView}><i
                        className="user icon"></i></button>

                    <div>
                        <button id='cohorts-button' className="ui inverted button" onClick={this.toggleSettings}><i
                            className="search icon"></i>
                        </button>
                    </div>

                    <div id="inner-menu-options" style={{display: this.state.isOpen ? '' : 'none'}}>
                        <div className="search-wrapper">
                            <StudentPicker pickStudent={this.props.pickStudent}/>
                            <CohortPicker pickCohort={this.props.pickCohort}/>
                        </div>
                        {/* <PhaseWeekDayPicker pickPhaseDay={this.props.pickPhaseDay}/>*/}
                        {/*<RangeDatePicker />*/}
                    </div>
                </div>

            </div>)
    }
}
;export default DisplayOptionsMenu;
