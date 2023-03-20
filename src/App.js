// Import necessary modules from the "react-router-dom" library

import { BrowserRouter, NavLink, Route, Switch} from "react-router-dom";

// Import components from other files
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Admin from "./Admin";
import Course from "./course";
import PremiumContent from "./PremiumContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";

// Import necessary modules from the "react" and "axios" libraries

import axios from "axios";

// URL of the API endpoint that checks the validity of an access token
const verifyTokenAPIURL = 'https://lxfsrxntnf.execute-api.us-east-1.amazonaws.com/prod/verify'; //Api link to check token 

function App() {
  // State variable for checking whether the user is being authenticated
  const [isAuthenicating, setAuthenicating] = useState(true);

  // useEffect hook is called after the component is mounted
  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    // Configure the headers and request body for the Axios API call
    const requestConfig = {
      headers: {
        'x-api-key': 'mzW9uosG9F1ZZ3uXEo9Vn5Yxxc9tTTo08UwzVecx' //Secret Api Access key
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }
    // Axios API send request to Amazon Lambda function 
    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/course">Course</NavLink>
        <NavLink activeClassName="active" to="/premium-content">Premium Content</NavLink>
        <NavLink activeClassName="active" to="/Admin">Admin</NavLink> 
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <PrivateRoute path="/course" component={Course}/> 
          <PrivateRoute path="/premium-content" component={PremiumContent}/>
          <PrivateRoute path="/Admin" component={Admin}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
