import React, { Component } from 'react';
import './detailsHeader.css'


class DetailsHeader extends Component {
    constructor(props) {
        super(props);
        
    }


    render() {


        return (
            <div classname="header-Row">
                <div className="header-Col">
                    <p> {this.props.line1}</p>
                    <p> {this.props.line2}</p>
                    <p> {this.props.line3}</p>
                    <p>{this.props.line4}</p>
                </div>
                <div className="header-Col">
                    <div classname="header-icons-Row">
                        <div className="header-icons-Col header-icons-actions">
                            <div className="header-iconGroup">
                                
                                <img src="noun_save_2429243.svg" alt="save" />
                                <img src="noun_copy_573715.svg" alt="copy" />
                                {/* <img src="images\CourseControls\Back\drawable-mdpi\noun_back_arrow_2690272.png"" alt="back" /> */}
                            </div>
                        </div>
                        <div className="header-icons-Col header-icons-profile">
                            <img src="profile_icon.svg" alt="profile" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DetailsHeader;