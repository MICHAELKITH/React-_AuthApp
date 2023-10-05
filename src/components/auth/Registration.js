import React, { Component } from 'react';
import axios from 'axios';
export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
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
            password,
            password_confirmation
        } = this.state
        axios.post("http://localhost:3001/registration", {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        }, { withCredentials: true })
            .then(response => {
                console.log("registration res", response);
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
                    <input type="password" placeholder='Password confirmation' name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange} required/> <br />
                    <button type='submit'>Create Account</button>
                </form>
            </div>
        );
    }
}
