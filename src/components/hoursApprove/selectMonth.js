import React, { Component } from 'react';
import '../../pages/hours/hoursApprove.css'
// import { connect } from "react-redux";




export default class SelectMonth extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1
        }
    }
    monthBack=()=>{
        const {changeMonthYear}=this.props;
        let {month,year}=this.state;
        const curYear=new Date().getFullYear();
        const curMonth=new Date().getMonth()+1;
        if (month===1) 
                    {month=12;year--;}
        else 
                    {month--}
        if ((year===curYear&& month<=curMonth) || (year<curYear && month>curMonth)) 
                                {
                                    this.setState({month,year});
                                    changeMonthYear(month,year)
                                }
    }
    monthForward=()=>{
        const {changeMonthYear}=this.props;
        let {month,year}=this.state;
        const curYear=new Date().getFullYear();
        const curMonth=new Date().getMonth()+1;
        if (month===12) 
                    {month=1;year++;}
        else 
                    {month++}
        if ((year===curYear&& month<=curMonth) || (year<curYear && month>curMonth)) 
                    {
                        this.setState({month,year});
                        changeMonthYear(month,year)
                    }
    }
    render() {
        
        const {month,year} = this.state;
        const curYear=new Date().getFullYear();
        const curMonth=new Date().getMonth()+1;
        let backwardOpacity,forwardOpacity;
        if ((year===curYear&& month<curMonth) || (year<curYear)) {forwardOpacity=1} else {forwardOpacity=0.3};
        if ((year===curYear&& curMonth-month<11) || (year<curYear && month-curMonth>1))  {backwardOpacity=1} else {backwardOpacity=0.3};
        let monthText = "";
        switch (month) {
            case 1: monthText = "ינואר"
                // code block
                break;
            case 2: monthText = "פברואר"
                // code block
                break;
            case 3: monthText = "מרץ"
                // code block
                break;
            case 4: monthText = "אפריל"
                // code block
                break;
            case 5: monthText = "מאי"
                // code block
                break;
            case 6: monthText = "יוני"
                // code block
                break;
            case 7: monthText = "יולי"
                // code block
                break;
            case 8: monthText = "אוגוסט"
                // code block
                break;
            case 9: monthText = "ספטמבר"
                // code block
                break;
            case 10: monthText = "אוקטובר"
                // code block
                break;
            case 11: monthText = "נובמבר"
                // code block
                break;
            case 12: monthText = "דצמבר"
            // code block
        }
        return (
            <div className="chooseMonth">
                <img style={{opacity:backwardOpacity}} className="arrowleftright" src="/images/ArrowRight/drawable-xxhdpi/arrow_down.png" onClick={this.monthBack}/>
                <span className="monthTag">   {monthText}  </span>
                <img style={{opacity:forwardOpacity}}  className="arrowleftright" src="/images/ArrowLeft/drawable-xxhdpi/arrow_down.png"  onClick={this.monthForward}/>
            </div>
        );
    }
}



// const mapStateToProps = state => ({
//     activeUser: state.activeUser
// });


// export default connect(
//     mapStateToProps
// )(HoursApprovePage);
