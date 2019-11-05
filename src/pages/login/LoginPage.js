import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import './login.css'
import server from '../../shared/server'
import { Redirect } from 'react-router-dom'


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

        if(!email||!pwd)
		{
			alert("נא להזין פרטי משתמש");
			return;
        }
        
        const data = {email, pass: pwd};

        server(null, data, "login").then(res => {
            console.log(res);
            debugger;
            if (res.data.error) {
                alert("error in login");
            } else {
                this.props.handleLogin(res.data);
            }
        }, err => {
            console.error(err);
        })
    }

    render() {
        const { email, pwd } = this.state;
        const { activeUser } = this.props;

        debugger;
        if (activeUser) {
            return <Redirect to='/courses' />
        }


        return (

            <Container>
                <h1>התחברות</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label></Form.Label>
                        <Form.Control value={email} name="email" type="email" placeholder="אימייל" onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label></Form.Label>
                        <Form.Control value={pwd} name="pwd" type="password" placeholder="סיסמה" onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={this.login}>
                        התחבר
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default LoginPage;