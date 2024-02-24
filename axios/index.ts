// Import necessary modules and utilities
import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// API functions for different actions
export const gemini = (data: { prompt: string }) => {
  return apiClient.post("/api/gemini", data);
};

export const bot = (data: { prompt: string; history: any[] }) => {
  return apiClient.post("/api/bot", data);
};

export const bot2 = (data: { prompt: string; image: string }) => {
  return apiClient.post("/api/bot2", data);
};
