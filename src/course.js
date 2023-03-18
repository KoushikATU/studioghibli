import React from 'react';
import PremiumContent from './PremiumContent';
import { getUser, resetUserSession } from './service/AuthService';
// import axios from 'axios'

  


const Course = (props) =>{
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : ''; 
    const logoutHandler = () => {
        resetUserSession();
        props.history.push('login');
      
    } 
  return (
    <div>
      <form>
        <h5>Course Selection</h5>
        Hello {name}! You have been loggined in!!!! Choose the course !!!<br />
        



        <h5>Select Course:</h5>
      <select id="course" name="course">
        <option value="Moving Castle Creations">Moving Castle Creations</option>
      </select> <br/>
      <input type="button" value="Go to the course" onClick={PremiumContent}/> 
      <h5>Extra Requests for server admin:</h5>
      <textarea id="requests" name="requests" ></textarea> <br/>
      <div>
        <input type="submit" value="Send" />
      </div>  


      <input type="button" value="Logout" onClick={logoutHandler} />
      </form>
    </div>
  )
  }

export default Course;