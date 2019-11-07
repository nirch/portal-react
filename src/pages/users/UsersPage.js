import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import ActivityFilter from '../../components/ActivityFilter';

class UsersPage extends Component {
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar/>
                <h1>משתמשים</h1>
                <ActivityFilter activeButton = "עובדים פעילים" nonactiveButton = "לא פעילים"/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(UsersPage);
