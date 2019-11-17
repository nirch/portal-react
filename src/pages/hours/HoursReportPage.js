import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect,Link } from 'react-router-dom'
import { Container, Button , Table, Row, Col} from 'react-bootstrap';
import server from '../../shared/server'
import  SelectMonth from '../../components/hoursApprove/selectMonth'

class HoursReportPage extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            GetReports: [],
            GetCourses:[],
            GetProjects:[],
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1
        }
        this.getMonthYear = this.getMonthYear.bind(this);
        }
    
    componentDidMount(){
        let data = {};
        server(data, "GetProjects").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error in login");
            } else {
                data = res.data;
                this.setState({GetProjects:data})
                this.getDataFromServer(this.state.month,this.state.year);
                this.getCourses();
            }
        }, err => {
            console.error(err);
        }) 
      
        
        
    }
    getDataFromServer(month,year){
        var data = {
            month : month,
            year : year
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
    getMonthYear(month,year){
        this.setState({month:month,year:year})
        this.getDataFromServer(month,year);
        console.log(month,year)
    }
    
    diff(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
    
        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0)
           hours = hours + 24;
        //console.log((hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes)
        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }
    
    getCourses(){
        var data = {
            coursestatus: 1,
            desc: false,
            page: 0,
            search: "",
            sorting: "courseid"
        };
        server(data, "SearchCourses").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error in login");
            } else {
                data = res.data.courses;
                this.setState({GetCourses:data})
            }
        }, err => {
            console.error(err);
        }) 
    }
   
    render() {

         const { GetReports, GetCourses, GetProjects } = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        // console.log(GetReports)
        // console.log(GetCourses)
        // console.log(GetProjects)
        
        
        let rows =  GetReports.map((item) => {  // generate table with customers
                let bgStyle; 
                switch (item.approval) {
                     case "-1": 
                        bgStyle =  " bg-danger "  
                        break;
                        case "1":    
                        bgStyle = " bg-success " 
                        break;
                     default:  
                         bgStyle = " bg-warning "   
                 }
                 let style = " report-status mt-2 py-2 " + bgStyle
                 let hoursDiff = this.diff(item.starthour,item.finishhour)
                 let project = GetProjects.find((proj) => {if(proj.projectid===item.projectid) return proj})
            //    console.log(project)
                return  <Row className={style}>
                      <Col className="px-1 text-center">
                       {item.date}
                      </Col >
                      <Col className="px-1 text-center">
                      {project.projectname}
                      </Col>
                      <Col className="px-1 text-center">
                      {item.courseid}
                      </Col>
                      <Col className="px-1 text-center">
                      {hoursDiff}
                      </Col>
                     
                   </Row>
         }
        )
     
        return (
            <Container className=" report-container " >
           
           <Row className="sticky-top bg-white">
             <Col>
             
              <PortalNavbar header="דיווח שעות" />
                 <SelectMonth changeMonthYear={this.getMonthYear}/>
             
             </Col>
           </Row>
                  
              <Row className=" justify-content-md-center report-font-bold  py-2">
              <Col xs  className=" px-1 text-center " >
                    <span>תאריך</span>
                  </Col>
                  <Col xs  className=" px-1 text-center ">
                    <span>פרויקט</span>
                  </Col>
                   <Col xs className=" px-1 text-center ">
                    <span>נושא פעילות</span>
                  </Col>
                  <Col xs  className=" px-1 text-center " >
                    <span>סהייכ שעות</span>
                  </Col>
                </Row>
              <Row>
                  <Col>
                  {rows}
                  </Col>
              </Row>
              <Row className=" fixed-bottom bg-white align-items-center justify-content-md-center px-3" >
              <Col className=" px-1 text-center "> 
                  <img src="images\CourseControls\Save\drawable-mdpi\noun_save_2429243.png" alt="save"></img>
                  </Col>
                  <Col className=" px-1 text-center ">
                  <img src="images\CourseControls\Copy\drawable-mdpi\noun_copy_573715.png" alt="copy"></img>
                  </Col>
                 
                  <Col className=" plus text-center mx-auto ">
                   {/* <div className="plus-cyrcle"><span >+</span></div> */}
                  <Link to="/add-hours-report"><img src="images\CourseControls\Plus\plus.png" alt="copy" ></img></Link>
                  </Col>
                  
                  <Col className=" px-1 text-center ">
                  <img src="images\CourseControls\Delete\drawable-mdpi\noun_delete_1610851.png" alt="delete"></img>
                  </Col>
                  <Col className=" px-1 text-center ">
                   <img src="images\CourseControls\Back\drawable-mdpi\noun_back_arrow_2690272.png" alt="back"></img>
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
