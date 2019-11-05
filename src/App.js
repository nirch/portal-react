import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import CoursesPage from './pages/courses/CoursesPage' 
import CourseDetailsPage from './pages/courses/CourseDetailsPage' 
import UsersPage from './pages/users/UsersPage' 
import UserDetailsPage from './pages/users/UserDetailsPage' 

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeUser: null
    };
  }

  render() {
    const {activeUser} = this.state;

    return (
      <Switch>
        <Route exact path="/">
          <LoginPage activeUser={activeUser} />
        </Route>
        <Route exact path="/courses">
        <CoursesPage activeUser={activeUser} />
      </Route>
      <Route path="/courses/:id">
        <CourseDetailsPage activeUser={activeUser} />
      </Route>
      <Route exact path="/users">
        <UsersPage activeUser={activeUser} />
      </Route>
      <Route path="/users/:id">
        <UserDetailsPage activeUser={activeUser} />
      </Route>
      {/* <Route path="/hours-report">
        <HoursReportPage activeUser={activeUser} />
      </Route>
      <Route path="/hours-approve">
        <HoursApprovePage activeUser={activeUser} />
      </Route> */}
      </Switch>
    );
  }
}

export default App;
