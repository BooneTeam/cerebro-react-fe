var client = require('./client');
import React from 'react';
class ChallengeBlock extends React.Component {
    blockColor() {
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
    }

    render() {
        return (  <div className={"challenge-block " + this.blockColor() }
                       data-title={this.props.repo}
                       data-content={this.props.activity_type}
        >
        </div>)
    }
}
;

export default ChallengeBlock;