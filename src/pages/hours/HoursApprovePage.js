import React, { Component } from 'react';
import '../hours/hoursApprove.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import SelectMonth from '../../components/hoursApprove/selectMonth'

class HoursApprovePage extends Component {
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar/>
                <SelectMonth month="פברואר"/>
                <div>
                    חיפוש עובדים
                </div>
                <div>
                    רשימת עובדים
                </div>
                <div>
                    footer with actions
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(HoursApprovePage);
