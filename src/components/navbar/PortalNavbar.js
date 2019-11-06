import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import './navbar.css'

import { connect } from 'react-redux'
import { logoutAction } from "../../store/reducers/ActiveUser/actions";

class PortalNavbar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.logoutAction();
    }
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">פורטל תפוח</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="#/courses">קורסים</Nav.Link>
                            <Nav.Link href="#/users">משתמשים</Nav.Link>
                            <Nav.Link href="#/hours-report">דיווח שעות</Nav.Link>
                            <Nav.Link href="#/hours-approve">אישור שעות</Nav.Link>
                            <Nav.Link onClick={this.logout}>התנתקות</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>            
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = {
    logoutAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortalNavbar);