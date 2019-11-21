import React, { Component } from 'react';
import ItemsTable from './../components/itemsTable/itemsTable';
import { Col, Row, Spinner ,Container} from 'react-bootstrap';
import server from './../shared/server';
import './../pages/users/users.css'
import PortalInput from '../components/portalInput/portalInput'
import PortalSelect from '../components/portalSelect/portalSelect'

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            profileData: "",
            cityList: "",

        };
        // this.titles = ["קורס", "פרויקט"];
        this.isLoading = false;
    }

    componentDidMount() {
        const pagePath = window.location.href.split("/");
        const userId = pagePath[pagePath.length - 1];
        const cities = [];

        //     // const { page, roleid, search, } = this.state;
        const data = { userId, cities };

        server(data, "GetUserProfileById").then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                this.isLoading = false;
                this.setState({ profileData: res.data.profile });
            }
        }, err => {
            console.error(err);
        })

        // server(data, "GetCities").then(res => {
        //     console.log(res.data)
        //     //     if (res.data.error) {
        //     //         console.error(res.data.error);
        //     //     } else {
        //     //         this.isLoading = false;
        //     //         console.log(res.data.profile)
        //     //         this.setState({ profileData: res.data.profile });
        //     //     }
        //     // }, err => {
        //     //     console.error(err);
        // })
    }

    render() {
        const { profileData } = this.state;

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

            <Container fluid={true}>
                <Row >
                    <Col >
                        <PortalInput title="שם פרטי בעברית" value={profileData.firstname} type="text" onChange={this.handleChange} />
                    </Col>
                    <Col >
                        <PortalInput title="שם משפחה בעברית" value={profileData.lastname} type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <PortalInput title="שם פרטי בערבית" value={profileData.firstnameinarabic} type="text" onChange={this.handleChange} />
                    </Col >
                    <Col >
                        <PortalInput title="שם משפחה בערבית" value={profileData.lastnameinarabic} type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalInput title="מספר טלפון" value={profileData.phone} type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title=" מספר טלפון נוסף" value={profileData.phone2} type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalInput title="שייך ל" type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="תאריך לידה" value={profileData.birthday} type="text" onChange={this.handleChange} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PortalInput title="מספר תעודת זהות" value={profileData.tznumber} type="text" onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="כתובת" value={profileData.address} type="text" onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalSelect title="עיר" options={cityList} onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalSelect title="מגזר" options={sector} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PortalSelect title="מגדר" options={gender} onChange={this.handleChange} />
                    </Col>       <Col>
                        <PortalInput title="אימייל" value={profileData.email} type="email" onChange={this.handleChange} />
                    </Col>
                </Row>

                <PortalInput title="מנהל ישיר" value={profileData.superstaffname} type="text" onChange={this.handleChange} />



            </Container>
        return (
            <div>

                {displayItemsTable}
            </div>
        );
    }
}
export default UserProfile;

