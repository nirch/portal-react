import React, { Component } from 'react';
import './navbar.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from "../../store/reducers/ActiveUser/actions";

class PortalNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: "",
            isMenuOpen: false
        }

        this.logout = this.logout.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.goToCoursesPage = this.goToCoursesPage.bind(this);
        this.goToUsersPage = this.goToUsersPage.bind(this);
        this.goToHoursApprovePage = this.goToHoursApprovePage.bind(this);
        this.goToHoursReportPage = this.goToHoursReportPage.bind(this);
    }
    logout() {
        this.props.logoutAction();
        localStorage.removeItem("activeUser");
    }

    closeSidebar() {
        let { isMenuOpen } = this.state;
        isMenuOpen = false;
        this.setState({ isMenuOpen });
    }

    openSidebar() {
        let { isMenuOpen } = this.state;
        isMenuOpen = true;
        this.setState({ isMenuOpen });
    }

    goToCoursesPage() {
        let { redirectTo } = this.state;
        redirectTo = "/courses";
        this.setState({ redirectTo })
        this.closeSidebar();
    }

    goToUsersPage() {
        let { redirectTo } = this.state;
        redirectTo = "/users";
        this.setState({ redirectTo })
        this.closeSidebar();
    }


    goToHoursApprovePage() {
        let { redirectTo } = this.state;
        redirectTo = "/hours-approve";
        this.setState({ redirectTo })
        this.closeSidebar();
    }

    goToHoursReportPage() {
        let { redirectTo } = this.state;
        redirectTo = "/hours-report";
        this.setState({ redirectTo })
        this.closeSidebar();
    }
    componentDidUpdate() {
        let {redirectTo} = this.state;
        if (redirectTo != "") {
            redirectTo = "";
            this.setState({ redirectTo });
        }

    }

    render() {
        let { header } = this.props;
        let { redirectTo, isMenuOpen } = this.state;
        let sidebarOpen;

        if (isMenuOpen) {
            sidebarOpen = "sidebar-open";
        }
        else {
            sidebarOpen = "";
        }

        if (redirectTo) {
            return <Redirect to={redirectTo} />;
        }

        return (
            <div>
                <header>
                    <div className="hamburger-menu" onClick={this.openSidebar}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="header-title">
                        {header}
                    </div>
                </header>
                <div className={sidebarOpen}>
                    <div className="sidebar-background" onClick={this.closeSidebar}></div>
                    <div className="sidebar-wrap">
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <img className="appleseeds-logo" src="images/appleseeds-logo.png"></img>
                                <div className="x" onClick={this.closeSidebar}>&times;</div>
                            </div>
                            <div className="profile-preview">
                                <img className="profile-image" onClick={this.profileClick} src="images/profile-icon.png"></img>
                                <div className="name-wrap">
                                    <span className="user-name">
                                        אלעד שפר
                                        {/* {{ me.firstname + ' ' + me.lastname }} */}
                                    </span>
                                </div>
                            </div>
                            <div className="sidebar-options">
                                <div className="menu-information" onClick={this.goToUsersPage}>
                                    <span className="sidebar-icons">
                                        <img src="images/users.png"></img>
                                    </span>
                                    משתמשים
                                    <div className="menu-information dropdown" onClick={this.goToUsersPage}>
                                        עובדים
                                    </div>
                                    <div className="menu-information dropdown" onClick={this.goToUsersPage}>
                                        חניכים
                                    </div>
                                    <div className="menu-information dropdown" onClick={this.goToUsersPage}>
                                        משתמשים חדשים
                                    </div>
                                </div>
                                <div className="menu-information" onClick={this.goToCoursesPage}>
                                    <span className="sidebar-icons">
                                        <img src="images/courses.png"></img>
                                    </span>
                                    קורסים
                                </div>
                                <div className="menu-information" onClick={this.goToHoursReportPage}>
                                    <span className="sidebar-icons">
                                        <img src="images/hours-report.png"></img>
                                    </span>
                                    דיווח שעות
                                </div>
                                <div className="menu-information" onClick={this.goToHoursApprovePage}>
                                    <span className="sidebar-icons">
                                        <img src="images/hours-approval.png"></img>
                                    </span>
                                    אישור שעות
                                </div>
                                <div className="menu-information" onClick={this.logout}>
                                    <span className="sidebar-icons">
                                        <img src="images/disconnect-icon.png"></img>
                                    </span>
                                    התנתקות
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            // <div>
            //     <Navbar bg="light" expand="lg" className="portalNavbar">
            //         <Navbar.Brand className="portalNavbar" href="/">פורטל תפוח</Navbar.Brand>
            //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //         <Navbar.Collapse id="basic-navbar-nav">
            //             <Nav>
            //                 <NavDropdown title="משתמשים" id="basic-nav-dropdown">
            //                     <NavDropdown.Item href="#">עובדים</NavDropdown.Item>
            //                     <NavDropdown.Item href="#">חניכים</NavDropdown.Item>
            //                     <NavDropdown.Item href="#">משתמשים חדשים</NavDropdown.Item>
            //                 </NavDropdown>
            //                 <Nav.Link href="#/courses">קורסים</Nav.Link>
            //                 <Nav.Link href="#/hours-report">דיווח שעות</Nav.Link>
            //                 <Nav.Link href="#/hours-approve">אישור שעות</Nav.Link>
            //                 <Nav.Link onClick={this.logout}>התנתקות</Nav.Link>
            //             </Nav>
            //         </Navbar.Collapse>
            //     </Navbar>
            // </div>
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