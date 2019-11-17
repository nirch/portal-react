import React, { Component } from 'react';
import '../hours/hoursApprove.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import SelectMonth from '../../components/hoursApprove/selectMonth'
import { Accordion, Card, Button, Row, Col, Spinner } from 'react-bootstrap'
import server from '../../shared/server'
import SearchBar from '../../components/SearchBar'

function getDetails(field, reportersArray, index1, index2) {
    switch (field) {
        case "projectName":
            {
                if (!reportersArray[index1].reportingPerimeter[reportersArray[index1].reports[index2].projectid])
                    return "";
                return reportersArray[index1].reportingPerimeter[reportersArray[index1].reports[index2].projectid].projectName;
            }
        case "courseName":
            {
                if (!reportersArray[index1].reportingPerimeter[reportersArray[index1].reports[index2].projectid])
                    return "";
                let courses = reportersArray[index1].reportingPerimeter[reportersArray[index1].reports[index2].projectid].courses;
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i].courseid === reportersArray[index1].reports[index2].courseid) return courses[i].courseName;
                }
                return "";
            }
        case "actionName":
            {
                if (!reportersArray[index1].reports[index2].actionid)
                    return "";
                let actions = reportersArray[index1].reportingPerimeter[reportersArray[index1].reports[index2].projectid].subjects;
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].reportsubjectid === reportersArray[index1].reports[index2].actionid) return actions[i].subject;
                }
                return "";
            }
            return ""
    }
}

class HoursApprovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            isLoading: true,
            allReporters: [],
            search: "",
            pages: 0,
            page: 0,
            rowsPerPage: 5
        }

    }
    componentDidMount() {
        // const year=new Date().getFullYear();
        // const month=new Date().getMonth()+1;
        // this.setState({month,year});
        this.getReporters();
    }
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevState.month !== this.state.month) {
            this.getReporters();
        };
    }
    changeSearch = (value) => {
        let { search } = this.state;
        search = value;
        this.setState({ search });
    }
    changePage = (value) => {
        let { page } = this.state;
        page = value - 1;
        this.setState({ page });
    }
    aproveReport = (value) => {
        alert(value);
    }

    getReporters = () => {
        let { isLoading, month, year, allReporters, search, pages, rowsPerPage } = this.state;
        let usefulReporters = [];
        var data = { month, year };
        console.log('retriving month:');
        console.log(month + " " + year);
        server(data, 'GetAllReporters').then((res) => {
            let reporters = res.data
            for (var i = 0; i < reporters.length; i++) {
                if (reporters[i].reports.length > 0 || reporters[i].status == 1) {
                    usefulReporters.push(reporters[i]);
                }
            }

            usefulReporters.sort(function (a, b) {
                var x = a.firstname;
                var y = b.firstname;
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });

            var searchedReporters = usefulReporters;

            //filter by the search
            var searchedReporters = usefulReporters.filter(function (el) {
                return el.firstname.includes(search) || el.lastname.includes(search)
            });


            //calculate number of pages
            pages = Math.ceil((searchedReporters.length) / rowsPerPage);
            allReporters = usefulReporters;
            // for (var i=0; i<rowsPerPage; i++)
            // {
            //     if(searchedReporters[i])
            //     {
            //         allReporters.push(searchedReporters[i]);
            //     }
            // }

            for (var i = 0; i < allReporters.length; i++) {
                for (var j = 0; j < allReporters[i].reports.length; j++) {
                    var report = allReporters[i].reports[j];
                    report.carkm = parseFloat(report.carkm);
                    report.cost = parseFloat(report.cost);
                    report.automatic = parseFloat(report.automatic);
                    report.approval = parseFloat(report.approval);
                    report.status2 = true;
                    report.missingreportsubject = parseFloat(report.missingreportsubject);
                    if (!report.checkdate) {
                        report.checkdate = "לא התרחש שינוי עדיין";
                        // console.log(report.checkdate);
                    }

                    if (report.copyreport) {
                        report.copyreport.carkm = parseFloat(report.copyreport.carkm);
                        report.copyreport.cost = parseFloat(report.copyreport.cost);
                    }
                    // $scope.calculateHours($scope.allReporters[i].reports[j]);

                }
                // $scope.calculateHoursSummary($scope.allReporters[i]);
            }
            isLoading = false;
            this.setState({ isLoading, allReporters, pages })
        });
    }
    addTime = (time2, time1) => {

        var hours2 = time2.substring(0, 2);
        var hours1 = time1.substring(0, 2);

        var min2 = time2.substring(3, 5);
        var min1 = time1.substring(3, 5);


        var hours = parseInt(hours2) + parseInt(hours1);
        var minutes = parseInt(min2) + parseInt(min1);

        if (minutes >= 60) { minutes -= 60; hours++; }

        if (hours.toString().length === 1) { hours = "0" + hours };
        if (minutes.toString().length === 1) { minutes = "0" + minutes };

        return ({ hours, minutes })
    }
    calculatTime = (time2, time1) => {
        if (!time1 || !time2) return ({ hours: "00", minutes: "00" });
        var hours2 = time2.substring(0, 2);
        var hours1 = time1.substring(0, 2);

        var min2 = time2.substring(3, 5);
        var min1 = time1.substring(3, 5);


        var hours = parseInt(hours2) - parseInt(hours1);
        var minutes = parseInt(min2) - parseInt(min1);

        if (minutes < 0) { minutes += 60; hours--; }

        if (hours.toString().length === 1) { hours = "0" + hours };
        if (minutes.toString().length === 1) { minutes = "0" + minutes };

        return ({ hours, minutes })
    }
    changeMonthYear = (month, year) => {
        // console.log('changing month:');
        // console.log(month+" "+year);
        const isLoading = true;
        this.setState({ month, year, isLoading });


    }
    toggleImage = (e) => {
        if (e.target.src.includes("ArrowDown")) { e.target.src = "/images/ArrowUp/drawable-xxhdpi/arrow_down.png" }
        else { e.target.src = "/images/ArrowDown/drawable-xxhdpi/arrow_down.png" }
    }

    render() {

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        //extracting from state
        const { year, month, search, allReporters, pages, rowsPerPage, isLoading } = this.state;
        var reporterReportsRows = [];
        var searchedReporters = allReporters.filter(function (el) {
            return el.firstname.includes(search) ||
                el.lastname.includes(search) ||
                (el.firstname + " " + el.lastname).includes(search) ||
                (el.lastname + " " + el.firstname).includes(search)
        });
        var accordionRows = [];
        let { page } = this.state;
        let blockColor;
        let checkAproved, checkDecline, checkWaiting;
        let timeLeg = 0;
        let approvedTime, declineTime, waitingTime, totalTime;


        console.log("searchedreporters");
        console.log(searchedReporters);
        console.log("pages");
        console.log(pages);
        console.log("page");
        console.log(page);
        console.log("search");
        console.log(search);
        console.log("rowsperpage");
        console.log(rowsPerPage);

        if (page === "") page = "0";


        if (isLoading) {

            accordionRows.push(
                <div>
                    <div className="spinner">טוען נתונים, אנא המתן  <Spinner animation="border" variant="primary" /></div>;

            </div>)
        }
        else {
            for (var index = page * rowsPerPage; (index < searchedReporters.length && index < (parseInt(page) + 1) * rowsPerPage); index++) {
                reporterReportsRows = [];
                approvedTime = "00:00"; declineTime = "00:00"; waitingTime = "00:00"; totalTime = "00:00"
                for (var secondIndex = 0; secondIndex < searchedReporters[index].reports.length; secondIndex++) {
                    timeLeg = this.calculatTime(searchedReporters[index].reports[secondIndex].finishhour, searchedReporters[index].reports[secondIndex].starthour)
                    var reportid=searchedReporters[index].reports[secondIndex].reportid;
                    console.log(reportid);
                    switch (searchedReporters[index].reports[secondIndex].approval) {
                        
                        case -1: blockColor = "#ffa1a1";
                            declineTime = this.addTime(declineTime, timeLeg.hours + ":" + timeLeg.minutes);
                            declineTime = declineTime.hours + ":" + declineTime.minutes;
                            totalTime = this.addTime(totalTime, timeLeg.hours + ":" + timeLeg.minutes);
                            totalTime = totalTime.hours + ":" + totalTime.minutes;
                            checkAproved = <input onClick={()=>{this.aproveReport(reportid)}} className="Radio" type="radio" name={index + " " + secondIndex} value="aproved" />;
                            checkDecline = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="decline" defaultChecked />;
                            checkWaiting = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="wait" />;
                            // Decline
                            break;
                        case 1: blockColor = "#a1d47f";
                            approvedTime = this.addTime(approvedTime, timeLeg.hours + ":" + timeLeg.minutes);
                            approvedTime = approvedTime.hours + ":" + approvedTime.minutes;
                            totalTime = this.addTime(totalTime, timeLeg.hours + ":" + timeLeg.minutes);
                            totalTime = totalTime.hours + ":" + totalTime.minutes;
                            checkAproved = <input onClick={()=>{this.aproveReport(reportid)}}  className="Radio" type="radio" name={index + " " + secondIndex} value="aproved" defaultChecked />;
                            checkDecline = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="decline" />;
                            checkWaiting = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="wait" />;
                            // aproved
                            break;
                        default: blockColor = "#ffd300";
                            waitingTime = this.addTime(waitingTime, timeLeg.hours + ":" + timeLeg.minutes);
                            waitingTime = waitingTime.hours + ":" + waitingTime.minutes;
                            totalTime = this.addTime(totalTime, timeLeg.hours + ":" + timeLeg.minutes);
                            totalTime = totalTime.hours + ":" + totalTime.minutes;
                            checkAproved = <input onClick={()=>{this.aproveReport(reportid)}}  className="Radio" type="radio" name={index + " " + secondIndex} value="aproved" />;
                            checkDecline = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="decline" />;
                            checkWaiting = <input key={searchedReporters[index].reports[secondIndex].reportid} className="Radio" type="radio" name={index + " " + secondIndex} value="wait" defaultChecked />;
                        // waiting
                    }







                    reporterReportsRows.push(
                        <div key={searchedReporters[index].reports[secondIndex].reportid} className="hoursLeg">
                            <Row>
                                <Col xs="6"></Col>
                                <Col xs="2">
                                    <p className="radioTag redTag">דחה</p>
                                    <div className="radiocontainer">
                                        {checkDecline}

                                    </div>
                                </Col>
                                <Col xs="2">
                                    <p className="radioTag yellowTag">ממתין</p>
                                    <div className="radiocontainer">
                                        {checkWaiting}

                                    </div>
                                </Col>
                                <Col xs="2">
                                    <p className="radioTag greenTag">אשר</p>
                                    <div className="radiocontainer">
                                        {checkAproved}
                                    </div>
                                </Col>
                            </Row>
                            <div className="hoursContainer" style={{ backgroundColor: blockColor }}>
                                <div className="threeDots">
                                    <div className="smallBlackRound"></div>
                                    <div className="smallBlackRound"></div>
                                    <div className="smallBlackRound"></div>
                                </div>
                                <div className="hoursNavBar">

                                </div>
                                <Row>
                                    <Col xs="2">
                                        <input className="chekBoxHours" type="checkbox" name="hoursCheck" />
                                    </Col>
                                    <Col xs="4">
                                        <p className="textInHoursLegBold"> תאריך: {searchedReporters[index].reports[secondIndex].date}</p>
                                    </Col>
                                    <Col xs="4">
                                        <p className="textInHoursLegBold"> סה"כ שעות: {timeLeg.hours + ":" + timeLeg.minutes}</p>
                                    </Col>
                                    <Col xs="2">

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <p className="textInHoursHead"> פרויקט</p>
                                        <p className="textInHours">{getDetails("projectName", searchedReporters, index, secondIndex)}</p>
                                    </Col>
                                    <Col xs="4">
                                        <p className="textInHoursHead"> מס/שם קורס</p>
                                        <p className="textInHours">{getDetails("courseName", searchedReporters, index, secondIndex)}</p>
                                    </Col>
                                    <Col xs="4">
                                        <p className="textInHoursHead"> נושא פעילות</p>
                                        <p className="textInHours">{getDetails("actionName", searchedReporters, index, secondIndex)}</p>
                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                            </div>
                        </div>)
                }

                accordionRows.push(
                    <Card key={index}>
                        <Card.Header>
                            <Row>
                                <Col xs="4">
                                    <h5>{searchedReporters[index].lastname} {searchedReporters[index].firstname}</h5>
                                </Col>
                                <Col xs="6">
                                    <p><span style={{ color: "#f5cc0c", marginRight: "2px", fontSize: "12px" }}>{waitingTime}  </span><span style={{ color: "#338d12", marginRight: "2px", fontSize: "12px" }}>{approvedTime}  </span><span style={{ color: "#ff0000", marginRight: "2px", fontSize: "12px" }}>{declineTime}  </span><span style={{ color: "#5d5d5d", marginRight: "7px", fontSize: "14px", fontWeight: "bold" }}>{totalTime}</span></p>
                                </Col>
                                <Col xs="2">
                                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                        <img onClick={this.toggleImage} className="arrowleftright" src="/images/ArrowDown/drawable-xxhdpi/arrow_down.png" />
                                    </Accordion.Toggle>
                                </Col>
                            </Row>

                        </Card.Header>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body>
                                <Row>
                                    <Col xs="4">
                                        <button className="roundButton whiteButton"></button>

                                        <p className="buttonTag">סמן הכל</p>
                                    </Col>
                                    <Col xs="4">
                                        <button className="roundButton greenButton"></button>

                                        <p className="buttonTag">אישור מסומנים</p>
                                    </Col>
                                    <Col xs="4">
                                        <button className="roundButton redButton"></button>

                                        <p className="buttonTag">דחיית מסומנים</p>
                                    </Col>
                                </Row>
                                {reporterReportsRows}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>)
            }
        }

        return (
            <div>
                <PortalNavbar header="אישור שעות" />
                <SelectMonth changeMonthYear={this.changeMonthYear} />
                <SearchBar handleSearch={this.changeSearch} updateSearch={this.changePage} pages={this.state.pages} searchLabel="חיפוש עובד" />
                {/* <input type="text" placeholder="חיפוש עובד" onChange={this.changeSearch} />
                <input type="number" placeholder="page" onChange={this.changePage} /> */}
                <Accordion>
                    {accordionRows}
                </Accordion>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(HoursApprovePage);
