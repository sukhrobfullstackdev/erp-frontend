import axios from "axios";
import config from "../../config";
import storage from "../local-storage";
import history from "../../router/history";
import { get } from "lodash";

const request = axios.create({
  baseURL: config.API_ROOT,
  params: {},
});

request.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null) || null;
      if (token) {
        config.headers.Authorization = `${get(token, "tokenType")} ${get(token, "accessToken")}`;
      }
    }
    return config;
  },
  (error) => {}
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response.status;
    if (statusCode === 401 || statusCode === 403) {
      history.push("/auth");
    }

    return Promise.reject(error);
  }
);

export default request;
