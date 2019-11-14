import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ItemsTable from '../../components/itemsTable/itemsTable';

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
                <PortalNavbar className="users-Navbar"/>
                <h1 className="users-searchBox">Search component</h1>

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
