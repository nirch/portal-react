import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect, params } from 'react-router-dom';
import InPageNavbar from '../../components/inPageNavbar/inPageNavbar';
import CourseDetailsTab from '../../components/courseTabs/CourseDetailsTab';
import CourseSyllabus from '../../components/courseTabs/CourseSyllabus';
import server from '../../shared/server';
import DetailsHeader from '../../components/detailsHeader/detailsHeader';



class CourseDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableBack: false,
            courseid: null,
            courseName: "",
            teacher: "",
            subjects: [],
            courseSubname: "",
            tags: [],
            arabic: ""

        }
    }
    componentDidMount() {
        const pagePath = window.location.href.split("/");
        const courseid = pagePath[pagePath.length - 1];

        const data = { courseid };

        server(data, "GetCourseById").then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                console.log(res.data);
                this.setState({
                    courseName: res.data.name,
                    teacher: res.data.primaryTeacherName,
                    subjects: res.data.subjects,
                    courseSubname: res.data.subname,
                    arabic: res.data.subnameinarabic,
                    tags: res.data.tags,
                })
            }
        }, err => {
            console.error(err);
        })
    }
    enableBack = () => {
        this.setState({ enableBack: true })
    }
    render() {
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        if (this.state.enableBack) {
            return <Redirect to='/courses' />
        }
        const {courseName, teacher, subjects, courseSubname, arabic, tags} = this.state;
        const courseDetails = { courseName, teacher, subjects, courseSubname, arabic, tags };
        const tabsData = [
            { key: 1, title: "קורס", component: <CourseDetailsTab courseDetails = {courseDetails} /> },
            { key: 2, title: "סיליבוס", component: <CourseSyllabus courseDetails = {courseDetails}/> },
            { key: 3, title: "סטודנטים", component: <div>3</div> },
            { key: 4, title: "מדריכים", component: <div>4</div> }
        ]
        
    

   
        return (
            <div>
                <PortalNavbar header="קורסים" enableBack={this.enableBack} />
                <DetailsHeader propfileImg={false} cardTitle={this.state.courseSubname} cardText={this.state.courseName} />
                <InPageNavbar tabs={tabsData} />

            </div>
        );
    }
}


const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(CourseDetailsPage);
