import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable/itemsTable';
import ButtonSet from '../../components/ButtonSet';
import server from '../../shared/server'

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: false,
            page: 0,
            search: "",
            sorting: "userid",
            userstatus: 1,

            users: [],
            showUserDetails: null
        }

        this.titles = ["שם", "שם משפחה", "אימייל"];
    }
    componentDidMount() {
        const { desc, page, search, sorting, userstatus } = this.state;
        const data = { desc, page, search, sorting, userstatus };
        server(data, "SearchStaffUnderMe").then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                console.log(res.data);
                this.setState({ users: res.data.users });
            }
        }, err => {
            console.error(err);
        })
    }
    componentDidUpdate(prevState) {
        if (this.state.userstatus !== prevState.userstatus) {
            const { desc, page, search, sorting, userstatus } = this.state;
            const data = { desc, page, search, sorting, userstatus };
            server(data, "SearchStaffUnderMe").then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                } else {
                    console.log(res.data);
                    this.setState({ users: res.data.users });
                }
            }, err => {
                console.error(err);
            })
        }
    }



    getFilteredData = (key) => {
        this.setState({ userstatus: key });
    }

    userDetails = (id) => {
        this.setState({ showUserDetails: id });
    }
    // userSearch() {
    //     const { users } = this.state;
    //     const text = "search ref value";
    //     // access all data in array???
    //     const foundUser = users.filter(text);
    //     this.setState({ users: foundUser })
    // }



    render() {
        const { users } = this.state;

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
                <h1 className="users-searchBox" onClick={this.userSearch}>Search component</h1>
                <div className="users-table">
                    <ItemsTable items={userDisplay} titles={this.titles} handleClick={this.userDetails} />
                </div>
                <div className="users-activeFilter">
                    <ButtonSet makeChoice={this.getFilteredData} buttons={buttonsData} />
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
