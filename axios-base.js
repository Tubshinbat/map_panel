import axios from "axios";

const instance = axios.create({
  baseURL: "https://map.gotire.mn/api/",
  // baseURL: "http://localhost:1015/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
