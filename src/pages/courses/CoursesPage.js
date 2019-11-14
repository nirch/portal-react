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
import { rejects } from 'assert';

class CoursesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPages: 15,
            currentPage: 1,
            isActive: 1,
            coursestatus: 1,
            desc: false,
            page: 0,
            search: "",
            sorting: "courseid",
            courses: [],
            showCourseDetails: null
        }
        this.titles = ["שם קורס מקוצר", "פרויקט", "מדריך"]
    }
    componentDidMount() {
        const { coursestatus, desc, page, search, sorting, } = this.state;
        const data = { coursestatus, desc, page, search, sorting };
        server(data, "SearchCourses").then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                console.log(res.data);
                this.setState({ courses: res.data.courses })
            }
        }, err => {
            console.error(err)
        }
        )
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
                <ItemsTable titles={this.titles} />
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