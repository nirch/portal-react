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
                            userid: "933" }]}
        }
    
   
    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        return (
            <Container>
              <Row className="justify-content-md-center">
              <Col xs={3}>
                    <span>תאריך</span>
                  </Col>
                  <Col xs={3}>
                    <span>פרויקט</span>
                  </Col>
                   <Col xs={3}>
                    <span>נושא פעילות</span>
                  </Col>
                  <Col xs={3}>
                    <span>סהייכ שעות</span>
                  </Col>
                  

              </Row>
              <Row>
                  <Col>
                  <span>{this.state.courses[0].actionid}</span>
                  </Col>
              </Row>
              <Row>
                  <Col>
                   <span>bottom</span>
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
