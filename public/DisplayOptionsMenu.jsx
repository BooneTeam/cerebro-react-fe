var client = require('./client');
import React from 'react';
import CohortPicker from './CohortPicker.jsx'
import PhaseWeekDayPicker from './PhaseWeekDayPicker.jsx'
import RangeDatePicker from './RangeDatePicker.jsx'

class DisplayOptionsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleCohortView = this.toggleCohortView.bind(this);
        this.toggleSettings   = this.toggleSettings.bind(this);
    }

    toggleCohortView() {
        this.props.setAnalyticViewType('cohort')
    }

    toggleSettings() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div className="ui two column centered grid">
                <div className="ui segment inverted column center aligned " id="options-menu">
                    <button id='settings-button' className="ui inverted button"><i onClick={this.toggleSettings}
                                                                                   className="settings icon"></i>
                    </button>
                    <button id='cohorts-button' className="ui inverted button"><i onClick={this.toggleCohortView}
                                                                                  className="cubes icon"></i></button>
                    <div id="inner-menu-options" style={{display: this.state.isOpen ? '' : 'none'}}>
                        <CohortPicker pickCohort={this.props.pickCohort}/>
                        <PhaseWeekDayPicker pickPhaseDay={this.props.pickPhaseDay}/>
                        <RangeDatePicker />
                    </div>
                </div>
            </div>)
    }
}
;export default DisplayOptionsMenu;