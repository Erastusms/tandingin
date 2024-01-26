import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://tandingin-production.up.railway.app/api/v1/";
const API_ALL = "https://tandingin-production.up.railway.app/";


// const getPublicContent = () => {
//   return axios.get(API_ALL + `admin/league/list/all`);
// };
const getPublicContent = (page,pageSize) => {
  return axios.get(API_ALL + `admin/league/list/all?page=${page}&pageSize=${pageSize}`);
};
const getLeagueDetails = (id) => {
  return axios.get(API_ALL + `admin/league/detail/${id}`,{ headers: authHeader() });
};
const getUserBoard = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getProfile,
  getLeagueDetails,
  
};