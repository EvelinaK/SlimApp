const getProductsSelectors = (state) => state.user.eatenProducts;
const getDaySummary = (state) => state.user.daySummary;
const getnotAllowedProducts = (state) => state.user.userData.notAllowedProducts;
const getCalories = (state) => state.user.dailyRate;
const getProducts = (state) => state.user.notAllowedProducts;
const getCurrentDayId = (state) => state.user.currentDayId;
const getUserId = (state) => state.user.id;
const getSummaries = (state) => state.user.summaries;
const getUserInfo = (state) => state.user.userData;
const getUserDataDailyRate = (state) => state.user.userData.dailyRate; //для только что зареганного польз-ля
const getCurrentDay = (state) => state.user.currentDay;

const selectors = {
  getProductsSelectors,
  getDaySummary,
  getnotAllowedProducts,
  getProducts,
  getCalories,
  getUserId,
  getCurrentDayId,
  getCurrentDay,
  getUserDataDailyRate,
  getSummaries,
  getUserInfo,
};
export default selectors;
