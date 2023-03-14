import React, {useState} from 'react';
import axios from 'axios';

import { setUserSession } from './service/AuthService'
const loginAPIUrl = 'https://lxfsrxntnf.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);
   
    const requestBody = {
      username: username,
      password: password
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'mzW9uosG9F1ZZ3uXEo9Vn5Yxxc9tTTo08UwzVecx'
      }
    }

    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      props.history.push('/course');
    }).catch((error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!po');
      }
    })
  }

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

export default Login;