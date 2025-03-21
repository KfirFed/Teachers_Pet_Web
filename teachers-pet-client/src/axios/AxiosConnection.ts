import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const axiosConnection = axios.create({
    baseURL: serverUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosConnection.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosConnection.interceptors.response.use((response) => response);

export default axiosConnection;
