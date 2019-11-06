import React, { Component } from 'react';
import '../../pages/hours/hoursApprove.css'
// import { connect } from "react-redux";




export default class SelectMonth extends React.Component {
    constructor(props){
        super(props);   
    }
    render() {
        return (
            <div className="chooseMonth">
                <img className="arrowleftright" src="/images/ArrowRight/drawable-xxhdpi/arrow_down.png"/>
                <span className="monthTag">   {this.props.month}  </span>
                 <img  className="arrowleftright" src="/images/ArrowLeft/drawable-xxhdpi/arrow_down.png"/>
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
