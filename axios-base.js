import axios from "axios";

const instance = axios.create({
  baseURL: "https://map.webr.mn/api/",
  // baseURL: "http://localhost:1013/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
