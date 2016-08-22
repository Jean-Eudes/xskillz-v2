import React, {Component, PropTypes} from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import DiplomaDatePicker from "../Manager/DiplomaDatePicker";
import AssignUserToManager from "../Manager/AssignUserToManager";
import QRCodeURL from "../Api/QRCodeURL/QRCodeURL";
import {Tabs, Tab} from "material-ui/Tabs";
import Config from '../../Config';
import LinkSkillToDomain from "../Skills/LinkSkillToDomain/LinkSkillToDomain";
import MergeSkills from '../Skills/MergeSkills/MergeSkills';
import AddDomain from '../Domain/Add/AddDomain';
import DeleteDomain from '../Domain/Del/DeleteDomain';
import _ from 'lodash';

class SettingsContent extends Component {

    static propTypes = {
        domains: PropTypes.object.isRequired,
        skills: PropTypes.object.isRequired,
        fetchDomains: PropTypes.func.isRequired,
        linkSkillToDomain: PropTypes.func.isRequired,
        deleteDomain: PropTypes.func.isRequired,
        addDomain: PropTypes.func.isRequired,
        mergeSkills: PropTypes.func.isRequired,
        saveDiploma: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        fetchManagers: PropTypes.func.isRequired
    };

    componentDidMount() {
        const domains = this.props.domains;
        if (!domains.loaded) {
            this.props.fetchDomains();
        }
        const skills = this.props.skills;
        if (!skills.loaded) {
            this.props.fetchSkills();
        }
    };

    isManager = () => {
        let manager = false;
        _.each(_.keys(this.props.auth.me.roles), key => {
            if (manager) return;
            manager = this.props.auth.me.roles[key].name === 'Manager';
        });
        return manager;
    };

    render() {
        const domains = this.props.domains.list;
        const skills = this.props.skills.list;
        const {fetchManagers, linkSkillToDomain, mergeSkills, addDomain, deleteDomain, saveDiploma, assignUserToManager, users, fetchUsers} = this.props;
        return (
            <div className="content">
                <Tabs>
                    <Tab label="Compétences">
                        <LinkSkillToDomain domains={domains} skills={skills} linkSkillToDomain={linkSkillToDomain}/>
                        <MergeSkills skills={skills} mergeSkills={mergeSkills}/>
                    </Tab>
                    {this.isManager() && <Tab label="Domaines">
                        <AddDomain addDomain={addDomain}/>
                        <DeleteDomain deleteDomain={deleteDomain} domains={domains}/>
                    </Tab>}

                    {this.isManager() && <Tab label="Utilisateurs">
                        <DiplomaDatePicker saveDiploma={saveDiploma} users={users} fetchUsers={fetchUsers}/>
                        <AssignUserToManager assignUserToManager={assignUserToManager} users={users}
                                             fetchUsers={fetchUsers} fetchManagers={fetchManagers}/>
                    </Tab>}
                    <Tab label="QR Code">
                        <QRCodeURL url={Config.apiURL}/>
                    </Tab>
                </Tabs>
            </div>);
    }
}
export default SettingsContent;