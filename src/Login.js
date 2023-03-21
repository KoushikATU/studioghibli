// Import necessary modules
import React, { useState } from 'react';
import axios from 'axios';

// Import custom function from AuthService.js file
import { setUserSession } from './service/AuthService'

// Set the API URL for the login page
const loginAPIUrl = 'https://lxfsrxntnf.execute-api.us-east-1.amazonaws.com/prod/login';

// Create a React component named Login with props parameter
const Login = (props) => {
  // Define three states for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // Define submitHandler function that is triggered when the login form is submitted
  const submitHandler = (event) => {
    event.preventDefault();
    
    // Check if both username and password fields are not empty
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }

    // Clear the error message if there is no error
    setErrorMessage(null);

    // Define a request body with the provided username and password
    const requestBody = {
      username: username,
      password: password
    }

    // Define a request config with the provided x-api-key value
    const requestConfig = {
      headers: {
        'x-api-key': 'mzW9uosG9F1ZZ3uXEo9Vn5Yxxc9tTTo08UwzVecx'
      }
    }

    // Send a POST request to the login API URL with the provided request body and request config
    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      // Call the setUserSession function with the user and token data returned from the API
      setUserSession(response.data.user, response.data.token);
      
      // Redirect to different pages based on the user type
      if (response.data.user.username !=="darshan"){
        //console.log(response.data.user)
        props.history.push('/course');
      } else if (response.data.user.username ==="darshan") {
        console.log(response.data.user.username)
        props.history.push('/Admin');
      }
    }).catch((error) => {
      // Set the error message based on the error response status code
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!po');
      }
    })
  }

  // Render a login form with username, password, and submit button inputs
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <input  type="submit" value="Login" /> <br/>
      </form>

    
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

// Export the Login component as a default export
export default Login;
