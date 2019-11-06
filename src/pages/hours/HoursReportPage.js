import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'


class HoursReportPage extends Component {
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar/>
                <h1>דיווח שעות</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(HoursReportPage);