import axios from "axios";

const url = "https://slimmom-backend.goit.global/"; //'https://slimmom-backend.herokuapp.com/';

axios.defaults.baseURL = url;

class PhonebookService {
  //===================  auth ===================

  register(newUser) {
    return axios.post("/auth/register", newUser);
  }

  login(userCredentials) {
    return axios.post("/auth/login", userCredentials);
  }

  logout() {
    return axios.post("/auth/logout");
  }

  getCurrentUser() {
    return axios.get("/user");
  }

  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  unsetToken() {
    axios.defaults.headers.common.Authorization = ``;
  }

  getDailyRate(userCharacteristics, userId) {
    if (userId) {
      return axios.post(`/daily-rate/${userId}`, userCharacteristics);
    }
    return axios.post(`/daily-rate/`, userCharacteristics);
  }

  deleteEatenProduct(product) {
    return axios.delete(`/day`, { data: product });
  }

  searchProduct(query) {
    return axios.get(`/product/?search=${query}`);
  }

  addProduct(product) {
    //  product = {
    //     "date": "2020-12-31",
    //     "productId": "5d51694802b2373622ff552c",
    //     "weight": 100
    //   }
    return axios.post("/day", product);
  }
  getProducts(date) {
    return axios.post(`/day/info`, date); // дата из календаря для запроса
  }
  refresh(sid) {
    console.log(sid);
    return axios.post(`/auth/refresh`, sid); //сид из store
  }
}

export default new PhonebookService();
