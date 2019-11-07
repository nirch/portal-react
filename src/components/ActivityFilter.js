import React, { Component } from 'react';
import { } from 'react-bootstrap';
import '../pages/courses/courses.css';
import server from '../shared/server'

class ActivityFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKey: this.props.buttons[0].key
        }
       
    }
    handleClick = (button) => {
        this.props.makeChoice(button.key);
        this.setState({selectedKey: button.key})
    }



    render() {

// onClick={() => {this.props.getFilteredData(button.key); this.setState({selectedKey : button.key})}}>{button.title}

        const buttonsDisplay = this.props.buttons.map(button => 
            <button className = {this.state.selectedKey == button.key ? "selected" : ""} type="button" onClick = {() => this.handleClick(button)}>
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

export default ActivityFilter;
