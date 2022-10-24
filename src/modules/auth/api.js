import request from "../../services/api";

class Api {
  static LoginOrSignUp = (attributes) => {
    return request.post("auth/v1/auth/check-phone", {
      ...attributes,
    });
  };

  static SendSmsForSignUp = (attributes, url) => {
    return request.post(url, {
      ...attributes,
    });
  };

  static Login = (attributes) => {
    return request.post(`auth/v1/auth/sign-in`, {
      ...attributes,
    });
  };

  static SignUp = (attributes, url) => {
    return request.post(url, {
      ...attributes,
    });
  };

  static GetMe = (token = null, lang = "uz") => {
    if (token) {
      return request.get("auth/v1/user/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Accept-language": lang,
        },
      });
    }

    return request.get("auth/v1/user/me", {
      headers: { "Accept-Language": lang },
    });
  };

  static SendSmsForLoginOrForgotPassword = (attributes) => {
    return request.post("auth/v1/auth/check-code", {
      ...attributes,
    });
  };

  static Logout = () => {
    return request.get(`auth/v1/user/logout`);
  };
}

export default Api;
