import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Row, Col} from 'react-bootstrap';

class HoursReportPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
                courses :[{
                            actionid: "1",
                            approval: "0",
                            automatic: "0",
                            carkm: null,
                            checkdate: null,
                            comment: "",
                            cost: null,
                            courseid: "398",
                            date: "05/11/2019",
                            finishhour: "14:45",
                            missingreportsubject: "0",
                            projectid: "6",
                            reportcopyid: "80925",
                            reportid: "81687",
                            starthour: "13:00",
                            userid: "933",
                        project: "UP PROGRESS",
                        actionName: "שם פעילות כללית",
                        hours: "9"
                     },
                     {
                        actionid: "1",
                        approval: "0",
                        automatic: "0",
                        carkm: null,
                        checkdate: null,
                        comment: "",
                        cost: null,
                        courseid: "398",
                        date: "05/11/2019",
                        finishhour: "14:45",
                        missingreportsubject: "0",
                        projectid: "6",
                        reportcopyid: "80925",
                        reportid: "81687",
                        starthour: "13:00",
                        userid: "933",
                    project: "UP PROGRESS",
                    actionName: "שם פעילות כללית",
                    hours: "9"
                 }
                    ]}
        }
    
   
    render() {

         const { courses } = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        let rows =  courses.map(item =>   // generate table with customers
                   <Row my="3" className="report-status">
                      <Col>
                       {item.date}
                      </Col>
                      <Col>
                      {item.project}
                      </Col>
                      <Col>
                      {item.actionName}
                      </Col>
                      <Col>
                      {item.hours}
                      </Col>
                   </Row>
        )
     
        return (
            <Container className="report-font-size" >
              <Row className="justify-content-md-center">
              <Col xs  md="auto" >
                    <span>תאריך</span>
                  </Col>
                  <Col xs  md="auto">
                    <span>פרויקט</span>
                  </Col>
                   <Col xs  md="auto">
                    <span>נושא פעילות</span>
                  </Col>
                  <Col xs  md="auto">
                    <span>סהייכ שעות</span>
                  </Col>
                  

              </Row>
              <Row>
                  <Col>
                  {rows}
                  </Col>
              </Row>
              <Row>
                  <Col>
                   <span></span>
                  </Col>
              </Row>
          </Container>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(HoursReportPage);
