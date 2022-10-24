import React, { memo, useCallback, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import Title from "../../../components/elements/title";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";
import Flex from "../../../components/elements/flex";
import ApiActions from "../../../services/api/actions";
import reloadImg from "../../../assets/icons/reload.svg";
import MiniLoader from "../../../components/loader/mini-loader";

const ForgotPhoneNumberContainer = ({ request, t, history, match, ...props }) => {
  const [state, setState] = useState({
    nextButtonDisabled: true,
    loading: false,
  });
  let email = get(match, "params.email", "");

  if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

  const onChangeHandling = useCallback((value) => {
    if (/.+@.+\.[A-Za-z]+$/.test(value)) setState((s) => ({ ...s, nextButtonDisabled: false }));
    else if (state.nextButtonDisabled) setState((s) => ({ ...s, nextButtonDisabled: true }));
  }, []);

  const submitHandling = useCallback(({ data }) => {
    setState((s) => ({ ...s, loading: true }));
    request({
      attributes: data,
      cb: {
        success: (res) => {
          // setState(s => ({...s, loading: false }));
          history.push(`/auth/forgot-phone-number/${btoa(get(data, "email", ""))}`);
        },
        fail: (e) => "",
      },
      url: "auth/v1/auth/forgot-login",
      method: "post",
    });
  }, []);

  const goToBack = useCallback(() => {
    if (isEmpty(email)) history.push("/auth");
    else history.push("/auth/forgot-phone-number");
  }, [match]);

  const resend = useCallback(() => {
    submitHandling({ data: { email } });
  }, [match]);

  let showEmail = "";
  if (!isEmpty(email)) {
    email = atob(email);
    showEmail = email.substring(0, 2) + "*****" + email.substring(email.indexOf("@") - 2);
  }

  return (
    <FormDemo formRequest={submitHandling}>
      <div className={"number"}>
        <div className={"number__header"}>
          <Title fs={32} lHeight={48} medium>
            {t("forgot_phone_number_?") ?? "Forgot phone number ?"}
          </Title>
        </div>
        <div className={"number__body"}>
          <Title fs={20} lHeight={30} medium>
            {isEmpty(email)
              ? t("please_enter_your_email_address_to_receive_a_verification_code") ??
                "Please enter your email address to receive a verification code"
              : (t("we_have_send_phone_number_to_your_email") ?? "We have send phone number to your email") + `: ${showEmail}`}
          </Title>
        </div>
        <div className={"number__footer"}>
          {!isEmpty(email) ? (
            <>
              <Button outline_success="1" className="SendAgainButton" center="1" onClick={resend} height="50">
                <img src={reloadImg} alt="reload" className="left-in-button" />
                {t("send_again") ?? "Send again"}
              </Button>
            </>
          ) : (
            <Field
              type={"input"}
              name={"email"}
              label={"EMAIL"}
              placeholder={t("enter_mail_address") ?? "Enter mail address"}
              property={{ type: "email" }}
              onChange={onChangeHandling}
            />
          )}
          <Flex className={"flex"} justify={"space-between"}>
            <Button className={"back-button"} lightSmBorder lightButton onCLick={goToBack}>
              <Icon icon="icon-left-arrow" mainClassName={"left-arrow"} />
              {t("back") ?? "Back"}
            </Button>
            <Button
              className={"next-button"}
              lightSmBorder
              success
              disabled={isEmpty(email) ? state.nextButtonDisabled : true}
              type={"submit"}
            >
              {state.loading ? <MiniLoader /> : t("next") ?? "Next"}
            </Button>
          </Flex>
        </div>
      </div>
    </FormDemo>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(ForgotPhoneNumberContainer)));
