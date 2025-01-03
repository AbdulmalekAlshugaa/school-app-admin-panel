import axios from "axios";
const NetworkHost = "http://192.168.0.166:8000/api/v1/";
const localhost = "http://localhost:8000/api/v1/";

const apiClient = axios.create({
  baseURL: localhost,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
