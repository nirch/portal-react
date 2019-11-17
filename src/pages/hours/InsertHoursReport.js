import React, { Component } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Container, Button , DropdownButton, Dropdown, Row, Col} from 'react-bootstrap';
import server from '../../shared/server';
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
            projectsArrayData: [],
            coursesOfProject: [],
            subjectsOfProject: [],
            timesArray: [],

            selectedProject: "פרויקט",
            selectedCourse: "מס/שם קורס",
            selectedSubject: "נושא פעילות",
            selectedStartHour: "שעת התחלה",
            selectedEndHour: "שעת סיום",
          
            visibleProjectList: false,
            visibleCoursesList: false,
            visibleSubjectsList:false,
            visibleStartHourList: false,
            visibleEndHourList: false,
            visibleKmInput: false,
            visibleNisInput: false,
            visibleRemark: false,

            errorProject:false,
            errorSubject:false,
            errorCourse:false, 
            errorStartHour:false,
            errorEndHour:false,
            errorKm:false ,
            errorNis:false,

            insertedKm: ' רכב פרטי (ק"מ) ',
            insertedNis:'  תחבורה ציבורית (ש"ח) ',
            insertedRemark: ' הערות ',
            openProjectsListStyle: "",
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            date: new Date().getDate(),
            day: new Date(),
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
                let projectsArrayData = Object.values(data)
                console.log(projectsArrayData)
                let timesArray = this.getTimes();
                this.setState({projectsArrayData:projectsArrayData, timesArray: timesArray})
            }
        }, err => {
            console.error(err);
        }) 
       
       this.getDataFromServer(this.state.month,this.state.year);
      
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
    getDate(month,year,day){   // get values from selectDate component . month and year for server call, date for new report 
        this.setState({month:month,year:year,day:day})
        this.getDataFromServer(day.getMonth()+1,day.getFullYear()); // if change month - get data from selected month 
        //console.log(month,year,day)
        //console.log(day.getMonth(),day.getFullYear())
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
      
    openProjectsList =  (e) => {
        const{visibleProjectList} = this.state;
        console.log("openProjectsList")
       // console.log(e.currentTarget)
      
        this.setState({
            selectedCourse: "מס/שם קורס",
            selectedSubject: "נושא פעילות",
           // selectedStartHour: "שעת התחלה",
          //  selectedEndHour: "שעת סיום",
          visibleCoursesList: false,
          visibleSubjectsList:false,
          visibleStartHour: false,
          visibleStartHourList: false,
          visibleEndHourList: false,
          visibleNisInput: false,
          visibleRemark: false,})
        if(visibleProjectList)
           this.setState({visibleProjectList:false})
           else 
           this.setState({visibleProjectList:true})
              
    }

    openCoursesList =  (e) => {
        const{visibleCoursesList} = this.state;
        console.log("openCoursesList")
        this.setState({
            selectedSubject: "נושא פעילות",
           // selectedStartHour: "שעת התחלה",
          //  selectedEndHour: "שעת סיום",
          visibleProjectList: false,
          visibleSubjectsList:false,
          visibleStartHourList: false,
          visibleEndHourList: false,
          visibleKmInput: false,
          visibleNisInput: false,
          visibleRemark: false,})
        if(visibleCoursesList)
        this.setState({visibleCoursesList:false})
        else 
        this.setState({visibleCoursesList:true})
    }


    openSubjectsList =  (e) => {
        const{visibleSubjectsList} = this.state;
        console.log("openSubjectsList")
        this.setState({
           // selectedStartHour: "שעת התחלה",
          //  selectedEndHour: "שעת סיום",
          visibleProjectList: false,
          visibleCoursesList: false,
          visibleStartHourList: false,
          visibleEndHourList: false,
          visibleKmInput: false,
          visibleNisInput: false,
          visibleRemark: false,})
        if(visibleSubjectsList)
           this.setState({visibleSubjectsList:false})
        else 
           this.setState({visibleSubjectsList:true})
      
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
       const{visibleStartHourList} = this.state
    
       console.log("openStartHour")
       this.setState({ 
            selectedEndHour: "שעת סיום",
            visibleProjectList: false,
            visibleCoursesList: false,
            visibleSubjectsList:false,
            visibleEndHourList: false,
            visibleKmInput: false,
            visibleNisInput: false,
            visibleRemark: false,})
       if(visibleStartHourList)
           this.setState({visibleStartHourList:false})
        else 
           this.setState({visibleStartHourList:true})
       }

    openEndHour =(e)=>{
       const{visibleEndHourList} = this.state 
       console.log("openEndHour")
       this.setState({ 
                visibleProjectList: false,
                visibleCoursesList: false,
                visibleSubjectsList:false,
                visibleStartHourList: false,
                visibleKmInput: false,
                visibleNisInput: false,
                visibleRemark: false,})
      if(visibleEndHourList)
       this.setState({visibleEndHourList:false})
      else 
       this.setState({visibleEndHourList:true})
     
    }

   
    changeView = (e) =>{
        this.setState({visibleKmInput:false, visibleRemarkInput:false,visibleNisInput:false })
    }

   viewInput = (e) => {
    //    console.log(e.currentTarget.id)
        switch (e.currentTarget.id) {
            case "km": 
                 this.setState({visibleKmInput:true, visibleRemarkInput:false,visibleNisInput:false })
                 break;
            case "nis" :
                this.setState({visibleNisInput:true, visibleKmInput:false , visibleRemarkInput:false})
                break;
            case "remark" :
                this.setState({visibleRemarkInput:true, visibleKmInput:false , visibleNisInput:false})
                 break;  
            default:        
        } 
     }
    
   insertDataToInput = (e) => {
    //    console.log(e.target.id)
    //    console.log(e.target.value)
        switch (e.target.id) {
            case "kmInput": 
                 this.setState({insertedKm:e.target.value, errorKm:false})
                 break;
            case "nisInput" :
                this.setState({insertedNis:e.target.value, errorNis:false})
                break;
            case "remarkInput" :
                this.setState({insertedRemark:e.target.value })
                break;  
            default:        
        }
    }

   saveDataToServer = (e) =>{
    //************************************************ */
    const{GetReports, projectsArrayData, selectedProject, selectedSubject,selectedCourse, 
          selectedStartHour, selectedEndHour,totalHours, insertedKm, insertedNis, insertedRemark,
          errorProject, errorSubject,errorCourse, errorStartHour, errorEndHour, errorKm , errorNis,
          date, month, year}  = this.state;
    let dataToSend = {}
    if(selectedProject =="פרויקט")   //check if project selected
        this.setState({errorProject: true})
    else {
        let project = projectsArrayData.find((proj)=>{if(proj.projectName===selectedProject) return proj} )   
        dataToSend.projectid = project.projectid  // insert project id 
        dataToSend.isSetProject = true
        if(selectedCourse == "מס/שם קורס")  // check if course selected 
              this.setState({errorCourse: true})
                else {
                       dataToSend.coursename = selectedCourse 
                       let course = project.courses.find((crs)=>{if(crs.courseName===selectedCourse) return crs})
                       dataToSend.courseid = course.courseid
                       //   coursename: "כללי"
                      }      
        if(selectedSubject == "נושא פעילות")   // check if subject selected - insert as action to data base
            this.setState({errorSubject: true})
        else{
            let actionid = project.subjects.find((act)=>{if(act.subject===selectedSubject) return act})
            // console.log(actionid)
              dataToSend.actionid = actionid.reportsubjectid
              dataToSend.isSetSubject = true
            // actionid: "52"
        }
 
    }
    console.log(GetReports)  
    // projectid: "7"
    dataToSend.automatic = 0
   //     automatic: 0
    let currentDate = date + "/" + month + "/" + year
    dataToSend.date = currentDate
     // date: "15/11/2019"
    
    if(selectedStartHour == "שעת התחלה")  // check if start hour selected 
        this.setState({errorStartHour: true})
    else{
        dataToSend.starthour = selectedStartHour
        dataToSend.starthourvalid = true
        // starthour: "19:00"
        if( selectedEndHour == "שעת סיום")  // check if end  hour selected 
            this.setState({errorEndHour: true})
         else{ 
            dataToSend.finishhour = selectedEndHour
            // finishhour: "20:00"
            dataToSend.finishhourvalid = true
            dataToSend.hoursvalid = true
            dataToSend.hours = totalHours
         }
         }
    
  
    if( insertedKm!== ' רכב פרטי (ק"מ) '){
        if (isNaN(insertedKm))
            this.setState({errorKm:true})
        else
            dataToSend.carkm = insertedKm}
    if (insertedNis!=='  תחבורה ציבורית (ש"ח) '){
         if (isNaN(insertedNis))
             this.setState({errorNis:true})
         else
              dataToSend.cost = insertedNis }
    if(insertedRemark!== ' הערות ')
          dataToSend.comment=insertedRemark
    
    if(errorProject|| errorSubject ||errorCourse|| errorStartHour || errorEndHour || errorKm || errorNis)
          return 
   
    // noInterstion: true -- check 
  
    dataToSend.reportid= "-1"
    dataToSend.status= ""
    dataToSend.copyreport = {   actionid: dataToSend.actionid,
                                date: dataToSend.date,
                                finishhour: dataToSend.finishhour,
                                hours: dataToSend.hours,
                                projectid: dataToSend.projectid,
                                starthour: dataToSend.starthour}
   console.log(dataToSend)
        //*********************************************** */
    var data = {};
    // data.reports=$scope.reports;
    // // console.log("hour reports:");
    // // console.log(data.reports);
    // server.requestPhp(data, 'SaveReports').then(function (data) {
    //     alert("saved");
    //     $scope.GetReports();
    //     disableSaveButton=false;
    // });
   
   // data.reports
    // server(data, "SaveReports").then(res => {
    //     console.log(res);
    //     if (res.data.error) {
    //         alert("error to add data to server");
    //     } 
    //     // else {
    //     //     data = res.data;
    //     //     this.setState({GetReports:data})
    //     // }
    // }, err => {
    //     console.error(err);
    // })

   }

    handleProjectClick =(e) =>{
        const{projectsArrayData}=this.state
        let project = e.target.innerHTML
        let proj =  projectsArrayData.find((proj)=>{if(proj.projectName==project)return proj})
        let courses =[]
        let subjects = proj.subjects
        if (proj.courses.length===0)
           courses[0] = "כללי"
       else
           courses = proj.courses
      
       this.setState({selectedProject:e.target.innerHTML,coursesOfProject:courses, subjectsOfProject:subjects, errorProject:false})

    }
    handleCourseClick =(e)=>{
        this.setState({selectedCourse:e.target.innerHTML,errorCourse:false})
    }
    handleSubjectClick =(e) =>{
         this.setState({selectedSubject:e.target.innerHTML, errorSubject:false})
    }
   
    handleStartHourClick =(e) =>{
        const{timesArray} = this.state
        let hour = e.target.innerHTML
        let endTimesArray = []
            for(let i=timesArray.indexOf(hour)+1;i<timesArray.length;i++){
                 endTimesArray.push(timesArray[i])   
                }
        this.setState({selectedStartHour:e.target.innerHTML, timesArray:endTimesArray, errorStartHour:false})
    }
    handleEndHourClick =(e) =>{
        const{selectedStartHour} = this.state
        let diff = this.diff(selectedStartHour, e.target.innerHTML)
        this.setState({totalHours:diff, selectedEndHour:e.target.innerHTML, errorEndHour:false})
    }

    render() {

        const {projectsArrayData,coursesOfProject, subjectsOfProject, visibleStartHourList, visibleEndHourList, 
            visibleKmInput,visibleNisInput,visibleRemarkInput, visibleProjectList, visibleCoursesList, 
            visibleSubjectsList, timesArray, selectedStartHour, selectedEndHour, status , 
            totalHours, selectedSubject, selectedProject, selectedCourse,
            errorProject, errorSubject, errorCourse, errorStartHour, errorEndHour, errorKm , errorNis } = this.state;
       
            console.log(this.props.activeUser)
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        let styleMenuField = "report-menu-field "
        let style = "report-dropdown "
        let  projectsList = <div className={(visibleProjectList)? style + "d-inline": style + "d-none"} >
                       { projectsArrayData.map((proj)=>
                         <div className="report-dropdown-content" onClick= {this.handleProjectClick}>
                              {proj.projectName}
                         </div>
                             )}
                      </div>
        let coursesList=[]
        if(selectedProject === "פרויקט")
            coursesList = []
        else{
           
                
            coursesList = <div className={(visibleCoursesList)? style + "d-inline": style + "d-none"} >
                             {coursesOfProject.map((crc)=>
                               <div className="report-dropdown-content" onClick={this.handleCourseClick}>
                                  {crc.courseName}
                                   {/* - {crc.courseid} */}
                               </div>
                               )}
                          </div>
           }
        let subjectsList = []
        if(selectedProject === "פרויקט" || selectedCourse === "מס/שם קורס")
            subjectsList = []
        else{     
            subjectsList = <div className={(visibleSubjectsList)? style + "d-inline": style + "d-none"} >
                                {subjectsOfProject.map((sbj)=>
                             <div className="report-dropdown-content" onClick={this.handleSubjectClick}>
                                  {sbj.subject} 
                             </div>
                                 )}
                          </div>
           }   
      
       let startHoursList = <div className={(visibleStartHourList)? style + "show-times d-inline": style + "show-times d-none"} >
                     {timesArray.map((time)=>
                       <div className="report-dropdown-content" onClick={this.handleStartHourClick}>
                       {time} 
                       </div>
                     )}
                  </div>
      let endHoursList =[]
      if( selectedStartHour === "שעת התחלה")
         endHoursList =[]
      else{
           endHoursList = <div className={(visibleEndHourList)? style + "show-times d-inline": style + "show-times d-none"} >
                   {timesArray.map((time)=>
                     <div className="report-dropdown-content" onClick={this.handleEndHourClick}>
                     {time} 
                    </div>
                   )}
         </div>
       }

    return (
        <div className=" report-font-size " >
       <Container className="insert-container report-font-size " >     
           
           <Row className="sticky-top bg-white">
             <Col>
             
              <PortalNavbar header="דיווח שעות"/>
{/* getDate(month,year,date) date - full date , status -1 - denied, 0 - await, 1 - success, totalHours - total hours of current report  */}
              <SelectDate changeDate={this.getDate} status={status} totalHours={totalHours}/> 
             
             </Col>
           </Row>
          
              <Row>
                  <Col>
                  <div className= {(errorProject)? styleMenuField + " bg-danger ": styleMenuField + " "} id="projectsList"  onClick = {this.openProjectsList}>
                 
                  <div className="report-menu-text">  <span className="pr-3">{selectedProject}</span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                       {projectsList}
                      
                  </div>
 {/* <div className="report-menu-text">  <span className="pr-3">{selectedProject}</span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                       {result}
                  </div> */}

                                 
                  <div className={(errorCourse)? styleMenuField + " bg-danger ": styleMenuField + " "} id="coursesList"  onClick={this.openCoursesList}>
                        <div className="report-menu-text" >  <span className="pr-3">{selectedCourse} </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                        {coursesList}
                  </div>
            
            
                  <div className={(errorSubject)? styleMenuField + " bg-danger ": styleMenuField + " "} id="subjectsList"  onClick={this.openSubjectsList}>
                        <div className="report-menu-text">  <span className="pr-3">  {selectedSubject}   </span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                        {subjectsList}
                  </div>
                  </Col>
              </Row>
      
      
             <Row>
                 <Col className="px-0">
                
                 <div className={(errorStartHour)? styleMenuField + "  ml-5 mr-3 bg-danger ": styleMenuField + "  ml-5 mr-3 "} id="startHour"  onClick={this.openStartHour}>
                        <div className="report-menu-text text-center ">   {selectedStartHour}  </div>
                        {startHoursList}
                </div>
             </Col>
             <Col className="px-0">
             <div className={(errorEndHour)? styleMenuField + "  ml-5 mr-3 bg-danger ": styleMenuField + "  ml-5 mr-3 "} id="endHour"  onClick={this.openEndHour}>
                        <div className="report-menu-text text-center ">  {selectedEndHour}  </div>
                        {endHoursList}
                </div>
             </Col>
             </Row>
           
           
           
             <Row>
                 <Col className="px-0">
                
                 <div className={(errorKm)? styleMenuField + "  ml-5 mr-3 bg-danger ": styleMenuField + "  ml-5 mr-3 "} id="km"  onClick={this.viewInput} onBlur={()=>this.changeView()}>
                        <div className=" report-menu-text text-center "> 
                         <span className={(!visibleKmInput)?"d-block":"d-none"} >{this.state.insertedKm}</span>
                         <span className={(visibleKmInput)?"d-block":"d-none"} ><input id="kmInput" placeholder="0" onChange={this.insertDataToInput}></input></span>
                         
                          </div>
                </div>
             </Col>
             <Col className="px-0">
             <div className={(errorNis)? styleMenuField + "  ml-5 mr-3 bg-danger ": styleMenuField + "  ml-5 mr-3 "} id="nis" onClick={this.viewInput} onBlur={()=>this.changeView()}>
                    <div className=" report-menu-text text-center ">
                          <span className={(!visibleNisInput)?"d-block":"d-none"}> {this.state.insertedNis} </span> 
                          <span className={(visibleNisInput)?"d-block":"d-none"} ><input id="nisInput" placeholder="0" onChange={this.insertDataToInput}></input></span>
                        </div>
                </div>
             </Col>
             </Row>
         
            <Row>
            <Col>
             <div className="report-menu-field " id="remark" onClick={this.viewInput} onBlur={()=>this.changeView()}>
                        <div className="report-menu-text border-1"> 
                         <span className="pr-3"> </span>
                         <span className={(!visibleRemarkInput)?"d-inline":"d-none"}> {this.state.insertedRemark} </span>
                          <span className={(visibleRemarkInput)?"d-inline":"d-none"} ><input id="remarkInput" placeholder=" " onChange={this.insertDataToInput}></input></span>
                          </div>
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
                  <img className="link" src="images\CourseControls\Plus\plus.png" alt="add" onClick={this.saveDataToServer}></img>
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
