import React, { Component } from 'react';
import './portalSelect.css'


class PortalSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleList: "unVisible"
        }
        this.toggleList = this.toggleList.bind(this);

    }

    toggleList() {
        if (this.state.visibleList === "unVisible") {
            this.setState({ visibleList: "visible" })
        } else { this.setState({ visibleList: "unVisible" }) }
    }

    render() {

        const title = this.props.title
        const options = this.props.options.map(option => <div className={this.state.visibleList}>{option.value}</div>)

        return (
            <div className=" " id="hiddenList" onClick={this.toggleList}>
                <h6>{title} </h6>
                <div className="report-menu-text">  <span className="pr-3"></span> <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt=""></img></div>
                {options}
            </div>




        );
    }
}

export default PortalSelect;