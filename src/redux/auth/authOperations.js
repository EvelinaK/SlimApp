import authActions from './authActions';
import api from '../../services/backend.service';

const register = (credentials, history) => (dispatch) => {
  dispatch(authActions.registerRequest());
  api
    .register(credentials)
    .then(({ data }) => {
      dispatch(authActions.registerSuccess(data));
    })
    .then(() => history.push('/login'))
    .catch((err) => {
      if (err.response.data) {
        dispatch(authActions.loginError(err.response.data));
      } else dispatch(authActions.loginError(err));
    });
};

const login = (credentials) => (dispatch) => {
  dispatch(authActions.loginRequest());
  api
    .login(credentials)
    .then(({ data }) => {
      api.setToken(data.accessToken);
      const {
        user: { username, id, userData },
        accessToken,
        sid,
      } = data;

      const userInfo = {
        auth: { accessToken, sid },
        user: {
          username,
          id,
          userData,
          eatenProducts: [],
          daySummary: {},
          summaries: [],
        },
      };

      dispatch(authActions.loginSuccess(userInfo));
    })
    .catch((err) => {
      if (err.response.data) {
        dispatch(authActions.loginError(err.response.data));
      } else dispatch(authActions.loginError(err));
    });
};

const logout = () => (dispatch) => {
  dispatch(authActions.logoutRequest());
  api
    .logout()
    .then(({ data }) => {
      api.unsetToken();
      dispatch(authActions.logoutSuccess(data));
    })
    .catch((err) => dispatch(authActions.logoutError(err)));
};

const refresh = () => (dispatch, getState) => {
  dispatch(authActions.refreshRequest());
  const {
    auth: { sid, refreshToken },
  } = getState();
  api.setToken(refreshToken);
  api
    .refresh({ sid: sid })
    .then(({ data }) => {
      dispatch(authActions.refreshSuccess(data.newAccessToken));
    })
    .catch((err) => {
      return dispatch(authActions.refreshError(err));
    });
};

const ops = { register, login, logout, refresh };

export default ops;
