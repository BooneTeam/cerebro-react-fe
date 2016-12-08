import React from 'react';
import CohortPicker from './CohortPicker.jsx'
import StudentPicker from './StudentPicker.jsx'
import PhaseWeekDayPicker from './PhaseWeekDayPicker.jsx'
import RangeDatePicker from './RangeDatePicker.jsx'

class FilterBar extends React.Component {
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
            <div className="ui menu inverted" id="filter-bar">
                <div className="item">
                    <button id='cohorts-button' className="ui inverted button" onClick={this.toggleCohortView}><i
                        className="users icon"></i></button>
                </div>
                <div className="item">
                    <button id='cohorts-button' className="ui inverted button" onClick={this.toggleStudentView}><i
                        className="user icon"></i></button>
                </div>
                <div className="right item">
                    <StudentPicker pickStudent={this.props.pickStudent}/>
                    <CohortPicker pickCohort={this.props.pickCohort}/>
                </div>

                {/* <div className="item">*/}
                {/*     <div className="ui icon input">*/}
                {/*         <input type="text" placeholder="Search..." />*/}
                {/*             <i className="search icon"></i>*/}
                {/*     </div>*/}
                {/* </div>*/}
                {/* <div className="right item">*/}
                {/*     <div className="ui action input">*/}
                {/*         <input type="text" placeholder="Navigate to..." />*/}
                {/*             <div className="ui button">Go</div>*/}
                {/*     </div>*/}
                {/* </div>*/}
            </div>
        )
    }
}
;
export default FilterBar;
