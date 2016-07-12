import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

class AssignUserToManager extends Component {

    static propTypes = {
        assignUserToManager: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        fetchUsers: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {userId: null, managerId: null};
    }

    componentDidMount() {
        const { loaded } = this.props.users || {};
        if (!loaded) {
            this.props.fetchUsers && this.props.fetchUsers();
        }
    }

    onUserChange = (event, index, value) => this.setState({userId: value});

    onManagerChange = (event, index, value) => this.setState({managerId: value});

    assignUserToManager = () => this.props.assignUserToManager(this.state.userId, this.state.managerId);

    render() {
        const { userId, managerId } = this.state;
        const users = this.props.users.list;
        const managers = _.filter(users, user => _.indexOf(user.roles, 'Manager') > -1);
        return (
            <div className="assign-user-manager">
                <h2>Assign a user to a manager</h2>
                <div>
                    <SelectField floatingLabelText="User's name" value={userId} hintText="Choose a user"
                                 onChange={::this.onUserChange}>
                        {users.map((user, index) => <MenuItem value={user.id} key={index}
                                                              primaryText={user.name}/>)}
                    </SelectField>
                    <SelectField floatingLabelText="Manager's name" value={managerId} hintText="Choose a manager"
                                 onChange={::this.onManagerChange}>
                        {managers.map((manager, index) => <MenuItem value={manager.id} key={index}
                                                                    primaryText={manager.name}/>)}
                    </SelectField>
                </div>
                <div>
                    <RaisedButton label="Assign" primary={true} onClick={::this.assignUserToManager}/>
                </div>
            </div>
        )
    }
}

export default AssignUserToManager;