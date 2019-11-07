import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Container, Button , Table, Modal, Row, Col} from 'react-bootstrap';
import server from '../../shared/server'

class HoursReportPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            GetReports: [],
            month: 11,
            year: 2019,
        }
        }
    
    componentDidMount(){
        var data = {
            month : this.state.month,
            year : this.state.year
        };
        server(data, "GetReports").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error in login");
            } else {
                data = res.data;
                this.setState({GetReports:data})
            }
        }, err => {
            console.error(err);
        })
        
    }
    //https://pil1.appleseeds.org.il/dcnir/server/datagate.php?type=GetNetaCandidatesViewers
    //https://pil1.appleseeds.org.il/dcnir/server/datagate.php?type=GetReports
    //https://pil1.appleseeds.org.il/dcnir/server/datagate.php?type=GetMyReportingPerimeter
    render() {

         const { courses, GetReports } = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        console.log(GetReports)

        let rows =  GetReports.map((item) => {  // generate table with customers
                let bgStyle; 
                switch (item.checkdate) {
                     case null: 
                        bgStyle =  " bg-warning "  
                        break;
                     default:  
                         bgStyle = " bg-success "   
                 }
                 let style = " report-status mt-2 py-3 " + bgStyle
                 return  <Row className={style}>
                      <Col className="px-1 text-center">
                       {item.date}
                      </Col >
                      <Col className="px-1 text-center">
                      {item.projectid}
                      </Col>
                      <Col className="px-1 text-center">
                      {item.courseid}
                      </Col>
                      <Col className="px-1 text-center">
                      {item.hours}
                      </Col>
                   </Row>
         }
        )
     
        return (
            <Container className="report-font-size" >
              <Row className="justify-content-md-center report-font-bold">
              <Col xs  className="px-1 text-center" >
                    <span>תאריך</span>
                  </Col>
                  <Col xs  className="px-1 text-center">
                    <span>פרויקט</span>
                  </Col>
                   <Col xs className="px-1 text-center">
                    <span>נושא פעילות</span>
                  </Col>
                  <Col xs  className="px-1 text-center" >
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
