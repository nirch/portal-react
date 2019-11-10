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
       const{newDate} = this.state;
       // let newDate = new Date();
       let numberOfDaysToAdd = 1; // const of shiping dates from suppliers
       newDate.setDate(newDate.getDate() + numberOfDaysToAdd); 
       //let showDate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate()
       this.setState({newDate});
       return newDate;
    }
  
    minusDate=()=>{
        const{newDate} = this.state;
       //let newDate = new Date();
        let numberOfDaysToAdd = -1; // const of shiping dates from suppliers
        newDate.setDate(newDate.getDate() + numberOfDaysToAdd); 
       // newDate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate()
        this.setState({newDate});
        return newDate;
     }
  
    render() {
        
        const {newDate} = this.state;
        const {status} = this.props;
        let date = newDate.getDate()
        if(newDate.getDate()>0 && newDate.getDate()<10)
            date = "0"+ newDate.getDate()
        let month = (newDate.getMonth()+1)
        if((newDate.getMonth()+1)>0 && (newDate.getMonth()+1)<10)
            month = "0"+ (newDate.getMonth()+1)
        let year = newDate.getFullYear() % 100;   
        let bgColor;
        switch (status) {
             case "-1": 
               bgColor =  " bg-danger "  
               break;
             case "1":    
               bgColor = " bg-success " 
               break;
             default:  
               bgColor = " bg-warning "   
        }
        let style = "px-0 showDateHeader " + bgColor
        return (
            <Container className={style}>
            <Row>
                <Col>
                <div className=" mt-3 text-center">
                   <img className="mb-2" src="/images/ArrowRight/drawable-mdpi/arrow_down.png" alt="" onClick={this.minusDate }/>
                   <span className="showDate font-weight-bold">   {date + "/" + month + "/" + year }  </span>
                <img className="mb-2" src="/images/ArrowLeft/drawable-mdpi/arrow_down.png"  alt="" onClick={this.plusDate}/>
                </div>
                </Col>
            </Row>
            <Row>
                <Col className=" text-center hours-header-text ">
                <span>סהייכ שעות:</span><span className="mr-3">9</span>
                </Col>
            </Row>
            <Row>
                <Col>
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
