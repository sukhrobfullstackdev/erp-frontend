import { createRoutine } from "redux-saga-routines";

const LOGIN_OR_SIGNUP = createRoutine("LOGIN_OR_SIGNUP");
const SEND_SMS_FOR_SIGNUP = createRoutine("SEND_SMS_FOR_SIGNUP");
const SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD = createRoutine("SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD");
const SMS_VERIFICATION = createRoutine("SMS_VERIFICATION");
const SIGN_UP = createRoutine("SIGN_UP");
const LOGIN = createRoutine("LOGIN");
const CHECK_AUTH = createRoutine("CHECK_AUTH");
const LOGOUT = createRoutine("LOGOUT");
const SAVE_SIGN_UP_PASSWORD = createRoutine("SAVE_SIGN_UP_PASSWORD");
const SAVE_SIGN_IN_PASSWORD = createRoutine("SAVE_SIGN_IN_PASSWORD");
const SAVE_TOKEN = createRoutine("SAVE_TOKEN");
const AUTH_TRIGGER = createRoutine("AUTH_TRIGGER");
const CHANGE_LANGUAGE = createRoutine("CHANGE_LANGUAGE");
export default {
  LOGIN_OR_SIGNUP,
  SIGN_UP,
  SMS_VERIFICATION,
  LOGIN,
  CHECK_AUTH,
  LOGOUT,
  SEND_SMS_FOR_SIGNUP,
  SAVE_SIGN_UP_PASSWORD,
  SAVE_TOKEN,
  SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD,
  SAVE_SIGN_IN_PASSWORD,
  AUTH_TRIGGER,
  CHANGE_LANGUAGE,
};
