import axios from "axios";
const NetworkHost = "http://192.168.0.166:8000/api/v1/";
const localhost = "http://localhost:8000/api/v1/";


const apiClient = axios.create({
  baseURL: localhost,
  headers: {
    "Content-Type": "application/json"
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage, sessionStorage, or context
    const token = localStorage.getItem("token"); // Or any other method to retrieve the token
    const parsedToken = token ? JSON.parse(token) : "";
    if (token) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
