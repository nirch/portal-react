import React, { Component } from 'react';
import ItemsTable from './../components/itemsTable/itemsTable';
import { Col, Row, Spinner } from 'react-bootstrap';
import server from './../shared/server';
import './../pages/users/users.css'
import PortalInput from '../components/portalInput/portalInput'
import PortalSelect from '../components/portalSelect/portalSelect'

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // page: 1,
            roleid: "2",
            // search: "",
            userId: "",

            courses: [],
            // numberOfPages: 1,

        };
        // this.titles = ["קורס", "פרויקט"];
        this.isLoading = false;
    }

    // componentDidMount() {
    //     const pagePath = window.location.href.split("/");
    //     const userId = pagePath[pagePath.length - 1];

    //     // const { page, roleid, search, } = this.state;
    //     const data = { userId };

    //     server(data, "GetUserProfileById").then(res => {
    //         console.log("temp")
        //     if (res.data.error) {
        //         console.error(res.data.error);
        //     } else {
        //         this.isLoading = false;
        //         this.setState({ courses: res.data.enrolled, numberOfPages: res.data.pages });
        //     }
        // }, err => {
        //     console.error(err);
    //     })
    // }
    // courseSearch = (val) => {
    //     this.isLoading = true;
    //     this.setState({ search: val, page: 1 });
    // }
    // courseCurrentPage = (page) => {
    //     this.isLoading = true;
    //     this.setState({ page });
    // }

    render() {
        const { courses } = this.state;

        const cityList = [
            { key: 1, value: "תל-אביב" },
            { key: 2, value: "יהוד" },

        ]

        const sector = [
            { key: 1, value: "יהודי" },
            { key: 2, value: "נוצרי" },
            { key: 3, value: "מוסלמי" },
            { key: 4, value: "אתאיסט" },
        ]

        const gender = [
            { key: 1, value: "זכר" },
            { key: 2, value: "נקבה" },

        ]
// ADD component the handle change should be there
// city
// 

        const tabsData = [
            { key: 1, title: "פרופיל", component: <UserProfile/>},
            { key: 2, title: "קורסים", component: <div></div> },
            { key: 3, title: "עובדים", component: <div></div> },
            { key: 4, title: "דיווח", component: <div></div> }
        ]
        const optionsData = [
            { key: 1, value: "פרופיל" },
            { key: 2, value: "קורסים" },
            { key: 3, value: "עובדים" },
            { key: 4, value: "דיווח" }
        ]


        // const courseDisplay = {}
        // for (var i = 0; i < courses.length; i++) {
        //     courseDisplay[courses[i].courseid] = [];
        //     courseDisplay[courses[i].courseid].push(courses[i].coursename);
        //     courseDisplay[courses[i].courseid].push(courses[i].projectname);
        // }

        var displayItemsTable = this.isLoading ? <div className="user-spinner">טוען נתונים, אנא המתן  <Spinner animation="border" variant="primary" /></div> :

            <div>
                <Row >
                    <Col >
                        <PortalInput title="שם פרטי בעברית" type="text" onChange={this.handleChange} />
                    </Col>
                    <Col >
                        <PortalInput title="שם משפחה בעברית" type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <PortalInput title="שם פרטי בערבית" type="text" onChange={this.handleChange} />
                    </Col >
                    <Col >
                        <PortalInput title="שם משפחה בערבית" type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalInput title="מספר טלפון" type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title=" מספר טלפון נוסף" type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalInput title=" שייך ל" type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="   תאריך לידה" type="text" onChange={this.handleChange} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PortalInput title="מספר תעודת זהות" type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="כתובת" type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalSelect title="  עיר" options={cityList} onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalSelect title="מגזר" options={sector} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalSelect title="מגדר" options={gender} onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="אימייל" type="email" onChange={this.handleChange} />
                    </Col>
                </Row>

                <PortalInput title="מנהל ישיר" type="text" onChange={this.handleChange} />



            </div>
        return (
            <div>

                    {displayItemsTable}
            </div>
        );
    }
}
export default UserProfile;

