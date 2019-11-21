import React, { Component } from 'react';
import './detailsHeader.css';
import { Row, Col, Card } from 'react-bootstrap';
import ProfileImg from '../profileImg/profileImg';

class DetailsHeader extends Component {
    constructor(props) {
        super(props);
    }

    back = () => {console.log("back")};
    copy = () => {console.log("copy")};
    save = () => {console.log("save")};

    render() {

        let showProfileImg = this.props.profileImg ? <ProfileImg/> : false;    

        return (
            <Row className="header-Row">
                <Col xs="6" className="header-Col">
                    <Card className="header-Card">
                        <Card.Body>
                            <Card.Title>{this.props.cardTitle}</Card.Title>
                            <Card.Subtitle>{this.props.cardSubtitle}</Card.Subtitle>
                            <Card.Text>{this.props.cardText}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="6" className="header-Col">
                    <Row className="header-icons-Row">
                        <Col xs="12" className="header-icons-Col header-icons-actions">
                            <div className="header-iconGroup">
                                <img className="header-iconGroupItem" src="images\CourseControls\Back\drawable-mdpi\noun_back_arrow_2690272.png" alt="back" onClick={this.back}/>
                                <img className="header-iconGroupItem" src="images\CourseControls\Copy\drawable-mdpi\noun_copy_573715.png" alt="copy" onClick={this.copy}/>
                                <img className="header-iconGroupItem" src="images\CourseControls\Save\drawable-mdpi\noun_save_2429243.png" alt="save" onClick={this.save}/>
                            </div>
                        </Col>
                        {showProfileImg}
                    </Row>
                </Col>
            </Row>

        );
    }
}

export default DetailsHeader;