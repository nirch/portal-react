import React, { Component } from 'react';
import '../hours/hoursApprove.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import SelectMonth from '../../components/hoursApprove/selectMonth'

class HoursApprovePage extends Component {
    constructor(props){
        super(props);
        this.state={
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1
            }
        
    }
    monthBack=()=>{
        let {month,year}=this.state;
        const curYear=new Date().getFullYear();
        const curMonth=new Date().getMonth()+1;
        if (month===1) 
                    {month=12;year--;}
        else 
                    {month--}
        if ((year===curYear&& month<=curMonth) || (year<curYear && month>curMonth)) this.setState({month,year})
    }
    monthForward=()=>{
        let {month,year}=this.state;
        const curYear=new Date().getFullYear();
        const curMonth=new Date().getMonth()+1;
        if (month===12) 
                    {month=1;year++;}
        else 
                    {month++}
        if ((year===curYear&& month<=curMonth) || (year<curYear && month>curMonth)) this.setState({month,year})   
    }
    render() {
  
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        const {year,month}=this.state;
        return (
            <div>
                <PortalNavbar/>
                <SelectMonth month={parseInt(this.state.month)} monthBack={this.monthBack} monthForward={this.monthForward}/>
                <div>
                    חיפוש עובדים
                </div>
                <div>
                    רשימת עובדים
                </div>
                <div>
                    footer with actions
                </div>
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
