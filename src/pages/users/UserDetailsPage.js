import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';

class UserDetailsPage extends Component {
    render() {
        return (
            <div>
                <PortalNavbar/>
                <h1>פרטי משתמש</h1>
            </div>
        );
    }
}

export default UserDetailsPage;