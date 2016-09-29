import React from 'react';

class PhaseWeekDayPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {title: 'Phase 1 - Week 1 - Day 1', params: '1-1-1'},
                {title: 'Phase 1 - Week 1 - Day 2', params: '1-1-2'},
                {title: 'Phase 1 - Week 1 - Day 3', params: '1-1-3'},
                {title: 'Phase 1 - Week 1 - Day 4', params: '1-1-4'},
                {title: 'Phase 1 - Week 1 - Day 5', params: '1-1-5'},
                {title: 'Phase 1 - Week 2 - Day 1', params: '1-2-1'},
                {title: 'Phase 1 - Week 2 - Day 2', params: '1-2-2'},
                {title: 'Phase 1 - Week 2 - Day 3', params: '1-2-3'},
                {title: 'Phase 1 - Week 2 - Day 4', params: '1-2-4'},
                {title: 'Phase 1 - Week 2 - Day 5', params: '1-2-5'},
                {title: 'Phase 1 - Week 3 - Day 1', params: '1-3-1'},
                {title: 'Phase 1 - Week 3 - Day 2', params: '1-3-2'},
                {title: 'Phase 1 - Week 3 - Day 3', params: '1-3-3'},
                {title: 'Phase 1 - Week 3 - Day 4', params: '1-3-4'},
                {title: 'Phase 1 - Week 3 - Day 5', params: '1-3-5'},

                {title: 'Phase 2 - Week 1 - Day 1', params: '2-1-1'},
                {title: 'Phase 2 - Week 1 - Day 2', params: '2-1-2'},
                {title: 'Phase 2 - Week 1 - Day 3', params: '2-1-3'},
                {title: 'Phase 2 - Week 1 - Day 4', params: '2-1-4'},
                {title: 'Phase 2 - Week 1 - Day 5', params: '2-1-5'},
                {title: 'Phase 2 - Week 2 - Day 1', params: '2-2-1'},
                {title: 'Phase 2 - Week 2 - Day 2', params: '2-2-2'},
                {title: 'Phase 2 - Week 2 - Day 3', params: '2-2-3'},
                {title: 'Phase 2 - Week 2 - Day 4', params: '2-2-4'},
                {title: 'Phase 2 - Week 2 - Day 5', params: '2-2-5'},
                {title: 'Phase 2 - Week 3 - Day 1', params: '2-3-1'},
                {title: 'Phase 2 - Week 3 - Day 2', params: '2-3-2'},
                {title: 'Phase 2 - Week 3 - Day 3', params: '2-3-3'},
                {title: 'Phase 2 - Week 3 - Day 4', params: '2-3-4'},
                {title: 'Phase 2 - Week 3 - Day 5', params: '2-3-5'},

                {title: 'Phase 3 - Week 1 - Day 1', params: '3-1-1'},
                {title: 'Phase 3 - Week 1 - Day 2', params: '3-1-2'},
                {title: 'Phase 3 - Week 1 - Day 3', params: '3-1-3'},
                {title: 'Phase 3 - Week 1 - Day 4', params: '3-1-4'},
                {title: 'Phase 3 - Week 1 - Day 5', params: '3-1-5'},
                {title: 'Phase 3 - Week 2 - Day 1', params: '3-2-1'},
                {title: 'Phase 3 - Week 2 - Day 2', params: '3-2-2'},
                {title: 'Phase 3 - Week 2 - Day 3', params: '3-2-3'},
                {title: 'Phase 3 - Week 2 - Day 4', params: '3-2-4'},
                {title: 'Phase 3 - Week 2 - Day 5', params: '3-2-5'},
                {title: 'Phase 3 - Week 3 - Day 1', params: '3-3-1'},
                {title: 'Phase 3 - Week 3 - Day 2', params: '3-3-2'},
                {title: 'Phase 3 - Week 3 - Day 3', params: '3-3-3'},
                {title: 'Phase 3 - Week 3 - Day 4', params: '3-3-4'},
                {title: 'Phase 3 - Week 3 - Day 5', params: '3-3-5'},


            ]
        }
    }

    componentDidMount() {

        let self = this;

        $('.ui.dropdown')
            .dropdown()
            .change(function () {
                let stateObj = {};
                let attr = $(this).find('input').attr('name');
                stateObj[attr] = $(this).find('input').val();
                self.setState(stateObj);
                self.submitPhaseOptions();
            });


    }

    submitPhaseOptions() {
        let options = {phase: this.state.phase, phaseDay: this.state.phaseDay, phaseWeek: this.state.phaseWeek}

        this.props.pickPhaseDay(options)
    }

    render() {
        return (
            <div>
                <div className="ui selection dropdown" id="phase">
                    <input type="hidden" ref="phase" name="phase"></input>
                    <i className="dropdown icon"></i>
                    <div className="default text">Phase</div>
                    <div className="menu">
                        <div className="item" data-value="1">ONE</div>
                        <div className="item" data-value="2">TWO</div>
                        <div className="item" data-value="3">THREE</div>
                    </div>
                </div>

                <div className="ui selection dropdown" id="phaseWeek">
                    <input type="hidden" ref="phase-week" name="phaseWeek"></input>
                    <i className="dropdown icon"></i>
                    <div className="default text">Week</div>
                    <div className="menu">
                        <div className="item" data-value="1">ONE</div>
                        <div className="item" data-value="2">TWO</div>
                        <div className="item" data-value="3">THREE</div>
                    </div>
                </div>

                <div className="ui selection dropdown" id="phaseDay">
                    <input type="hidden" ref="phase-day" name="phaseDay"></input>
                    <i className="dropdown icon"></i>
                    <div className="default text">Day</div>
                    <div className="menu">
                        <div className="item" data-value="1">ONE</div>
                        <div className="item" data-value="2">TWO</div>
                        <div className="item" data-value="3">THREE</div>
                        <div className="item" data-value="3">FOUR</div>
                        <div className="item" data-value="3">FIVE</div>
                    </div>
                </div>

                <br></br>
            </div>
        )
    }
}
;

export default PhaseWeekDayPicker;
