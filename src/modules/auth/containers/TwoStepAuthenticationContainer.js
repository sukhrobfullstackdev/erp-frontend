import React, { memo, useState } from "react";
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
import { withTranslation } from "react-i18next";
import ApiActions from "../../../services/api/actions";

const TwoStepAuthenticationContainer = ({
  phone,
  loginRequest,
  saveSignInDataRequest,
  checkAuth,
  saveToken,
  t,
  match,
  request,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

  const requestHandling = ({ data, setError }) => {
    setLoading(true);
    request({
      attributes: {
        phoneNumber: atob(get(match, "params.phone", {})),
        ...data,
      },
      url: "auth/v1/two-step-verification/check-two-step-verification-password",
      method: "post",
      cb: {
        success: () => {
          setLoading(false);
          history.push(
            `/auth/reset-password/${get(match, "params.phone", {})}/${get(match, "params.options", "")}/${get(
              match,
              "params.type",
              ""
            )}/${get(match, "params.hint", {})}/${get(match, "params.smsCode", "")}/${get(match, "params.smsId", "")}`
          );
        },
        fail: (e) => {
          setLoading(false);
        },
      },
    });
  };

  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
        {t("two_factor_authentication") ?? "Two factor Authentication"}
      </Title>
      <FormDemo
        formRequest={requestHandling}
        footer={
          <Flex justify={"space-between"}>
            <Button
              center
              className="backButton"
              lightSmBorder
              lightButton
              onCLick={() =>
                history.push(
                  `/auth/verification-methods/${get(match, "params.phone", "")}/${get(match, "params.options", "")}/${get(
                    match,
                    "params.type",
                    ""
                  )}`
                )
              }
            >
              <Icon icon="icon-left-arrow" mainClassName="left-arrow" className="dark" />
              Back
            </Button>
            <Button center success="1" type={"submit"} className="nextButton">
              {loading ? <MiniLoader /> : "Next"}
            </Button>
          </Flex>
        }
      >
        <Title medium lHeight="30" fs="20" className={"text-center mb-40"}>
          <span>{t("hint") ?? "Hint"}: </span>
          <span>{atob(get(match, "params.hint"))}</span>
        </Title>

        <Field
          type={"input"}
          label={"Password"}
          name={"password"}
          property={{ placeholder: "**********", type: "password" }}
          params={{ required: true }}
          className={"input-container"}
        />
      </FormDemo>
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

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(TwoStepAuthenticationContainer)));
