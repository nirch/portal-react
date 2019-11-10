import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Container, Button , DropdownButton, Dropdown, Row, Col} from 'react-bootstrap';
import server from '../../shared/server'
import SelectDate from '../../components/hoursApprove/selectDate.js'

class InsertHoursReport extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            GetReports: [],
            GetCourses:[],
            GetProjects:[],
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            date: new Date().getDate(),
            status: "0", // waiting by default 0 - new report (for change 1 - success, -1 - decline)
            totalHours: 0  // total hours for report - for new report defaut is 0
        }
        this.getDate = this.getDate.bind(this);
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
            }
        }, err => {
            console.error(err);
        }) 
        this.getDataFromServer(this.state.month,this.state.year);
        this.getCourses();
        
        
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
    getDate(month,year,date){   // get values from selectDate component . month and year for server call, date for new report 
        this.setState({month:month,year:year,date:date})
        this.getDataFromServer(month,year);
        console.log(month,year, date)
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

         const { GetReports, GetCourses, GetProjects,status , totalHours} = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        console.log(GetReports)
        console.log(GetCourses)
        console.log(GetProjects)
        
        
       
     
        return (
        <div className=" report-font-size " >
        <Container className=" report-font-size " >
           
           <Row className="sticky-top bg-white">
             <Col>
             
              <PortalNavbar />
              <SelectDate changeDate={this.getDate} status={status} totalHours={totalHours}/>
             
             </Col>
           </Row>
            
              <Row>
                  <Col>

                  <div className="menu-field">
                        <div className="menu-text">  <span className="pr-3">פרויקט </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                        <div className="dropdown-content">
                         <ul>
                             <li>
                             <span href="#">Link 1</span>
                             </li>
                             <li>
                             <span href="#">Link 2</span>
                             </li>
                             <li>
                             <span  className="a-link" href="#">Link 3</span> 
                             </li>
                         </ul>
                        </div>
                  </div>
                  <div className="menu-field">
                        <div className="menu-text">  <span className="pr-3">פרויקט </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                      <div className="dropdown-content">
                         <ul>
                             <li>
                             <span href="#">Link 1</span>
                             </li>
                             <li>
                             <span href="#">Link 2</span>
                             </li>
                             <li>
                             <span  className="a-link" href="#">Link 3</span> 
                             </li>
                         </ul>
                        </div>
                  </div>
                  <div className="menu-field">
                        <div className="menu-text">  <span className="pr-3">פרויקט </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                      <div className="dropdown-content">
                         <ul>
                             <li>
                             <span href="#">Link 1</span>
                             </li>
                             <li>
                             <span href="#">Link 2</span>
                             </li>
                             <li>
                             <span  className="a-link" href="#">Link 3</span> 
                             </li>
                         </ul>
                        </div>
                  </div>
                  </Col>
              </Row>
             <Row>
                 <Col className="px-0">
                 <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >פרויקט </span> </div>
                </div>
             </Col>
             <Col className="px-0">
             <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >פרויקט </span> </div>
                </div>
             </Col>
             </Row>
             <Row>
                 <Col className="px-0">
                 <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >פרויקט </span> </div>
                </div>
             </Col>
             <Col className="px-0">
             <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >פרויקט </span> </div>
                </div>
             </Col>
             </Row>
            <Row>
            <Col>
             <div className="menu-field">
                        <div className="menu-text">  <span className="pr-3">פרויקט </span> </div>
                 </div>
                 </Col>
                 </Row>
                 <Row  className=" fixed-bottom bg-white align-items-center justify-content-md-center px-3 " >
              <Col className=" px-1 text-center "> 
                  <img src="images\CourseControls\Save\drawable-mdpi\noun_save_2429243.png" alt="save"></img>
                  </Col>
                  <Col className=" px-1 text-center ">
                  <img src="images\CourseControls\Copy\drawable-mdpi\noun_copy_573715.png" alt="copy"></img>
                  </Col>
                 
                  <Col className=" plus text-center mx-auto ">
                  <img src="images\CourseControls\Plus\plus.png" alt="copy"></img>
                  </Col>
                  
                  <Col className=" px-1 text-center ">
                  <img src="images\CourseControls\Delete\drawable-mdpi\noun_delete_1610851.png" alt="delete"></img>
                  </Col>
                  <Col className=" px-1 text-center ">
                   <img src="images\CourseControls\Back\drawable-mdpi\noun_back_arrow_2690272.png" alt="back"></img>
                  </Col>
              </Row>

          </Container></div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(InsertHoursReport);
