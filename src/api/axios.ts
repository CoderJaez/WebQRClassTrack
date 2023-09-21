import axios from "axios";
const localhost = "10.0.2.2";
const network_ip = "192.168.1.108";
const dev_url = `http://${network_ip}:3000/api/v1/`;
const live_url = "https://qrclass-api.onrender.com/api/v1/";

export default axios.create({
  baseURL: dev_url,
  timeout: 2500,
});

export const axiosPrivate = axios.create({
  baseURL: dev_url,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
