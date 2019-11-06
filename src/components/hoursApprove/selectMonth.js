import React, { Component } from 'react';
import '../../pages/hours/hoursApprove.css'
// import { connect } from "react-redux";




export default class SelectMonth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { month,monthBack,monthForward } = this.props;
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
                <img className="arrowleftright" src="/images/ArrowRight/drawable-xxhdpi/arrow_down.png" onClick={()=>{monthBack()}}/>
                <span className="monthTag">   {monthText}  </span>
                <img className="arrowleftright" src="/images/ArrowLeft/drawable-xxhdpi/arrow_down.png"  onClick={monthForward}/>
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
