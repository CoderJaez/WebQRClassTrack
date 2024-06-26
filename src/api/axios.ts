import axios from "axios";
// const localhost = "10.0.2.2";
//const network_ip = "127.0.0.1";
//const url = `http://${network_ip}:3000/api/v1/`;
const url = "https://qrclass-api.onrender.com/api/v1/";

export default axios.create({
  baseURL: url,
  timeout: 20000,
});

export const axiosPrivate = axios.create({
  baseURL: url,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
