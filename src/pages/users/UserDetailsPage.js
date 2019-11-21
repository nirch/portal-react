import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import server from '../../shared/server';
import DetailsHeader from '../../components/detailsHeader/detailsHeader';
import InPageNavbar from '../../components/inPageNavbar/inPageNavbar';
import UserProfile from '../../components/userProfile'
import UserSubordinates from '../../components/userSubordinates';
import UserCourses from '../../components/userCourses';

class UserDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        const pagePath = window.location.href.split("/");
        const userId = pagePath[pagePath.length - 1];

        const data = { userId };

        server(data, "GetUserProfileById").then(res => {
            if (res.data.error) {
                console.error(res.data.error);
            } else {
                let user = res.data.profile;
                this.setState({ user: user });
            }
        }, err => {
            console.error(err);
        })
    }

    // enableBack = () => {
    //     window.history.back()
    // };

    render() {

        const { user } = this.state;
        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }
        const tabsData = [
            { key: 1, title: "פרופיל", component: <UserProfile/>},
            { key: 2, title: "קורסים", component: <UserCourses/>},
            { key: 3, title: "עובדים", component: <UserSubordinates/> },
            { key: 4, title: "דיווח", component: <div></div> }
        ]

        const cardTitle =
            <div>
                <div className="user-cardTitle">{user.firstname}</div>
                <div className="user-cardTitle">{user.lastname}</div>
            </div>

        const cardSubtitle =
            <div>
                <div className="user-cardSubtitle">
                    <label className="checkboxLabel">
                        <input type="checkbox" />
                        <span className="checkboxCustom"></span>
                    </label>
                    <p className="checkboxText">שינוי סיסמה</p>
                </div>
            </div>

        const cardText =
            <span className="user-cardText">{`נרשם ב: ${user.registerdate}`}</span>

        if (!this.state.user) {
            return false;
        } else {
            return (
                <div>
                    <PortalNavbar className="users-Navbar"
                        header="עובדים"
                    // enableBack={this.enableBack} 
                    />

                    <div className="detaislHeader">
                        <DetailsHeader cardTitle={cardTitle} cardSubtitle={cardSubtitle} cardText={cardText}
                            profileImg={true} />
                    </div>

                    <InPageNavbar tabs={tabsData} />

                </div>


            );
        }
    }
}


const mapStateToProps = state => ({
    activeUser: state.activeUser
});


export default connect(
    mapStateToProps
)(UserDetailsPage);
