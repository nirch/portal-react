import React, { Component } from 'react';
import '../hours/hoursApprove.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import SelectMonth from '../../components/hoursApprove/selectMonth'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap'


class HoursApprovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }

    }

    changeMonthYear = (month, year) => {
        this.setState({ month, year })

    }
    toggleImage = (e) => {
        if (e.target.src.includes("ArrowDown")) { e.target.src = "/images/ArrowUp/drawable-xxhdpi/arrow_down.png" }
        else { e.target.src = "/images/ArrowDown/drawable-xxhdpi/arrow_down.png" }
    }
    render() {
        const tempDate = "12/12/2010";
        const tempHours = 9;
        const tempProject="שם הפרויקט המלא";
        const tempName="שם נושא הפעילות המלא";
        const tempActivity="שם הקורס המלא";

        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        const { year, month } = this.state;
        return (
            <div>
                <PortalNavbar />
                <SelectMonth changeMonthYear={this.changeMonthYear} />
                <input type="text" placeholder="חיפוש עובד" />
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col xs="5">
                                    <h4>שם העובד 1</h4>
                                </Col>
                                <Col xs="5">
                                    <p><span style={{ color: "#f5cc0c", marginRight: "2px" }}>50  </span><span style={{ color: "#338d12", marginRight: "2px" }}>50  </span><span style={{ color: "#ff0000", marginRight: "2px" }}>50  </span><span style={{ color: "#5d5d5d", marginRight: "7px" }}>150</span></p>
                                </Col>
                                <Col xs="2">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <img onClick={this.toggleImage} className="arrowleftright" src="/images/ArrowDown/drawable-xxhdpi/arrow_down.png" />
                                    </Accordion.Toggle>
                                </Col>
                            </Row>

                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row>
                                    <Col xs="4">
                                        <button className="roundButton whiteButton"></button>

                                        <p className="buttonTag">סמן הכל</p>
                                    </Col>
                                    <Col xs="4">
                                        <button className="roundButton greenButton"></button>

                                        <p className="buttonTag">אישור מסומנים</p>
                                    </Col>
                                    <Col xs="4">
                                        <button className="roundButton redButton"></button>

                                        <p className="buttonTag">דחיית מסומנים</p>
                                    </Col>
                                </Row>




                                <div className="hoursLeg">
                                    <Row>
                                        <Col xs="6"></Col>
                                        <Col xs="2">
                                            <p className="radioTag redTag">דחה</p>
                                            <div className="radiocontainer">
                                                <input className="Radio" type="radio" name="choose" value="decline" />

                                            </div>
                                        </Col>
                                        <Col xs="2">
                                            <p className="radioTag yellowTag">ממתין</p>
                                            <div className="radiocontainer">
                                                <input className="Radio" type="radio" name="choose" value="wait" />

                                            </div>
                                        </Col>
                                        <Col xs="2">
                                            <p className="radioTag greenTag">אשר</p>
                                            <div className="radiocontainer">
                                                <input className="Radio" type="radio" name="choose" value="accept" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="hoursContainer" style={{ backgroundColor: "#ffa1a1" }}>
                                        <div className="threeDots">
                                            <div className="smallBlackRound"></div>
                                            <div className="smallBlackRound"></div>
                                            <div className="smallBlackRound"></div>
                                        </div>
                                        <div className="hoursNavBar">

                                        </div>
                                        <Row>
                                            <Col xs="2">
                                                <input className="chekBoxHours" type="checkbox" name="hoursCheck" />
                                            </Col>
                                            <Col xs="4">
                                                <p className="textInHoursLegBold"> תאריך: {tempDate}</p>
                                            </Col>
                                            <Col xs="4">
                                                <p className="textInHoursLegBold"> סה"כ שעות: {tempHours}</p>
                                            </Col>
                                            <Col xs="2">

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="4">
                                                <p className="textInHoursHead"> פרויקט</p>
                                                <p className="textInHours">{tempProject}</p>
                                            </Col>
                                            <Col xs="4">
                                            <p className="textInHoursHead"> מס/שם קורס</p>
                                                <p className="textInHours">{tempName}</p>
                                            </Col>
                                            <Col xs="4">
                                            <p className="textInHoursHead"> נושא פעילות</p>
                                                <p className="textInHours">{tempActivity}</p>
                                            </Col>
                                        </Row>
                                        <Row>

                                        </Row>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(HoursApprovePage);
