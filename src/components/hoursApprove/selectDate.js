import React, { Component} from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../../pages/hours/hoursApprove.css'
// import { connect } from "react-redux";




export default class SelectDate extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            date: new Date().getDate(),
            newDate: new Date(),
            totalHours: 0, 

        }
        
    }
        componentDidMount(){
            let newDate = new Date();
            //  newDate = newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + newDate.getFullYear()
            this.setState({newDate});
        }
        
 
     
    plusDate=()=>{
       const{newDate, year, month } = this.state;
       const{changeDate} = this.props;
       // let newDate = new Date();
       let numberOfDaysToAdd = 1; // const of shiping dates from suppliers
       newDate.setDate(newDate.getDate() + numberOfDaysToAdd); 
       //let showDate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate()
       this.setState({newDate});
       changeDate(month, year,  newDate)
       return newDate;
    }
  
    minusDate=()=>{
        const{newDate, year, month } = this.state;
        const{changeDate} = this.props;
       //let newDate = new Date();
        let numberOfDaysToAdd = -1; // const of shiping dates from suppliers
        newDate.setDate(newDate.getDate() + numberOfDaysToAdd); 
       // newDate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate()
        this.setState({newDate});
        changeDate(month, year,  newDate)
        return newDate;
     }
  
    render() {
        
        const {newDate} = this.state;
        let {status, totalHours} = this.props;
        let date = newDate.getDate()
        if(newDate.getDate()>0 && newDate.getDate()<10)
            date = "0"+ newDate.getDate()
        let month = (newDate.getMonth()+1)
        if((newDate.getMonth()+1)>0 && (newDate.getMonth()+1)<10)
            month = "0"+ (newDate.getMonth()+1)
        let year = newDate.getFullYear() % 100;  
        let currentDay = new Date();
        let currentYear = currentDay.getFullYear() % 100;  
        let currentMonth = (currentDay.getMonth()+1)
        let currentDate = currentDay.getDate()
        let hour = newDate.getHours();
        let minute =  newDate.getMinutes();
        
        let bgColor;
        switch (status) {
             case "-1": 
               bgColor =  " bg-red "  
               status = "נדחה"
               break;
             case "1":    
               bgColor = " bg-green " 
               status = "אושר"
               break;
             default:  
               bgColor = " bg-yellow "   
               status = "ממתין"
        }
        let style = "px-0 showDateHeader " + bgColor
        return (
            <Container className={style}>
            <Row>
                <Col>
                <div className=" mt-3 text-center">
                   <img className="mb-2" src="/images/ArrowRight/drawable-mdpi/arrow_down.png" alt="" onClick={this.minusDate }/>
                   <span className="report-showDate font-weight-bold">   {date + "/" + month + "/" + year }  </span>
                <img className="mb-2" src="/images/ArrowLeft/drawable-mdpi/arrow_down.png"  alt="" onClick={this.plusDate}/>
                </div>
                </Col>
            </Row>
            <Row>
                <Col className=" text-center hours-header-text ">
                <span>סהייכ שעות:</span><span className="mr-3">{totalHours}</span>
                </Col>
            </Row>
            <Row className=" hours-header-small-text  text-center ">
                <Col >
               <span className="mr-1"> זמן שינוי סטטוס:</span><span className="mr-2">{hour + ":" + minute  + " | " + currentDate + "." + currentMonth + "." + currentYear  }</span>
                </Col>
                <Col >
                <span className="mr-5">  סטטוס: </span><span className="mr-3">{status}</span>
                </Col>
            </Row>
            
            </Container>
        );
    }
}



// const mapStateToProps = state => ({
//     activeUser: state.activeUser
// });


// export default connect(
//     mapStateToProps
// )(HoursApprovePage);
