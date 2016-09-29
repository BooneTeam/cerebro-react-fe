import React from 'react';


class RangeDatePicker extends React.Component {
    componentDidMount() {
        $('#rangestart').calendar({
            type: 'date',
            endCalendar: $('#rangeend')
        });
        $('#rangeend').calendar({
            type: 'date',
            startCalendar: $('#rangestart')
        });
    }

    render() {
        return (
            <div style={{marginTop: '1em' }}>
                <h4>OR</h4>
                <h4>Search by Date Range</h4>
                <div className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <label>Start date</label>
                            <div className="ui calendar" id="rangestart">
                                <div className="ui inverted input left icon">
                                    <i className="calendar icon"></i>
                                    <input type="text" placeholder="Start"></input>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>End date</label>
                            <div className="ui calendar" id="rangeend">
                                <div className="ui inverted input left icon">
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
}
;

export default RangeDatePicker;
