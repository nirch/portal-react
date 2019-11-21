import React, { Component} from 'react';
import '../../pages/hours/hoursApprove.css'

export default class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state={
                opacity:0,
                checked:this.props.checked,
                color:this.props.color
        }
        
    }
    componentDidMount() {
     let   {opacity}=this.state;     
     if (this.props.checked) {opacity=1} else {opacity=0}
     this.setState({opacity})
    }
    componentDidUpdate(prevProps, prevState ) {
    if (prevProps.checked!==this.props.checked){
        let   {opacity,checked}=this.state;
        checked=this.props.checked;
        if (this.props.checked) {opacity=1} else {opacity=0};
        this.setState({checked,opacity})
       }
    }       
    
    render() {
             return     ( <div className="newRadionDiv">
                            <input onChange={this.props.onChange}
                                className="Radio" type="radio"
                                name={this.props.name}
                                value={this.props.value}
                                checked={this.state.checked}
                                style={{ opacity: "0" }}
                            />
                            <div className="newRadio" style={{ border: "1px solid "+this.state.color }}>
                                <div className="newRadioCenter" style={{
                                    backgroundColor: this.state.color,
                                    opacity: this.state.opacity
                                }}
                                >

                                </div>
                            </div>

                        </div>);
    }

}