import React, { Component } from 'react';
import './navbar.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from "../../store/reducers/ActiveUser/actions";
import server from '../../shared/server'

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <div className="hamburger-menu" onClick={this.props.openSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    }
}

class ArrowBack extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <div className="arrow-back" onClick={this.props.returnToPreviousPage}>
            </div>
        </div>
    }
}

class PortalNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: "",
            isMenuOpen: false,
            isDropDown: false,
            currentUser: {

            }
        }

        this.logout = this.logout.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.goToCoursesPage = this.goToCoursesPage.bind(this);
        this.goToStaffPage = this.goToStaffPage.bind(this);
        this.goToStudentsPage = this.goToStudentsPage.bind(this);
        this.goToNewUsersPage = this.goToNewUsersPage.bind(this);
        this.openDropDown = this.openDropDown.bind(this);
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

    openDropDown() {
        let { isDropDown } = this.state;
        if (isDropDown)
            isDropDown = false;
        else
            isDropDown = true;
        this.setState({ isDropDown })
    }

    goToStaffPage() {
        let { redirectTo } = this.state;
        redirectTo = "/users?type=staff";
        this.setState({ redirectTo })
        this.closeSidebar();
    }

    goToStudentsPage() {
        let { redirectTo } = this.state;
        redirectTo = "/users?type=students";
        this.setState({ redirectTo })
        this.closeSidebar();
    }

    goToNewUsersPage() {
        let { redirectTo } = this.state;
        redirectTo = "/users?type=new";
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
        let { redirectTo } = this.state;
        if (redirectTo != "") {
            redirectTo = "";
            this.setState({ redirectTo });
        }

    }

    componentDidMount() {
        let { currentUser } = this.state;
        server({}, "GetMyProfile").then(res => {
            console.log(res);
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                currentUser = res.data;
                currentUser.image= "https://pil1.appleseeds.org.il/dcnir/"+currentUser.image;
                this.setState({ currentUser });
            }
        }, err => {
            console.error(err);
        })
    }

    render() {
        let { header } = this.props;
        let { redirectTo, isMenuOpen, isDropDown, currentUser } = this.state;
        let sidebarOpen;
        let dropDown, arrow, height;
        let hamburgerOrBack = this.props.enableBack ? <ArrowBack returnToPreviousPage={this.props.enableBack} /> : <Hamburger openSidebar={this.openSidebar} />;
        if (!currentUser.image || currentUser.image == "")
            currentUser.image = "images/profile-icon.png";
        if (isMenuOpen) {
            sidebarOpen = "sidebar-open";
        }
        else {
            sidebarOpen = "";
        }

        if (isDropDown) {
            arrow = "sidebar-icons push-left revert";
            dropDown = "show-dropdown";
            height = {
                height: 'initial'
            };
        }
        else {
            arrow = "sidebar-icons push-left";
            dropDown = "hide-dropdown";
            height = {
                height: '6vh'
            };
        }

        if (redirectTo) {
            return <Redirect to={redirectTo} />;
        }

        return (
            <div>
                <header>
                    {hamburgerOrBack}
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
                                <img className="profile-image" onClick={this.profileClick} src={currentUser.image}></img>
                                <div className="name-wrap">
                                    <span className="user-name">
                                        {currentUser.firstname + ' ' + currentUser.lastname}
                                    </span>
                                </div>
                            </div>
                            <div className="sidebar-options">
                                <div className="menu-information dropdown" onClick={this.openDropDown} style={height}>
                                    <span className="sidebar-icons">
                                        <img src="images/users.png"></img>
                                    </span>
                                    משתמשים
                                    <span className={arrow} style={{ transition: "all 0.5s" }}>
                                        <img src="images/arrow_down.png"></img>
                                    </span>
                                    <div className={dropDown}>
                                        <div className="menu-information" onClick={this.goToStaffPage}>
                                            עובדים
                                        </div>
                                        <div className="menu-information" onClick={this.goToStudentsPage}>
                                            חניכים
                                        </div>
                                        <div className="menu-information" onClick={this.goToNewUsersPage}>
                                            משתמשים חדשים
                                        </div>
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
                                <div className="menu-information disconnect" onClick={this.logout}>
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