import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../service/AuthService';

const PrivateRoute = ({ component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={props => {
        return getUser().username  ? <Component {...props} />
        : <Redirect to={{ pathname: '/login'}} />
      }}
    />
  )
}

export default PrivateRoute