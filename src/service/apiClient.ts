import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
      key: "faf65893cad24da49ea4150bd01e7c4a",
    },
});

export default apiClient;
