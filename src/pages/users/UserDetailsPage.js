import React, { Component } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import server from '../../shared/server';
import DetailsHeader from '../../components/detailsHeader/detailsHeader';


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
                this.setState({user: user});
            }
        }, err => {
            console.error(err);
        })
    }

    render() {


        if (!this.props.activeUser) {
            return <Redirect to='/' />
        }

        if (!this.state.user) {
            return false;
        } else {
            return (
                <div>
                    <PortalNavbar className="users-Navbar" header="עובדים" />

                    <div className="header-Col">
                        <p> {this.state.user.firstname}</p>
                        <p> {this.state.user.lastname}</p>
                        <p> שינוי סיסמה</p>
                        <p>נרשם  ב:</p>
                    </div>

                    <div>
                        <DetailsHeader />
                    </div>


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
