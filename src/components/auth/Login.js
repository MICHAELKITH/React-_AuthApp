import React, { Component } from 'react';
import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
           loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const {
            email,
            password
           
        } = this.state
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: email,
                password: password
        
            }
        }, { withCredentials: true })
            .then(response => {
                if (response.data.status === "created")
               this.props.handleSuccessfulAuth(response.data)
            })
            .catch(error => {
                console.log("registration error", error);
            });
         // cookie permission 
        console.log("Form submitted");
        // Add logic for form submission here
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} required/> <br />
                    <input type="password" placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange} required/> <br />
                </form>
            </div>
        );
    }
}
