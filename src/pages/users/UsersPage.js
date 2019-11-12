import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable/itemsTable';
import ButtonSet from '../../components/ButtonSet';

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:
            {
                "639": ["סימה", "סויסה", "sima@gmail.com"],
                "718": ["גל", "שני", "galshani76@gmail.com"],
                "719": ["אורי", "רז", "URI.RAZ@GMAIL.COM"],
                "893": ["איתמר", "פרידמן", "xxfridmanxx@gmail.com"],
                "897": ["איתן", "אדרי", "eytane@neta-project.org"],
                "904": ["אמאל", "באדר", "amalb@appleseeds.org.il"],
                "886": ["אורית", "בש", "oritbash@neta-project.org"],
                "944": ["חאלדיה", "נמארנה", "khaldiyan@appleseeds.org.il"]
            },

            showUserDetails: null
        }

        this.titles = ["שם", "שם משפחה", "אימייל"];
    }

    getFilteredData = (key) => {
        if (key == 1) {
            console.log("shalom" + key)
        }
        if (key == 2) {
            console.log("by" + key)
        }
    }

    handleClick = (id) => {
        this.setState({ showUserDetails: id });
    }

    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        if (this.state.showUserDetails != null) {
            return <Redirect to={'/users/' + this.state.showUserDetails} />   
        }

        const buttonsData = [
            { key: 1, title: "עובדים פעילים" },
            { key: 2, title: "לא פעילים" }
        ]

        return (
            <div>
                <PortalNavbar className="users-Navbar" />
                <h1 className="users-searchBox">Search component</h1>

                <ItemsTable items={this.state.users} titles={this.titles} handleClick={this.handleClick} />

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
