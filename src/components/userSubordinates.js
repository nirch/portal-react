import React, { Component } from 'react';
import ItemsTable from './../components/itemsTable/itemsTable';
import { Spinner } from 'react-bootstrap';
import server from './../shared/server';
import './../pages/users/users.css'

class UserSubordinates extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
        this.titles = ["שם העובד"];
        this.isLoading = true;
    }

    componentDidMount() {
        const pagePath = window.location.href.split("/");
        const userId = pagePath[pagePath.length - 1];

        const data = { userId };

        server(data, "GetManagedUsersByUserId").then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                this.isLoading = false;
                let user = res.data;
                this.setState({ user: user });
                console.log(user);
            }
        }, err => {
            console.error(err);
        })
    }


    render() {
        const { user } = this.state;

        const userDisplay = {}
        for (var i = 0; i < user.length; i++) {
            userDisplay[user[i].userid] = [];
            userDisplay[user[i].userid].push(user[i].name);
        }

        var displayItemsTable = this.isLoading ? <div className="user-spinner">טוען נתונים, אנא המתן  <Spinner animation="border" variant="primary" /></div> :
            <ItemsTable items={userDisplay} titles={this.titles} handleClick={this.userDetails} />

        return(
            <div id="user-subordinate-table">
                {displayItemsTable}
            </div>
        );
    }
}
export default UserSubordinates;