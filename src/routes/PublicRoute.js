import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser,getToken } from '../service/AuthService';

const PublicRoute = ({ component: Component, ...rest}) => {
  const routefunction= () =>{
    if( getUser().username === "darshan") 
    { 
  <Redirect to={{ pathname: '/Admin'}} />
    }
    else{
  <Redirect to={{ pathname: '/course'}} />
    }
}
  return (
    <Route 
      {...rest}
      render={props => {
        return !getToken ()? <Component {...props} />
        :routefunction();
      //   : const routefunction= () =>{
      //     if( getToken()==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcnNoYW4iLCJuYW1lIjoiRGFyc2hhbiIsImlhdCI6MTY3OTQwMDg3MSwiZXhwIjoxNjc5NDA0NDcxfQ.aE7p0Nn9ciRBO72h86RllvfJx_fkhddXDpe0cWaeSj8") 
      //     { 
      //   <Redirect to={{ pathname: '/login'}} />
      //     }
      //     else{
      //   <Redirect to={{ pathname: '/course'}} />
      //     }
      // }
      }}
    />
  )
}

export default PublicRoute