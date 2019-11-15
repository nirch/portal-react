import React, { Component } from 'react';
import './inPageNavbar.css'


class InPageNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKey: props.tabs[0].key
        }

    }

    handleClick = (tab) => {
        // console.log(tab.key)
        this.setState({selectedKey: tab.key})
    }

    render() { 

        const tabsDisplay = this.props.tabs.map(tab =>
            <a
                className = {"nav-item nav-link" + (this.state.selectedKey == tab.key ? " active" : "")}    
                id="nav-curses-tab"
                data-toggle="tab"
                // href="#" 
                role="tab"
                onClick={() => this.handleClick(tab)}
            >
                {tab.title}
            </a>
        )


        return (
            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                {tabsDisplay}
            </div>
        );
    }
}

export default InPageNavbar;