import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const axiosConnection = axios.create({
    baseURL: serverUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// axiosConnection.interceptors.request.use(
//     (config) => {
//         if (!config.headers["Authorization"]) {
//           const accessToken = localStorage.getItem("accessToken");
//           if (accessToken) {
//             config.headers["Authorization"] = `Bearer ${accessToken}`;
//           }
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

axiosConnection.interceptors.response.use((response) => response);

export default axiosConnection;
