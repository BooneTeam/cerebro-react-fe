import React from 'react';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getIcon() {
        let icon;
        switch (this.props.type) {
            case 'complete':
                icon = <i className="fa fa-check" aria-hidden="true"></i>
                break;
            case 'blocked':
                icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
                break;
            case 'started':
                icon = <i className="fa fa-plane" aria-hidden="true"></i>
                break;
            default:
                icon = <i className="fa fa-question" aria-hidden="true"></i>
                break;
        }
        return icon
    }

    getStatusClass() {
        let className;
        switch (this.props.type) {
            case 'complete':
                className = 'light-green';
                break;
            case 'blocked':
                className = 'light-red';
                break;
            case 'started':
                className = 'light-yellow';
                break;
            default:
                className = 'light-blue';
                break;
        }
        return className
    }

    render() {
        return (
            <tr className={this.getStatusClass()} >
                <td className="collapsing">
                    {this.getIcon()} <a target="_blank" href={this.props.gitUrl} >{this.props.challenge}</a>
                </td>
            </tr>
        )
    }
}
;

export default Activity;
