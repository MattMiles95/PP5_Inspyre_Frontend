// API
import axios from "axios";

// Set base URL
axios.defaults.baseURL = "https://inspyre-api-6e178387b3cb.herokuapp.com/";

// Default headers
axios.defaults.withCredentials = true;

// Create Axios instances for request and response
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Redirect lock to prevent multiple redirects
axiosReq.isRedirecting = false;
axiosRes.isRedirecting = false;

const handleRedirect = (status) => {
  if (axiosReq.isRedirecting || axiosRes.isRedirecting) return;

  axiosReq.isRedirecting = true;
  axiosRes.isRedirecting = true;

  if (status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/401";
  } else if (status === 403) {
    window.location.href = "/403";
  } else if (status === 503) {
    window.location.href = "/503";
  }
};

// Add request interceptor to attach JWT token to requests
axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle expired token or unauthorized responses
axiosReq.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status) {
      handleRedirect(status);
    }
    return Promise.reject(error);
  }
);

axiosRes.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status) {
      handleRedirect(status);
    }
    return Promise.reject(error);
  }
);
