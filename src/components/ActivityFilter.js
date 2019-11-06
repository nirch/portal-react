import React, { Component } from 'react';
import {  } from 'react-bootstrap';
import '../pages/courses/courses.css'

class ActivityFilter extends React.Component {
    constructor(props){
        super(props);
        this.state = {itemStatus}
        
    getFilteredData = () => {

    }
    render(){
        return(
            <div className = "activity-filter">shalom
                <button type = "button" onClick = {this.getFilteredData}>{this.props.activeButton}</button>
                <button type = "button">{this.props.nonactiveButton}</button>
            </div>
        )
    }
}
