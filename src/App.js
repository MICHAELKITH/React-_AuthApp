import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import axios from "axios";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "Not Logged in",
      user: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  checkingLogin() {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ){
          this.setState({
            loggedInStatus: "LOGIN_IN",
            user: response.data.user
          });
        }else if(response.data.logged_in && this.state.loggedInStatus==="login_in"){
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {

            }
          });
        }
         
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.checkingLogin();
  }
  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged in",
      user: data.user,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
