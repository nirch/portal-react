import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Container, Button , DropdownButton, Dropdown, Row, Col} from 'react-bootstrap';
import { TimePicker } from 'antd';
import server from '../../shared/server';
import 'antd/dist/antd.css';
import SelectDate from '../../components/hoursApprove/selectDate.js'

class InsertHoursReport extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            GetReports: [],
            GetCourses:[],
            GetProjects:[],
            projectsList:[],
            subjectsList:[],

            selectedProject: "פרויקט",
            projectsVisibility: "d-none",
            selectedCourse: "מס/שם קורס",
            coursesVisibility: "d-none",
            selectedSubject: "נושא פעילות",
            subjectsVisibility: "d-none",
            selectedStartHour: "שעת התחלה",
            startHourVisibility: "d-none",
            selectedEndHour: "שעת סיום",
            endHourVisibility: "d-none",
           
            openProjectsListStyle: "",
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            date: new Date().getDate(),
            status: "0", // waiting by default 0 - new report (for change 1 - success, -1 - decline)
            totalHours: 0  // total hours for report - for new report defaut is 0
        }
        this.projectsStyle = React.createRef();
        
        this.getDate = this.getDate.bind(this);
        this.openProjectsList = this.openProjectsList.bind(this);
        
        }
    
    componentDidMount(){
        let data = {};
        server(data, "GetMyReportingPerimeter").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error to read data from server");
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
                alert("error to read data from server");
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
   
    openProjectsList =  (e) => {
        const{GetProjects,projectsVisibility} = this.state;
        console.log("openProjectsList")
        console.log(e.currentTarget)
        let projectsArrayData = Object.values(GetProjects)
        let showData = [];
        let result;
        let show;
        let style = " dropdown "
       // this.setState({})
        if(projectsVisibility=="d-none")
            show = "d-block"
        else  show = "d-none"
       
       // this.setState({})
        showData = projectsArrayData.map((proj)=>
                            <div className="dropdown-content" onClick={() => {this.setState({selectedProject:e.target.innerHTML})}}>
                                 {proj.projectName}
                            </div>
                   )
        style+= show
        result = <div className={style} >
                               {showData}
                            </div>
      
        this.setState({coursesVisibility:"d-none",subjectsVisibility:"d-none", endHourVisibility: "d-none",startHourVisibility: "d-none", projectsVisibility:show, projectsList:result})
         
    }

    openCoursesList =  (e) => {
        const{GetProjects,selectedProject, coursesVisibility} = this.state;
        console.log("openCoursesList")
        let projectsArrayData = Object.values(GetProjects)
        console.log(selectedProject)
        let showData = [];
        let result;
        let show;
        let style = " dropdown "

       // this.setState({})
        if(coursesVisibility == "d-none")
             show = "d-block"
        else  show = "d-none"
     //   this.setState({coursesVisibility:show})
        if(selectedProject === "פרויקט")
           showData = []
        else{
            let proj =  projectsArrayData.find((proj)=>{if(proj.projectName==selectedProject)return proj})
            showData = proj.courses.map((crc)=>
                             <div className="dropdown-content" onClick={() =>{this.setState({selectedCourse:e.target.innerHTML})}}>
                                  {crc.courseName} - {crc.courseid}
                             </div>
                    )
                    style+= show
                    result = <div className={style} >
                                {showData}
                             </div>
           }
           this.setState({projectsVisibility:"d-none",subjectsVisibility:"d-none", endHourVisibility: "d-none",startHourVisibility: "d-none", coursesVisibility:show, coursesList:result})
    }


    openSubjectsList =  (e) => {
        const{GetProjects,selectedProject,selectedCourse, subjectsVisibility} = this.state;
        console.log("openSubjectsList")
        let projectsArrayData = Object.values(GetProjects)
        console.log(selectedCourse)
        let showData = [];
        let result;
        let show = "";
        let style = " dropdown "

       // this.setState({})
        if(subjectsVisibility == "d-none")
             show = "d-block"
        else  show = "d-none"
       // this.setState({subjectsVisibility:show})
        if(selectedProject === "פרויקט" || selectedCourse === "מס/שם קורס")
           showData = []
        else{
            let proj =  projectsArrayData.find((proj)=>{if(proj.projectName==selectedProject)return proj})
            showData = proj.subjects.map((sbj)=>
                             <div className="dropdown-content" onClick={() => {this.setState({selectedSubject:e.target.innerHTML})}}>
                                  {sbj.subject} 
                             </div>
                    )
                    style+= show
                    result = <div className={style} >
                                {showData}
                             </div>
           }
           this.setState({coursesVisibility:"d-none",projectsVisibility:"d-none", endHourVisibility: "d-none",startHourVisibility: "d-none", subjectsVisibility:show, subjectsList:result})
    }

    getTimes(){
        var startTime = new Date();
       startTime.setUTCHours(-2);
       startTime.setUTCMinutes(0);
       startTime.setTime(startTime.getTime());
       let showStartTime = startTime.getHours() + ":" + startTime.getMinutes()
       let timesArray = []
      
       let hour, minute;
       for(let i=0;i<96;i++){
         hour = startTime.getHours()
         if(hour<10)
            hour = "0" + startTime.getHours()
         minute = startTime.getMinutes()
         if (minute<10)
              minute = "0" + startTime.getMinutes()
         showStartTime = hour + ":" + minute
         timesArray.push(showStartTime)
         startTime.setTime(startTime.getTime()+ (15 * 60 * 1000))  
       } 
       return timesArray;
    }

    openStartHour =(e)=>{
       const{startHourVisibility} = this.state
      // this.setState({coursesVisibility:"d-none",projectsVisibility:"d-none",subjectsVisibility:"d-none",endHourVisibility: "d-none"})
       console.log("openStartHour")
       let showData = [];
       let result;
       let show = "";
       let style = " dropdown show-times "
       if(startHourVisibility == "d-none")
             show = "d-block"
        else  show = "d-none"
     //  this.setState({startHourVisibility:show})
       let timesArray = this.getTimes();
      // console.log(timesArray);
     
        style+= show
        showData = timesArray.map((time)=>
        <div className="dropdown-content" onClick={() => {this.setState({selectedStartHour:e.target.innerHTML})}}>
             {time} 
        </div>
         )
        // console.log(showData);
        result = <div className={style} >
                  {showData}
                 </div>
        this.setState({coursesVisibility:"d-none",projectsVisibility:"d-none",subjectsVisibility:"d-none",endHourVisibility: "d-none", startHourVisibility:show, startHoursList:result})         
    }

    openEndHour =(e)=>{
       const{endHourVisibility,selectedStartHour,selectedEndHour} = this.state 
     //  this.setState({coursesVisibility:"d-none",projectsVisibility:"d-none",subjectsVisibility:"d-none", startHourVisibility: "d-none"})
       console.log("openEndHour")
       let showData = [];
       let result;
       let show = "";
       let style = " dropdown show-times "
       if(endHourVisibility == "d-none")
             show = "d-block"
        else  show = "d-none"
    //   this.setState({endHourVisibility:show})
       let timesArray = this.getTimes();
      // console.log(timesArray);
     
        style+= show
        if( selectedStartHour === "שעת התחלה")
           result = ""
        else {
          //  console.log(timesArray.indexOf(selectedStartHour))
            let endTimesArray = []
            for(let i=timesArray.indexOf(selectedStartHour)+1;i<timesArray.length;i++){
                 endTimesArray.push(timesArray[i])   
                }
       //     console.log(endTimesArray)
            showData = endTimesArray.map((time)=>
                <div className="dropdown-content" onClick={() => {this.setState({selectedEndHour:e.target.innerHTML})}}>
                    {time} 
                </div>
            )
            // console.log(showData);
             result = <div className={style} >
                  {showData}
                 </div>
            }
        this.setState({coursesVisibility:"d-none",projectsVisibility:"d-none",subjectsVisibility:"d-none", startHourVisibility: "d-none", endHourVisibility:show, endHoursList:result})  
       
        if (isNaN(selectedStartHour)||isNaN(selectedEndHour)){
            let diff = this.diff(selectedStartHour, selectedEndHour)
            this.setState({totalHours:diff})
        }
       console.log(selectedStartHour)
       console.log(selectedEndHour)
    }
componentDidUpdate(){
    const{selectedStartHour,selectedEndHour} = this.state 
    //console.log("diff: " + diff )
}

    render() {

        const { projectsList, coursesList, subjectsList, startHoursList, endHoursList, selectedStartHour, selectedEndHour, GetProjects, status , totalHours, selectedSubject, selectedProject, selectedCourse} = this.state;
        console.log(this.props.activeUser)
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        //console.log(GetReports)
        //console.log(GetCourses)
        //console.log(GetProjects)
        //console.log(selectedProject)
        
        //88888888888888888888888888888888888888

       
        //88888888888888888888888888888888888888
       
     
        return (
        <div className=" report-font-size " >
        <Container className=" report-font-size " >
           
           <Row className="sticky-top bg-white">
             <Col>
             
              <PortalNavbar />
{/* getDate(month,year,date) date - full date , status -1 - denied, 0 - await, 1 - success, totalHours - total hours of current report  */}
              <SelectDate changeDate={this.getDate} status={status} totalHours={totalHours}/> 
             
             </Col>
           </Row>
            
              <Row>
                  <Col>
                  <div className="menu-field" id="projectsList"  onClick = {this.openProjectsList}>
    
                  <div className="menu-text">  <span className="pr-3">{selectedProject}</span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                       {projectsList}
                  </div>
 {/* <div className="menu-text">  <span className="pr-3">{selectedProject}</span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                       {result}
                  </div> */}

                                 
                  <div className="menu-field" id="coursesList"  onClick={this.openCoursesList}>
                        <div className="menu-text" >  <span className="pr-3">{selectedCourse} </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                        {coursesList}
                  </div>
            
            
                  <div className="menu-field" id="subjectsList"  onClick={this.openSubjectsList}>
                        <div className="menu-text">  <span className="pr-3">  {selectedSubject}   </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                        {subjectsList}
                  </div>
                  </Col>
              </Row>
      
      
             <Row>
                 <Col className="px-0">
                 <div className="menu-field ml-5 mr-3" id="startHour"  onClick={this.openStartHour}>
                        <div className="menu-text text-center ">   {selectedStartHour}  </div>
                        {startHoursList}
                </div>
             </Col>
             <Col className="px-0">
             <div className="menu-field ml-5 mr-3" id="endHour"  onClick={this.openEndHour}>
                        <div className="menu-text text-center ">  {selectedEndHour}  </div>
                        {endHoursList}
                </div>
             </Col>
             </Row>
           
           
           
             <Row>
                 <Col className="px-0">
                 <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >רכב פרטי (ק"מ)</span> </div>
                </div>
             </Col>
             <Col className="px-0">
             <div className="menu-field ml-5 mr-3">
                        <div className="menu-text text-center ">  <span >תחבורה ציבורית (ש"ח)</span> </div>
                </div>
             </Col>
             </Row>
            <Row>
            <Col>
             <div className="menu-field">
                        <div className="menu-text">  <span className="pr-3">הערות</span> </div>
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
