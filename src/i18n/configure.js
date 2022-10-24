import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import config from "../config";
import storage from "../services/local-storage";
import { get } from "lodash";

const options = {
  fallbackLng:
    get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "settings", null)), "lang", config.DEFAULT_LANG_CODE) || "uz",
  whitelist: ["uz", "ru", "en"],
  ns: ["pdp"],
  defaultNS: "pdp",
  keySeparator: false,
  interpolation: {
    escapeValue: true,
    formatSeparator: ",",
  },
  react: {
    useSuspense: false,
    wait: true,
  },
  backend: {
    customHeaders: {
      Authorization: `${get(
        get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null),
        "tokenType"
      )} ${get(get(JSON.parse(get(JSON.parse(storage.get("persist:storage")), "auth", null)), "token", null), "accessToken")}`,
    },
    loadPath: `${config.API_ROOT}auth/v1/auth/language/{{lng}}`,
    addPath: `${config.API_ROOT}auth/v1/language/key`,
  },
  saveMissing: true,
};

export default () => {
  i18n.use(Backend).use(initReactI18next).init(options);
  return i18n;
};
