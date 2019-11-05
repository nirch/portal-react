import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';

class UsersPage extends Component {
    render() {
        return (
            <div>
                <PortalNavbar/>
                <h1>משתמשים</h1>
            </div>
        );
    }
}

export default UsersPage;