import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';

class CoursesPage extends Component {
    render() {
        return (
            <div>
                <PortalNavbar/>
                <h1>קורסים</h1>
            </div>
        );
    }
}

export default CoursesPage;