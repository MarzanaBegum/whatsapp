import axios from "axios";

const APP_URL = process.env.APP_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: APP_URL + "/api",
});

export default api;