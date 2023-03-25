// Import necessary packages
import React, { useState } from 'react';
import axios from 'axios';

// Define the API URL for registration
const registerUrl = 'https://lxfsrxntnf.execute-api.us-east-1.amazonaws.com/prod/register';

// Define the Register component
const Register = () => {
  // Define state variables for name, email, username, password, and message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  // Define a function to handle the form submission
  const submitHandler = (event) => {
    event.preventDefault();
    // Check if all fields are filled out, and display error message if not
    if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
      setMessage('All fields are required');
      return;
    }
    // Clear any existing error message
    setMessage(null);
    
    // Create a request body object with user data
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password
    }

    // Define a request configuration object with API key
    const requestConfig = {
      headers: {
        'x-api-key': 'mzW9uosG9F1ZZ3uXEo9Vn5Yxxc9tTTo08UwzVecx'
      }
    }
    // Send a post request to the API with the request body and configuration
    axios.post(registerUrl, requestBody,requestConfig).then(response => {
      setMessage('Registeration Successful');
    }).catch(error => {
      // Handle errors by displaying appropriate message
      if (error.response.status === 401) {
        setMessage(error.response.data.message);
      } else {
        setMessage('sorry....the backend server is down!! please try again later');
      }
    })
  }

  // Render the registration form and error message (if any)
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        Name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
        Email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
        Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        Password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <input type="submit" value="Register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

// Export the Register component
export default Register;
