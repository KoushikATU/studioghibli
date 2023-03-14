import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';
// import axios from 'axios'
// import { useEffect, useState } from 'react';


const PremiumContent = (props) => {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';
  // const [data, setData] = useState([])
  // useEffect(()=>{
  //   axios.get('https://jei9r6lp78.execute-api.us-east-1.amazonaws.com/prod/products')
  //           .then(res =>{
  //             console.log(res.data)
  //             setData(res?.data?.data)
  //           })
  //          // .catch(err => {
  //          //   alert('Something went wrong.')
  //          // })
  // },[])
  

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('login');
  }
  return (
    <div>
      Hello {name}! You have been loggined in!!!! Welcome to the premium content. <br />
      
      
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  )
}

export default PremiumContent;