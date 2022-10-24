import React, { useState } from "react";
import { connect } from "react-redux";
import { isEmpty, get } from "lodash";
import Actions from "../actions";
import Flex from "../../../components/elements/flex";
import Button from "../../../components/elements/button";
import MiniLoader from "../../../components/loader/mini-loader";
import Title from "../../../components/elements/title";
import Icon from "../../../components/elements/icon";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";

const SignUpContainer = ({ phone, sendSmsForSignUpRequest, saveSignUpDataRequest, match, history, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstField: true,
    secondField: true,
  });

  const {
    params: { hasPassword },
  } = match;
  if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

  const sendSmsCode = ({ data, setError }) => {
    setLoading(true);
    let temp = {};
    if (hasPassword) temp.url = "auth/v1/auth/check-password-for-set";

    sendSmsForSignUpRequest({
      attributes: { ...data, phoneNumber: phone },
      formMethods: { setError, setLoading },
      ...temp,
      cb: {
        success: ({ phoneNumber, smsCodeId, prePassword, password }) => {
          if (password && prePassword) {
            saveSignUpDataRequest({ password, prePassword });
          }
          history.push(
            `/auth/verification/${btoa(phoneNumber)}/${smsCodeId}/${btoa("none")}/${btoa(JSON.stringify([]))}/${btoa(
              "signup"
            )}?verificationType=${btoa("SET_PASSWORD")}`
          );
        },
        fail: (e) => "",
      },
    });
  };

  const setValue = (value, type) => {
    let temp = "";

    if (type === "first") temp = "firstField";
    else temp = "secondField";

    if (state[temp] && !isEmpty(value)) setState((s) => ({ ...s, [temp]: isEmpty(value) }));
    else if (!state[temp] && isEmpty(value)) setState((s) => ({ ...s, [temp]: isEmpty(value) }));
  };

  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
        Registration
      </Title>
      <FormDemo formRequest={sendSmsCode}>
        <Field
          type={"input"}
          label={"Password"}
          name={"password"}
          property={{
            placeholder: "Enter password",
            type: "password",
          }}
          params={{ required: true }}
          className={"input-container"}
          onChange={(value) => setValue(value, "first")}
        />
        <Field
          type={"input"}
          label={"Confirm password"}
          name={"prePassword"}
          property={{
            placeholder: "Enter confirm password",
            type: "password",
          }}
          params={{ required: true }}
          className={"input-container"}
          onChange={(value) => setValue(value, "second")}
        />
        <Flex justify={"space-between"}>
          <Button onClick={() => history.push("/auth")} center="1" className="backButton" lightButton>
            <Icon icon="icon-left-arrow" mainClassName="left-arrow" className="dark" />
            Back
          </Button>
          <Button disabled={state.firstField || state.secondField} success="1" center="1" type={"submit"} className="nextButton">
            {loading ? <MiniLoader /> : "Next"}
          </Button>
        </Flex>
      </FormDemo>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSmsForSignUpRequest: ({ attributes, formMethods, cb, url = "auth/v1/auth/send-sms-for-register" }) =>
      dispatch({
        type: Actions.SEND_SMS_FOR_SIGNUP.REQUEST,
        payload: { attributes, formMethods, cb, url },
      }),
    saveSignUpDataRequest: (data) =>
      dispatch({
        type: Actions.SAVE_SIGN_UP_PASSWORD.SUCCESS,
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
