import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import CoursesPage from './pages/courses/CoursesPage'
import CourseDetailsPage from './pages/courses/CourseDetailsPage'
import UsersPage from './pages/users/UsersPage'
import UserDetailsPage from './pages/users/UserDetailsPage'
import HoursReportPage from './pages/hours/HoursReportPage'
import HoursApprovePage from './pages/hours/HoursApprovePage'
import { loginAction } from "../src/store/reducers/ActiveUser/actions";
import { connect } from "react-redux";

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
   if (localStorage.activeUser){
     
    this.props.loginAction(JSON.parse(localStorage.activeUser))
   }
    
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <LoginPage/>
        </Route>
        <Route exact path="/courses">
          <CoursesPage/>
        </Route>
        <Route path="/courses/:id">
          <CourseDetailsPage/>
        </Route>
        <Route exact path="/users">
          <UsersPage/>
        </Route>
        <Route path="/users/:id">
          <UserDetailsPage/>
        </Route>
        <Route path="/hours-report">
          <HoursReportPage/>
        </Route>
        <Route path="/hours-approve">
          <HoursApprovePage/>
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser
});

const mapDispatchToProps = {
  loginAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

