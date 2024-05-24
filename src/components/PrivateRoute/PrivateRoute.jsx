import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={(props) => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)} />
);

export default withAuth(PrivateRoute);
