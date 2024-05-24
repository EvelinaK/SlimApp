import userActions from './userActions';
import api from '../../services/backend.service';

const getProductListHelper = (date, dispatch) => {
  dispatch(userActions.getProductsRequest());
  api
    .getProducts({ date })
    .then(({ data }) => {
      let payload = {};
      if (data.daySummary) {
        const { daySummary, eatenProducts, id } = data;
        payload = { daySummary, eatenProducts, currentDayId: id };
      } else {
        payload = {
          daySummary: { ...data },
          eatenProducts: [],
          currentDayId: null,
        };
      }
      dispatch(userActions.getProductsSuccess(payload));
    })
    .catch((err) => dispatch(userActions.getProductsError(err)));
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { accessToken },
  } = getState();

  if (!accessToken) return;

  api.setToken(accessToken);

  dispatch(userActions.getCurrentUserRequest());

  api
    .getCurrentUser()
    .then(({ data }) => {
      const { username, id, userData } = data;
      if (data.days && data.days.length) {
        const today = new Date().toJSON().slice(0, 10);
        const todaySummary = data.days.find((day) => day.date === today)
          ? data.days.find((day) => day.date === today).daySummary
          : null;
        if (!todaySummary) {
          const userInfo = {
            username,
            id,
            userData,
            summaries: [],
          };
          dispatch(userActions.getCurrentUserSuccess(userInfo));
        } else {
          const userInfo = {
            username,
            id,
            userData,
            daySummary: todaySummary,
            summaries: [],
          };
          dispatch(userActions.getCurrentUserSuccess(userInfo));
        }
      } else {
        const userInfo = {
          username,
          id,
          userData,
          summaries: [],
        };
        dispatch(userActions.getCurrentUserSuccess(userInfo));
      }
    })
    .catch((err) => dispatch(userActions.getCurrentUserError(err)));
};

const getDailyRate = (userCharacteristics) => (dispatch) => {
  dispatch(userActions.getDailyRateRequest());

  api
    .getDailyRate(userCharacteristics)
    .then(({ data }) => {
      return dispatch(userActions.getDailyRateSuccess(data));
    })
    .catch((err) => dispatch(userActions.getDailyRateWithIdError(err)));
};

const getDailyRateWithId = (userCharacteristics, userId, date) => (dispatch) => {
  dispatch(userActions.getDailyRateWithIdRequest());
  api
    .getDailyRate(userCharacteristics, userId)
    .then(({ data }) => {
      if (!date) {
        date = new Date().toJSON().slice(0, 10);
      }
      getProductListHelper(date, dispatch);

      const { summaries, dailyRate, notAllowedProducts } = data;
      const payload = { summaries, dailyRate, notAllowedProducts };
      return dispatch(userActions.getDailyRateWithIdSuccess(payload));
    })
    .catch((err) => dispatch(userActions.getDailyRateWithIdError(err)));
};

const addProduct = (product) => (dispatch) => {
  dispatch(userActions.addProductRequest());
  api
    .addProduct(product)
    .then(({ data }) => {
      let payload = {};
      if (data.newDay) {
        payload = {
          eatenProducts: data.newDay.eatenProducts,
          daySummary: data.newSummary,
          currentDayId: data.newDay.id,
        };
        dispatch(userActions.addProductSuccess(payload));
      } else {
        payload = {
          eatenProducts: data.day.eatenProducts,
          daySummary: data.daySummary,
        };
        dispatch(userActions.addProductSuccess(payload));
      }
    })
    .catch((err) => {
      if (err.response.data.message === '"productId" is not allowed to be empty') {
        dispatch(userActions.addProductError('Please, choose a product from dropdown list'));
      } else dispatch(userActions.addProductError(err.message));
    });
};

const getProducts = (date) => (dispatch, getState) => {
  const {
    auth: { accessToken },
  } = getState();

  if (!accessToken) return;

  api.setToken(accessToken);
  dispatch(userActions.getProductsRequest());
  api
    .getProducts(date)
    .then(({ data }) => {
      let payload = {};
      if (data.daySummary) {
        const { daySummary, eatenProducts, id } = data;
        payload = { daySummary, eatenProducts, currentDayId: id };
      } else {
        payload = {
          daySummary: { ...data },
          eatenProducts: [],
        };
      }
      dispatch(userActions.getProductsSuccess(payload));
    })
    .catch((err) => dispatch(userActions.getProductsError(err)));
};

const deleteEatenProduct = (product, date) => (dispatch) => {
  dispatch(userActions.deleteEatenProductRequest());
  api
    .deleteEatenProduct(product)
    .then(({ data }) => {
      getProductListHelper(date, dispatch);
      return dispatch(userActions.deleteEatenProductSuccess(data.newDaySummary));
    })
    .catch((err) => dispatch(userActions.deleteEatenProductError(err)));
};

export { getCurrentUser, getDailyRate, addProduct, deleteEatenProduct, getProducts, getDailyRateWithId };
