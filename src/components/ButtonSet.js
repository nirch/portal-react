import React, { Component } from 'react';
import { } from 'react-bootstrap';
import '../pages/courses/courses.css';
import server from '../shared/server'
import './ButtonSet.css'

class ButtonSet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKey: props.buttons[0].key
        }
       
    }
    handleClick = (button) => {
        this.props.makeChoice(button.key);
        this.setState({selectedKey: button.key})
    }



    render() {


        const buttonsDisplay = this.props.buttons.map((button, i) => 
            <button key = {i} className = {this.state.selectedKey == button.key ? "selected" : ""} type="button" onClick = {() => this.handleClick(button)}>
            {button.title}
            </button>
        )

        return (
            <div className="btn-set">
               
                {buttonsDisplay}
            </div>
        )
    }
}

export default ButtonSet;
