var client = require('../client');
import React from 'react';

class StudentPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }


    componentDidMount() {
        // [{title: 'aus-red-pandas-2016'}, {title: 'aus-squirrels-2016'}]
        client.getStudents({}, (cohorts) => {

            this.setState({
                content: cohorts.map(function (cohort) {
                    return {title: cohort.github.name}
                })
            })


            $('.ui.search#student-search')
                .search({
                    source: this.state.content,
                    onSelect: (chosen) => (
                        this.props.pickStudent(chosen.title)
                    )
                })


            $('.ui.search#student-search input').blur((event) => {
                let value = $(event.currentTarget).val();
                if (value == '') {
                    this.props.pickStudent('');
                }
            })

        });
    }

    render() {
        return (
            <div className="ui search" id="student-search">
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="Search Students"></input>
                    <i className="search icon"></i>
                </div>
                <div className="ui column center aligned">
                    <div className="results"></div>
                </div>
            </div>)
    }
}
;

export default StudentPicker;
