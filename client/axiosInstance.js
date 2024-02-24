import axios from "axios";
import Cookies from "js-cookie";

// const instance = axios.create({
//   baseURL: "http://localhost:8800/api",
// });

const instance = axios.create({
  baseURL: "https://soulithic-blog-0c6e31e9a9e9.herokuapp.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
