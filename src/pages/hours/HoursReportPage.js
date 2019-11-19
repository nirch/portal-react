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
            totalHours: "",
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
                this.calculateTotalHours(data)
            }
        }, err => {
            console.error(err);
        })
    }
    getMonthYear(month,year){
        this.setState({month:month,year:year}) // set state with data from component 
        this.getDataFromServer(month,year); //call to server when change the month 
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
    calculateTotalHours = (data) => {
        //const{GetReports} = this.state
        let GetReports = data
        var totalMin = 0
        for(let i=0;i<GetReports.length;i++){
            let repstart = (+GetReports[i].starthour.split(":")[0]) * 60  + (+GetReports[i].starthour.split(":")[1])  ; 
            let repend = (+GetReports[i].finishhour.split(":")[0]) * 60  + (+GetReports[i].finishhour.split(":")[1])  ; 
            totalMin+=repend-repstart
        }
      
       let minutes = totalMin%60
       let hours = (totalMin-minutes)/60
       let total 
       if (minutes == 0)
           total = hours.toString() 
           else 
              total = hours.toString() + ":" + minutes.toString()
       this.setState({totalHours:total})
       //return result 
    }
    render() {

         const { GetReports, totalHours, GetProjects, GetCourses } = this.state;

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
       
        console.log(GetCourses)  
        console.log(GetReports)  

        let rows =  GetReports.map((item) => {  // generate table with customers
                let bgStyle; 
                switch (item.approval) {
                     case "-1": 
                        bgStyle =  " bg-red "  
                        break;
                        case "1":    
                        bgStyle = " bg-green " 
                        break;
                     default:  
                         bgStyle = " bg-yellow "   
                 }
                 let style = "report-row py-2 " + bgStyle
                 let hoursDiff = this.diff(item.starthour,item.finishhour)
                 let project = GetProjects.find((proj) => {if(proj.projectid===item.projectid) return proj})
                //  let course ={}
                //  if (item.courseid == null)
                //      course.name = ""
                //  else
                //      course = GetCourses.find((crs)=>{if (crs.courseid == item.courseid) return crs})
                // console.log(course)
                 return  <Row className={style}>
                      <Col className="px-1 text-center">
                       {item.date}
                      </Col >
                      <Col className="px-1 text-center">
                      {project.projectname}
                      </Col>
                      <Col className="px-1 text-center">
                      {/* {course.name} */}
                      {item.courseid}
                      </Col>
                      <Col className="px-1 text-center"> 
                      {hoursDiff}  <img src="images\threedots.png" className=" threedots " alt="details"></img>
                      </Col>
                                            
                   </Row>
         }
        )
     
        return (
            <Container  >
           
           <Row className="sticky-top bg-white shadow">
             <Col>
             
              <PortalNavbar header="דיווח שעות" />
                 <SelectMonth changeMonthYear={this.getMonthYear}/>
                 <Row>
               <Col className=" text-center hours-header-text pb-2">
                <span>סהייכ שעות:</span><span className="mr-3 ">{totalHours}</span>
                </Col>
              </Row>  
             </Col>
             
           </Row>
          
              <Row className="report-row justify-content-md-center report-font-bold pt-2 pb-1"> 
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
              <Row className=" report-middle " >
                  <Col>
                  {rows}
                  </Col>
              </Row>
              <Row className="  fixed-bottom bg-white align-items-center justify-content-md-center px-3" >
              <Col className=" px-1 text-center "> 
                  <img src="images\CourseControls\Save\drawable-mdpi\noun_save_2429243.png" alt="save"></img>
                  </Col>
                  <Col className=" px-1 text-center report-opacity">
                  <img src="images\CourseControls\Copy\drawable-mdpi\noun_copy_573715.png" alt="copy"></img>
                  </Col>
                 
                  <Col className=" plus text-center mx-auto ">
                 
                  <Link to="/add-hours-report"><img src="images\CourseControls\Plus\plus.png" alt="add new report" ></img></Link>
                  </Col>
                  
                  <Col className=" px-1 text-center report-opacity">
                  <img src="images\CourseControls\Delete\drawable-mdpi\noun_delete_1610851.png" alt="delete"></img>
                  </Col>
                  <Col className=" px-1 text-center report-opacity">
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
