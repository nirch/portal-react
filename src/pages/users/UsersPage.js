import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable/itemsTable';
import ButtonSet from '../../components/ButtonSet';
import server from '../../shared/server';
import SearchBar from '../../components/SearchBar';
import { Spinner } from 'react-bootstrap';

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: false,
            page: 1,
            search: "",
            sorting: "userid",
            userstatus: 1,

            users: [],
            numberOfPages: 1,

            showUserDetails: null
        }

        this.titles = ["שם", "שם משפחה", "אימייל"];

        let pagePath = window.location.href.split("type=");
        let userType = pagePath[pagePath.length - 1];
        if (userType == "staff") {
            this.userRequest = "SearchStaffUnderMe";
            this.navbarTitle = "עובדים";
            this.searchPlaceholder = "חיפוש עובד";
        } else if (userType == "students") {
            this.userRequest = "SearchStudentsUnderMe";
            this.navbarTitle = "חניכים";
            this.searchPlaceholder = "חיפוש חניך";
        } else if (userType == "new") {
            this.userRequest = "SearchNewUsers";
            this.navbarTitle = "משתמשים חדשים";
            this.searchPlaceholder = "חיפוש משתמש חדש";
        };

        this.isLoading = true;

    }


    componentDidMount() {
        const { desc, page, search, sorting, userstatus } = this.state;
        const data = { desc, page: page - 1, search, sorting, userstatus };
        server(data, this.userRequest).then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                this.isLoading = false;
                this.setState({
                    users: res.data.users,
                    numberOfPages: res.data.pages
                });
            }
        }, err => {
            console.error(err);
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.userstatus !== prevState.userstatus || this.state.page !== prevState.page ||
            this.state.search !== prevState.search || this.props.key !== prevProps.key) {
            const { desc, page, search, sorting, userstatus } = this.state;
            const data = { desc, page: page - 1, search, sorting, userstatus };
            this.isLoading = true;
            server(data, this.userRequest).then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                } else {
                    this.isLoading = false;
                    this.setState({
                        users: res.data.users,
                        numberOfPages: res.data.pages
                    });
                }
            }, err => {
                console.error(err);
            })
        }
    }

    userIsActive = (key) => {
        this.isLoading = true;
        this.setState({ userstatus: key, page: 1 });
    }

    userDetails = (id) => {
        this.setState({ showUserDetails: id });
    }

    userSearch = (val) => {
        this.isLoading = true;
        this.setState({ search: val, page: 1 });
    }

    userCurrentPage = (page) => {
        this.isLoading = true;
        this.setState({ page });
    }

    render() {
        const { users, numberOfPages, page } = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        if (this.state.showUserDetails != null) {
            return <Redirect to={'/users/' + this.state.showUserDetails} />
        }

        const userDisplay = {}
        for (var i = 0; i < users.length; i++) {
            userDisplay[users[i].userid] = [];
            userDisplay[users[i].userid].push(users[i].firstname);
            userDisplay[users[i].userid].push(users[i].lastname);
            userDisplay[users[i].userid].push(users[i].email);
        }
        
        const buttonsData = [
            { key: 1, title: "פעילים" },
            { key: 0, title: "לא פעילים" }
        ]

        var displayItemsTable = this.isLoading ? <div className="user-spinner">טוען נתונים, אנא המתן  <Spinner animation="border" variant="primary" /></div> :
            <ItemsTable items={userDisplay} titles={this.titles} handleClick={this.userDetails} />

        return (
            <div>
                <PortalNavbar className="users-Navbar" header={this.navbarTitle} />

                <SearchBar searchLabel={this.searchPlaceholder} handleSearch={this.userSearch} updatePage={this.userCurrentPage}
                    pages={numberOfPages} currentPage={page} />


                <div className="users-table">
                    {displayItemsTable}
                </div>

                <div className="users-activeFilter">
                    <ButtonSet makeChoice={this.userIsActive} buttons={buttonsData} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(UsersPage);
