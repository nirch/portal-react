import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable';


class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:
            // [
            // {userid:639, firstname: "סימה", lastname: "סויסה", email: "sima@gmail.com"},
            // {userid:718, firstname: "גל", lastname: "שני", email: "galshani76@gmail.com"},
            // {userid:719, firstname: "אורי", lastname: "רז", email: "URI.RAZ@GMAIL.COM"},
            // {userid:893, firstname: "איתמר", lastname: "פרידמן", email: "xxfridmanxx@gmail.com"},
            // {userid:897, firstname: "איתן", lastname: "אדרי", email: "eytane@neta-project.org"},
            // {userid:904, firstname: "אמאל", lastname: "באדר", email: "amalb@appleseeds.org.il"},
            // {userid:886, firstname: "אורית", lastname: "בש", email: "oritbash@neta-project.org"},
            // {userid:944, firstname: "חאלדיה", lastname: "נמארנה", email: "khaldiyan@appleseeds.org.il"},
            // ]

            {
                "639": ["סימה", "סויסה", "sima@gmail.com"],
                "718": ["גל", "שני", "galshani76@gmail.com"],
                "719": ["אורי", "רז", "URI.RAZ@GMAIL.COM"],
                "893": ["איתמר", "פרידמן", "xxfridmanxx@gmail.com"],
                "897": ["איתן", "אדרי", "eytane@neta-project.org"],
                "904": ["אמאל", "באדר", "amalb@appleseeds.org.il"],
                "886": ["אורית", "בש", "oritbash@neta-project.org"],
                "944": ["חאלדיה", "נמארנה", "khaldiyan@appleseeds.org.il"]
            }
        }
        this.titles = ["שם", "שם משפחה", "אימייל"];
    }
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <PortalNavbar />
                <h1>משתמשים</h1>

                <ItemsTable items={this.state.users} titles={this.titles} />

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
