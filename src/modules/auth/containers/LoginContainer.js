import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-grid-system";
import { Link, useHistory } from "react-router-dom";
import { get, isArray } from "lodash";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import LoginWith from "../../../components/elements/loginWith";
import Storage from "../../../services/local-storage";
import { getPhoneWithMask } from "../../../utils";
import { toast } from "react-toastify";
import ApiActions from "services/api/actions";

const LoginContainer = ({
  phone,
  loginRequest,
  saveSignInDataRequest,
  checkAuth,
  saveToken,
  request,
  history,
  match,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const login = ({ data, setError }) => {
    const deviceKey = Storage.get("deviceKey");
    setLoading(true);
    loginRequest({
      attributes: { ...data, phoneNumber: phone, deviceKey },
      formMethods: { setLoading, setError },
      cb: {
        success: ({
          hasToken = false,
          phoneNumber = null,
          smsCode: { smsCodeId } = {},
          password = null,
          token = {},
          deviceKey = null,
          options = [],
        }) => {
          if (hasToken && deviceKey) {
            saveToken(token);
            checkAuth(get(token, "accessToken"));
            history.push(`/`);
          } else if (!hasToken) {
            if (password) {
              saveSignInDataRequest(password);
            }
            if (isArray(options) && options.length > 1)
              history.push(`/auth/verification-methods/${btoa(phoneNumber)}/${btoa(JSON.stringify(options))}/${btoa("login")}`);
            else
              history.push(
                `/auth/verification/${btoa(phoneNumber)}/${smsCodeId}/${btoa(getPhoneWithMask(phoneNumber))}/${btoa(
                  JSON.stringify(options)
                )}/${btoa("login")}?verificationType=${btoa("PHONE_NUMBER")}`
              );
          }
        },
        fail: (e) => {
          get(e, "errors", []).forEach((error) => {
            toast.error(get(error, "errorMsg"));
          });
        },
      },
    });
  };

  const forgetPassword = () => {
    request({
      attributes: {
        phoneNumber: atob(get(match, "params.phone", {})),
      },
      cb: {
        success: ({ data }) => {
          const smsCodeId = get(data, "smsCode.smsCodeId", null);
          if (smsCodeId)
            history.push(
              `/auth/verification/${btoa(phone)}/${smsCodeId}/${btoa("dsfsd")}/${btoa(JSON.stringify([]))}/${btoa(
                "forgot"
              )}?verificationType=${btoa("PHONE_NUMBER")}`
            );
        },
        fail: (e) => "",
      },
      url: "auth/v1/auth/forgot-password",
      method: "post",
    });
  };
  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
        Welcome Back, Please <br /> log in to Get started
      </Title>
      <FormDemo
        formRequest={login}
        footer={
          <Flex justify={"space-between"}>
            <Button center className="backButton" lightSmBorder lightButton onCLick={() => history.push("/auth")}>
              <Icon icon="icon-left-arrow" mainClassName="left-arrow" className="dark" />
              Back
            </Button>
            <Button center success="1" type={"submit"} className="nextButton">
              {loading ? <MiniLoader /> : "Next"}
            </Button>
          </Flex>
        }
      >
        <Field
          type={"input"}
          label={"Password"}
          name={"password"}
          property={{ placeholder: "**********", type: "password" }}
          params={{ required: true }}
        />
        <Row>
          <Col xs={12}>
            <div onClick={forgetPassword} className={"forgot-password"}>
              Forgot password ?
            </div>
          </Col>
        </Row>
      </FormDemo>
      <LoginWith />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: Actions.LOGIN.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
    saveSignInDataRequest: (data) =>
      dispatch({
        type: Actions.SAVE_SIGN_IN_PASSWORD.SUCCESS,
        payload: data,
      }),
    checkAuth: (token = null) =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
        payload: { token },
      }),
    saveToken: (token) => dispatch({ type: Actions.SAVE_TOKEN.SUCCESS, payload: { token } }),
    request: ({ attributes, formMethods = {}, cb = {}, method = "get", url }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          cb,
          url,
          method,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
