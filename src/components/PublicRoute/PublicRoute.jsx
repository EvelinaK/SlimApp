/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

const PublicRoute = ({ component: Componet, isAuth, ...route }) => (
  <Route
    {...route}
    render={(props) => (isAuth && route.restricted ? <Redirect to="/calculator" /> : <Componet {...props} />)}
  />
);

export default withAuth(PublicRoute);
