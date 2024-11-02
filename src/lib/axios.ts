import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    "A variável de ambiente 'NEXT_PUBLIC_API_BASE_URL' não está definida."
  );
}

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
