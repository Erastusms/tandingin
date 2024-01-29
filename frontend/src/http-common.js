import axios from "axios";
import authHeader from "./services/auth-header";


const tokens= authHeader()
export default axios.create({
  baseURL: "https://tandingin-production.up.railway.app/",
  headers: {
    "Content-type": "multipart/form-data",
    "access_token": tokens.access_token ,
    
  },
  });