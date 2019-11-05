import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import './navbar.css'

class PortalNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">פורטל תפוח</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#/courses">קורסים</Nav.Link>
                            <Nav.Link href="#/users">משתמשים</Nav.Link>
                            <Nav.Link href="#/hours-report">דיווח שעות</Nav.Link>
                            <Nav.Link href="#/hours-approve">אישור שעות</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>            
            </div>
        );
    }
}

export default PortalNavbar;