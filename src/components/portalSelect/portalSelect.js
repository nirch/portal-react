import React, { Component } from 'react';
import './portalSelect.css'


class PortalSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleList: "d-none",
            selectedOption: false
        }
        this.toggleList = this.toggleList.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this)

    }

    toggleList() {
        if (this.state.visibleList === "d-none") {
            this.setState({ visibleList: "d-inline" })
        }
        else { this.setState({ visibleList: "d-none" }) }
    }

    onOptionSelect(event) {
        this.props.onChange(event.target.innerHTML)

        this.setState({ selectedOption: event.target.innerHTML })
    }



    render() {

        const title = this.props.title;
        const selectedOption = this.state.selectedOption;
        const options = this.props.options.map(option => <div onClick={this.onOptionSelect} className="report-dropdown-content " >{option.value}</div>);
        var displaiedTitleOrOption;

        if (selectedOption) {
            displaiedTitleOrOption = selectedOption
        } else {
            displaiedTitleOrOption = title
        }


        return (
            <div className="report-menu-field ml-5 mr-3 " id="hiddenList" onClick={this.toggleList}>
                <div className="report-menu-text">
                    {displaiedTitleOrOption}
                    <span className="pr-3"></span>
                    <img src="images\ArrowDown\drawable-mdpi\arrow_down.png" alt="down arrow"></img>
                </div>
                <div className={"report-dropdown "}> </div>
                <div className={"report-dropdown show-times " + this.state.visibleList}>
                    {options}
                </div>

            </div>
        );
    }
}

export default PortalSelect;