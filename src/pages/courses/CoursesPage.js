import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ButtonSet from '../../components/ButtonSet';
import server from '../../shared/server';
import { Container } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'

class CoursesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPages: null,
            currentPage: 1,
            isActive: 1}

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
                <PortalNavbar />

                <h1>קורסים</h1>
                <SearchBar searchLabel="חיפוש קורס" handleSearch = {this.handleSearch}  updateSearch = {this.updateSearch} pages = {this.state.searchPages} />
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