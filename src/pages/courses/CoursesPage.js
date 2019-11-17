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
            
            
            coursestatus: 1,
            desc: false,
            page: 1,
            search: "",
            sorting: "courseid",
            courses: [],
            showCourseDetails: null
        }
        this.titles = ["שם קורס מקוצר", "פרויקט", "מדריך"];

    }
    componentDidMount() {
        const { coursestatus, desc, page, search, sorting, searchPages } = this.state;
        const data = { coursestatus, desc, page : page - 1, search, sorting, searchPages };
        server(data, "SearchCourses").then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                console.log(res.data);
                this.setState({
                    courses: res.data.courses,
                    searchPages: res.data.pages
                })
            }
        }, err => {
            console.error(err)
        }
        )
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.coursestatus !== this.state.coursestatus  || prevState.page !== this.state.page || prevState.search !== this.state.search) {
            const { coursestatus, desc, page, search, sorting, searchPages } = this.state;
            const data = { coursestatus, desc, page : page - 1, search, sorting, searchPages };
            server(data, "SearchCourses").then(res => {
                if (res.data.error) {
                    console.error(res.data.error)
                } else {
                    this.setState({
                        courses: res.data.courses,
                        searchPages: res.data.pages
                    })
                }
            }, err => {
                console.error(err)
            }
            )
        }
    }
    getFilteredData = (key) => {
        this.setState({ coursestatus: key })
    }
    handleSearch = (val) => {
        this.setState({ search: val })
    }
    updatePage = (page) => {
        this.setState({ page: page})
    }
    courseDetails = (id) => {
        this.setState({ showCourseDetails: "id" })
    }
    render() {
        const { courses, showCourseDetails } = this.state;
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        if (this.state.showCourseDetails !== null) {
            return <Redirect to={'/courses/' + showCourseDetails} />
        }

        const courseDisplay = {};
        for (let i = 0; i < courses.length; i++) {
            courseDisplay[courses[i].courseid] = [];
            courseDisplay[courses[i].courseid].push(courses[i].subname);
            courseDisplay[courses[i].courseid].push(courses[i].project);
            courseDisplay[courses[i].courseid].push(courses[i].teachers);
        }

        const buttonsData = [
            { key: 1, title: "קורסים פעילים" },
            { key: 0, title: "לא פעילים" }
        ]
        

        return (
            <div>
                <PortalNavbar header="קורסים" />
                <SearchBar searchLabel="חיפוש קורס" handleSearch={this.handleSearch} updatePage={this.updatePage} pages={this.state.searchPages} currentPage={this.state.page } />
                <ItemsTable titles={this.titles} items={courseDisplay} handleClick={this.courseDetails} />
                <div className="courses-activeFilter">
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
)(CoursesPage);