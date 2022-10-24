import axios from "axios";
import RequestApi from "./index";
import { isEqual } from "lodash";

let tokens = {};

const checkToken = (name) => {
  tokens[name] && tokens[name].cancel("Operation canceled by the user.");
  tokens[name] = axios.CancelToken.source();
};

const getConfigWithToken = (name, config = {}) => ({
  ...config,
  cancelToken: tokens[name].token,
});

class Api {
  static getAll = (url, config, method = "get") => {
    if (isEqual(method, "post")) {
      return RequestApi.post(url, config);
    }
    checkToken(url);
    return RequestApi.get(url, getConfigWithToken(url, config));
  };
  static getOne = (url, config) => {
    checkToken(url);
    return RequestApi.get(url, getConfigWithToken(url, config));
  };
  static getData = (url, config, method = "post") => {
    if (isEqual(method, "get")) {
      checkToken(url);
      return RequestApi.get(url, getConfigWithToken(url, config));
    }
    return RequestApi.post(url, config);
  };
  static operationAdd = (url, attributes) => {
    return RequestApi.post(url, attributes);
  };
  static operationDelete = (url, config) => {
    return RequestApi.delete(url, config);
  };
  static operationUpdate = (url, attributes, method = "put") => {
    if (isEqual(method, "patch")) {
      return RequestApi.patch(url, attributes);
    }
    return RequestApi.put(url, attributes);
  };

  static request = (url, attributes, method = "get", config) => {
    if (isEqual(method, "patch")) {
      return RequestApi.patch(url, attributes);
    }
    if (isEqual(method, "put")) {
      return RequestApi.put(url, attributes);
    }
    if (isEqual(method, "delete")) {
      return RequestApi.delete(url, attributes);
    }
    if (isEqual(method, "post")) {
      return RequestApi.post(url, attributes);
    }
    checkToken(url);
    return RequestApi.get(url, attributes, getConfigWithToken(url, config));
  };
}

export default Api;
