import React, { Component } from 'react';
import ItemsTable from './../components/itemsTable/itemsTable';
import { Spinner } from 'react-bootstrap';
import server from './../shared/server';
import './../pages/users/users.css'
import SearchBar from './../components/SearchBar';

class UserCourses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            roleid: "2",
            search: "",
            userId: "",

            courses: [],
            numberOfPages: 1,

        };
        this.titles = ["קורס", "פרויקט"];
        this.isLoading = true;
    }

    componentDidMount() {
        const pagePath = window.location.href.split("/");
        const userId = pagePath[pagePath.length - 1];

        const { page, roleid, search, } = this.state;
        const data = { page: page - 1, roleid, search, userId };

        server(data, "GetCoursesWithUserEnrolledAsRole").then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                this.isLoading = false;
                this.setState({ courses: res.data.enrolled, numberOfPages: res.data.pages });
            }
        }, err => {
            console.error(err);
        })
    }
    courseSearch = (val) => {
        this.isLoading = true;
        this.setState({ search: val, page: 1 });
    }
    courseCurrentPage = (page) => {
        this.isLoading = true;
        this.setState({ page });
    }

    render() {
        const { courses, numberOfPages, page } = this.state;

        const courseDisplay = {}
        for (var i = 0; i < courses.length; i++) {
            courseDisplay[courses[i].courseid] = [];
            courseDisplay[courses[i].courseid].push(courses[i].coursename);
            courseDisplay[courses[i].courseid].push(courses[i].projectname);
        }

        var displayItemsTable = this.isLoading ? <div className="user-spinner">טוען נתונים, אנא המתן  <Spinner animation="border" variant="primary" /></div> :
            <ItemsTable items={courseDisplay} titles={this.titles} handleClick={this.courseDetails} />

        return (
            <div>
                <SearchBar searchLabel="חיפוש קורס" handleSearch={this.courseSearch} updatePage={this.courseCurrentPage}
                    pages={numberOfPages} currentPage={page} />

                <div className="users-table">
                    {displayItemsTable}
                </div>
            </div>
        );
    }
}
export default UserCourses;