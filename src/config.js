const getEnvironments = () => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  const isDevelopment = env === "development";

  if (isProduction)
    return process.env.REACT_APP_BASE_URL_PRODUCTION ? process.env.REACT_APP_BASE_URL_PRODUCTION : "production_env_not_found";
  else if (isDevelopment)
    return process.env.REACT_APP_BASE_URL_DEVELOPMENT ? process.env.REACT_APP_BASE_URL_DEVELOPMENT : "development_env_not_found";

  return "unknown_env";
};

const config = {
  APP_NAME: "PDP ERP SYSTEM",
  API_ROOT: getEnvironments(),
  DEFAULT_LANG_CODE: "uz",
  PROJECT_ID: 1,
};

export default config;
