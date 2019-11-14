import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ButtonSet from '../../components/ButtonSet';
import server from '../../shared/server';
import { Container } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'
import itemsTable from '../../components/itemsTable/itemsTable'
import ItemsTable from '../../components/itemsTable/itemsTable';

class CoursesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPages: 15,
            currentPage: 1,
            isActive: 1,
            courses:  {
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
        this.titles = ["שם קורס מקוצר", "פרויקט", "מדריך"]
    }
    getFilteredData = (key) => {
        if (key == 1) {
            console.log("shalom" + key)
        }
        if (key == 2) {
            console.log("by" + key)
        }
    }
    handleSearch = (val) => {
        alert(val);
    }
    updateSearch = (page) => {
        console.log(page);
    }
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }


        const buttonsData = [
            { key: 1, title: "קורסים פעילים" },
            { key: 2, title: "לא פעילים" }
        ]

        return (
            <div>
                <PortalNavbar header="קורסים" />
                 <SearchBar searchLabel="חיפוש קורס" handleSearch={this.handleSearch} updateSearch={this.updateSearch} pages={this.state.searchPages} />
                 <ItemsTable titles ={this.titles} items = {this.state.courses}/>
                <ButtonSet makeChoice={this.getFilteredData} buttons={buttonsData} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(CoursesPage);