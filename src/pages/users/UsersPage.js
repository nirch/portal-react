import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable/itemsTable';
import ButtonSet from '../../components/ButtonSet';
import server from '../../shared/server';
import SearchBar from '../../components/SearchBar';

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
        } else if(userType == "students") {
            this.userRequest = "SearchStudentsUnderMe";
        } else if (userType == "new"){
             this.userRequest = "SearchNewUsers";
        };
            
    }

   
    componentDidMount() {
        const { desc, page, search, sorting, userstatus } = this.state;
        const data = { desc,  page : page - 1, search, sorting, userstatus };    
            server(data, this.userRequest).then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                } else {
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
            const data = { desc,  page : page - 1, search, sorting, userstatus };
            server(data, this.userRequest).then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                } else {
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
        this.setState({ userstatus: key, page: 1 });
    }

    userDetails = (id) => {
        this.setState({ showUserDetails: id });
    }

    userSearch = (val) => {
        this.setState({ search: val });
    }

    userCurrentPage = (page) => {
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
            { key: 1, title: "עובדים פעילים" },
            { key: 0, title: "לא פעילים" }
        ]

        return (
            <div>
                <PortalNavbar className="users-Navbar" header="עובדים" />
                <SearchBar searchLabel="חיפוש עובד" handleSearch={this.userSearch} updatePage={this.userCurrentPage}
                    pages={numberOfPages} currentPage={page} />
                <div className="users-table">
                    <ItemsTable items={userDisplay} titles={this.titles} handleClick={this.userDetails} />
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
