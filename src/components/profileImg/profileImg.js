import React, { Component } from 'react';
import './profileImg.css';
import { Row, Col, Card } from 'react-bootstrap';

class ProfileImg extends React.Component {
    
    render() {
        return (
        <Col xs="12" className="header-icons-Col ">
            <div className="header-icons-profile">
            <img src="images\profile_icon.svg" alt="profile" className="header-profile-img" />
            <span className="header-compose-outline">
            <img src="images\compose.svg" alt="compose" className="header-compose-img" />
            </span>
            </div>
        </Col>
        )
    }
}
export default ProfileImg;