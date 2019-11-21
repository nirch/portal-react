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
            pwd: "",
            showDiv:false,
            message:""
        
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
        this.closeErrorHandler = this.closeErrorHandler.bind(this)
    }
    closeErrorHandler (){
        this.setState({showDiv:false})
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
           this.setState({
            message:"נא להזין פרטי משתמש",
            showDiv:true
           })
            return;
        }

        const data = { email, pass: pwd };

        server(data, "login").then(res => {
            console.log(res);
            if (res.data.error) {
                this.setState({
                    message:"סיסמא שגויה",
                    showDiv:true
                })
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
            <div className="LogIn">
            <Container>
                <img className="imgLOGO"
                src='images/Login/01.png'
                alt="tapuach logo"
                 />
                
                <div className="loginForm">
                    <input className="loginInput emailInput" type="email" name="email" onChange={this.handleInputChange} placeholder="אימייל"/>
                    <input className="loginInput" type="password" name="pwd" onChange={this.handleInputChange} placeholder="סיסמה"/>
                    <button className="loginBtn" type="button" onClick={this.login}>התחברות</button>
                    <div className={(this.state.showDiv)?"logInpwd hidden":"logInpwd"}>
                    </div>
                    </div>
                    </Container>
                    <div className={(this.state.showDiv)?"loginWrongPWD":"loginWrongPWD  hidden"}>
                        <div className="loginInline">
                        <img  src='images/Login/danger.svg' alt="danger"/>
                        <p className="loginInline" > {this.state.message}</p>
                        </div>
                        <div className="loginSpan loginInline "><button onClick={this.closeErrorHandler} className="loginClose">&times;</button></div>
                    </div>
                    
                </div>
            
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