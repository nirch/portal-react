import React from 'react';
import server from '../../shared/server';
import '../../pages/courses/courses.css';
import {Container, Row, Col } from 'react-bootstrap';
import PortalInput from '../portalInput/portalInput';
import PortalSelect from '../portalSelect/portalSelect';

class CourseDetailsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
handleChange = (e) => {
    console.log(e.target.value)
}
handleSelect = (e) => {
    console.log(e.target.value)
}
    render() {
        const {courseDetails} = this.props;
        const optionsData = [
            { key: 1, value: "קורס" },
            { key: 2, value: "סיליבוס" },
            { key: 3, value: "סטודנטים" },
            { key: 4, value: "מדריכים" }
        ]
        return (
            <Container fluid = {true}>
                <Row>
                    <PortalInput title="שם קורס מלא" type="text" value = {courseDetails.courseName} onChange={this.handleChange} />
                </Row>
                <Row>
                    <Col>   
                        <PortalInput title="שם קורס מקוצר בעברית" value = {courseDetails.courseSubname} type="text" onChange={this.handleChange} />
                    </Col>
                    <Col>
                        <PortalInput title="שם קורס מקוצר בערבית" type="text" value = {courseDetails.arabic} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                <PortalSelect title="פרוייקט" options={optionsData} onSelect={this.handleSelect} />
                </Row>
                <Row>
                    <Col>
                    <PortalSelect title="עיר" options={optionsData} onSelect={this.handleSelect} />
                    </Col>
                    <Col>
                    <PortalSelect title="שנת תקציב" options={optionsData} onSelect={this.handleSelect} />
                    </Col>
                </Row>
                <Row>
                    <PortalInput title="מדריך" type="text" value = {courseDetails.teacher} onChange={this.handleChange} />
                </Row>
            </Container>
        )
    }
}

export default CourseDetailsTab;