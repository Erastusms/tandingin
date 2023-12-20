import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://tandingin-production.up.railway.app/api/v1/";


const register = (fullname, username, email, password, reTypePassword, role) => {
  // return axios.post(API_URL + "signup", {
    return axios.post(API_URL + "register", {
    fullname,
    username,
    email,
    password,
    reTypePassword,
    role
  });
};

const login = (email, password) => {
  return axios
    // .post(API_URL + "signin", {
    .post(API_URL + "login", {

      email,
      password,
    })
    .then((response) => {
      if (response.data.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
