import React, { Component, Suspense, lazy, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import jwt_decode from "jwt-decode";
// import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/user/userOperations';
import { authOperations, authSelectors } from '../../redux/auth';
import globalSelectors from '../../redux/global/globalSelectors';
import authActions from '../../redux/auth/authActions';

import routes from '../../routes';
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import Loader from '../shared/Loader';
import Layout from '../Layout';
import Alert from '../Alert';


import './App.scss';

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authError && this.props.authError.includes('401')) {
      this.props.clearError();
    }
  }

  render() {
    const routesMap = routes.map((route) => {
      return route.privated ? (
        <PrivateRoute key={route.path} {...route} />
      ) : (
        <PublicRoute key={route.path} {...route} />
      );
    });

    return (
      <Fragment>
        <Alert />
        <Layout>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routesMap}
              <Route component={lazy(() => import('../../pages/NotFound'))} />
            </Switch>
          </Suspense>
        </Layout>
      </Fragment>
    );
  }
}



const mapStateToProps = (state) => ({
  authError: globalSelectors.getError(state),
  accessToken: authSelectors.getToken(state),
  sid: authSelectors.sid(state),
  isLoading: globalSelectors.getLoading(state),
});
const mapDispatch = {
  getCurrentUser,
  refreshToken: authOperations.refresh,
  clearError: authActions.clearError,
};

export default connect(mapStateToProps, mapDispatch)(App);
