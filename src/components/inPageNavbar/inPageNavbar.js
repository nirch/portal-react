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
        this.setState({ selectedKey: tab.key })
    }

    render() {

        const tabsDisplay = this.props.tabs.map(tab =>
            <a
                className={"nav-item nav-link" + (this.state.selectedKey == tab.key ? " active" : "")}
                id="nav-curses-tab"
                data-toggle="tab"
                // href="#" 
                role="tab"
                onClick={() => this.handleClick(tab)}
            >
                {tab.title}
            </a>
        )

        var curses

        if (this.state.selectedKey == 1) {
            curses = this.props.tabs[0].component

        } else if (this.state.selectedKey == 2) {
            curses = this.props.tabs[1].component

        } else if (this.state.selectedKey == 3) {
            curses = this.props.tabs[2].component

        } else if (this.state.selectedKey == 4) {
            curses = this.props.tabs[3].component

        }

        return (
            <div>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    {tabsDisplay}

                </div>
                <div>
                    {curses}
                </div>
            </div>
        );
    }
}

export default InPageNavbar;