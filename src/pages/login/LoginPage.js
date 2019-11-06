import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import './login.css'
import server from '../../shared/server'
import { Redirect } from 'react-router-dom'
import { loginAction } from "../../store/reducers/ActiveUser/actions";
import { connect } from "react-redux";



class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pwd: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleInputChange(ev) {
        const name = ev.target.name;
        const value = ev.target.value;

        this.setState({
            [name]: value
        });
    }

    login() {
        const { email, pwd } = this.state;

        if (!email || !pwd) {
            alert("נא להזין פרטי משתמש");
            return;
        }

        const data = { email, pass: pwd };

        server(data, "login").then(res => {
            console.log(res);
            if (res.data.error) {
                alert("error in login");
            } else {
                this.props.loginAction(res.data);
                localStorage.activeUser = JSON.stringify(res.data);
            }
        }, err => {
            console.error(err);
        })
    }

    render() {
        const { email, pwd } = this.state;
        const { activeUser } = this.props;

        if (activeUser) {
            return <Redirect to='/courses' />
        }


        return (

            <Container>
                <h1>התחברות</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label></Form.Label>
                        <Form.Control value={email} name="email" type="email" placeholder="אימייל" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label></Form.Label>
                        <Form.Control value={pwd} name="pwd" type="password" placeholder="סיסמה" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={this.login}>
                        התחבר
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    activeUser: state.activeUser
});

const mapDispatchToProps = {
    loginAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);