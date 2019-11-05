import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';

class HoursApprovePage extends Component {
    render() {
        return (
            <div>
                <PortalNavbar/>
                <h1>אישור שעות</h1>
            </div>
        );
    }
}

export default HoursApprovePage;