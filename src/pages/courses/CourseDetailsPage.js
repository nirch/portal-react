import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import inPageNavbar from '../../components/inPageNavbar/inPageNavbar';


class CourseDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPages: 1,
            coursestatus: 1,
            desc: false,
            page: 1,
            search: "",
            sorting: "courseid",
            courses: [],
            showCourseDetails: null
        }
    }
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar header="קורסים" />
                <inPageNavbar />
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
