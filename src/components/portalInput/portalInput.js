import React, { Component } from 'react';
import './portalInput.css'


class PortalInput extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.onChangeValue = this.onChangeValue.bind(this);

    }

    onChangeValue(event) {
        this.props.onChange(event.target.value)
    }


    render() {

        const {title,value} = this.props
        const type = this.props.type

        return (
            
            <div className="inputDetails" >
                <h6 className="hederField" >{title}</h6>
        <input className="inputField" value={value} type={type} placeholder={title} onChange={this.onChangeValue}></input>
            </div>
        );
    }
}

export default PortalInput;