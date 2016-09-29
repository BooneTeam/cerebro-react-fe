import React from 'react';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getIcon() {
        let icon;
        switch (this.props.type) {
            case 'completed':
                icon = <i className="fa fa-check" aria-hidden="true"></i>
                break;
            case 'blocked':
                icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
                break;
            case 'started':
                icon = <i className="fa fa-plane" aria-hidden="true"></i>
                break;
            default:
                icon = <i className="fa fa-ambulance" aria-hidden="true"></i>
                break;
        }
        return icon
    }

    render() {
        return (
            <tr>
                <td>
                    {this.getIcon()}
                </td>
                <td className="collapsing">
                    <i className="folder icon"></i> {this.props.challenge}
                </td>
                <td className="right aligned collapsing">{this.props.user.email}</td>
            </tr>
        )
    }
}
;

export default Activity;
