import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'


class CourseDetailsPage extends Component {
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar header="קורסים" />
                <h1>פרטי קורס</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(CourseDetailsPage);
