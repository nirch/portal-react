import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';

class CourseDetailsPage extends Component {
    render() {
        return (
            <div>
                <PortalNavbar/>
                <h1>פרטי קורס</h1>
            </div>
        );
    }
}

export default CourseDetailsPage;