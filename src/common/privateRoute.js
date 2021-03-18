import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './storage';

export const PrivateRoute = ({ children, ...rest }) => {
  return children ? (
    <Route
      {...rest}
      render={({ location }) =>
        Boolean(getUser()) ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  ) : null;
};
