var client = require('../client');
import React from 'react';

class CohortPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }


    componentDidMount() {
        // [{title: 'aus-red-pandas-2016'}, {title: 'aus-squirrels-2016'}]
        client.getCohorts({}, (cohorts) => {

            this.setState({
                content: cohorts.map(function (cohort) {
                    return {title: cohort}
                })
            })


            $('.ui.search#cohort-search')
                .search({
                    source: this.state.content,
                    onSelect: (chosen) => (
                        this.props.pickCohort(chosen.title)
                    )
                })


            $('.ui.search#cohort-search input').blur((event) => {
                let value = $(event.currentTarget).val();
                if (value == '') {
                    this.props.pickCohort('');
                }
            })

        });
    }

    render() {
        return (
            <div className="ui search" id="cohort-search">
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="Search Cohorts"></input>
                    <i className="search icon"></i>
                </div>
                <div className="ui column center aligned">
                    <div className="results"></div>
                </div>
            </div>)
    }
}
;

export default CohortPicker;
