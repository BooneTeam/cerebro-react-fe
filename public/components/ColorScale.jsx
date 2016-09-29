import React from 'react';
import ChallengeBlock from './ChallengeBlock.jsx'

class ColorScale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'scale'
        };
    }

    componentDidUpdate() {
        this.updateBlocks();
    }

    updateBlocks() {
        let data = this.props.activities;

        let total = data.length;
        let completed = _.filter(data, {activity_type: 'completed'}).length;
        let progress = $('.challenge-block-container#' + this.props.id + ' .ui.progress');
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
    }

    componentDidMount() {

        $('#content .challenge-block')
            .popup();
        this.updateBlocks();


    }

    render() {

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


        const blocks = _.map(data, (group, key) => {
            return (<ChallengeBlock key={group.repo + key} repo={group.repo} activity_type={group.activity_type}/>
            )
        });
        return (
            <div className='challenge-block-container' id={this.props.id}>
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
}
;

export default ColorScale;
