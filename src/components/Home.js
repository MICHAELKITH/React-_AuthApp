import React, { Component } from 'react'
import Registration from './auth/Registration'
import axios from 'axios';
import Login from './auth/Login'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSuccessfulClick = this.handleSuccessfulClick.bind(this);
    }
    handleSuccessfulAuth(data){
        this.props.handleLogin(data)
        //update parent component
        this.props.history.push("/dashboard");
    }

    handleLogoutClick(){
        axios.delete("http://localhost:3001/logout", {withCredentials: true}).then(response => {
            this.props.handleLogout();
        }).catch(err => {
            console.log("Error", err)
        })
        

    }
  render() {
    return (
      <div>
        <h1>Status : {this.props.loggedInStatus}</h1>
        <button onClick={()=> this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth ={this.handleSuccessfulAuth}/>
        <Login handleSuccessfulAuth ={this.handleSuccessfulAuth}/>
      </div>
    )
  }
}
