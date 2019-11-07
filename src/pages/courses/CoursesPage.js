import React, { Component } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ActivityFilter from '../../components/ActivityFilter';
import server from '../../shared/server';
import { Container } from 'react-bootstrap'


class CoursesPage extends Component {
    constructor(props) {
        super(props);

    }
    getFilteredData = (key) => {
        if (key == 1) {
            console.log("shalom" + key)
        }
        if (key == 2) {
            console.log("by" + key)
        }
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
        <Container>
            <PortalNavbar />

            <h1>קורסים</h1>
           
            <ActivityFilter makeChoice = {this.getFilteredData} buttons={buttonsData} />
        </Container>
    );
}
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(CoursesPage);