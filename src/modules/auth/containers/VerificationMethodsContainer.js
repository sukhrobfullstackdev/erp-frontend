import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { get, isEmpty, isNull } from "lodash";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";
import Title from "../../../components/elements/title";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ApiActions from "../../../services/api/actions";
import MiniLoader from "../../../components/loader/mini-loader";

const StyledVerificationMethodsContainer = styled.div`
  .title {
    text-align: center;
    margin-bottom: 100px;
  }

  .entering_part {
    background: #f4f5f6;
    border: 1px solid #e6e8ec;
    border-radius: 8px;
    padding: 30px 25px;
    margin: 40px 0 20px;
    width: fit-content;

    h2 {
      margin-bottom: 14px;
    }

    .form-checkbox-controler {
      min-width: 402px;

      button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        padding: 10px 15px;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        background-color: #fff;
        transition: 0.5s ease;

        :hover {
          background: #fcfcfd;
        }

        .rc-checkbox-inner {
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background: #f8f8f8;
          border: 1px solid #e0e0e0;

          ::after {
            top: 4px;
            left: 7px;
          }
        }

        .rc-checkbox-checked {
          .rc-checkbox-inner {
            background-color: #45b26b;
            border: 1px solid #fff;
          }
        }
      }

      :last-child {
        button {
          margin-bottom: 0;
        }
      }
    }

    .active {
      .checkbox-with-button {
        button {
          background: rgba(69, 179, 107, 0.15);
        }
      }
    }
  }

  .button_part {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      border-radius: 10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      padding: 15px;
      width: 215px;
      height: 54px;

      :hover {
        background-color: #f4f5f6;
        color: #353945;
      }

      .ui__icon__wrapper {
        transform: rotate(180deg);
        margin-right: 49px;

        .icon-arrow-right-radius {
          width: 6px;
          height: 12px;
        }
      }

      :first-child {
        margin-right: 20px;
      }
    }

    .next_btn {
      button {
        color: #fcfcfd;
        background: #45b26b;
        justify-content: center;
      }
    }

    .disable {
      button {
        background: #fcfcfd;
        color: #b1b5c3;
        cursor: no-drop;
      }
    }
  }
`;

const VerificationMethodsContainer = ({ match, history, t, request }) => {
  const [active, setActive] = useState(null);
  const [state, setState] = useState({
    loading: false,
    options: [],
  });

  if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

  useEffect(() => {
    let res = JSON.parse(atob(get(match, "params.options", {})));
    if (isEmpty(res) && isEmpty(state.options))
      request({
        attributes: {
          phoneNumber: atob(get(match, "params.phone", {})),
        },
        cb: {
          success: ({ data }) =>
            setState((s) => ({
              ...s,
              options: get(data, "options", []),
            })),
          fail: (e) => "",
        },
        url: "auth/v1/auth/forgot-password",
        method: "post",
      });
    else setState((s) => ({ ...s, options: res }));
  }, []);

  const getLabel = useCallback((value) => {
    switch (value) {
      case "PHONE_NUMBER":
        return (
          <Title semiBold lHeight={12} fs={15} cl={"#777E90"}>
            {t("sending_message_to_phone_number") ?? "Sending message to phone number"}
          </Title>
        );
      case "EMAIL":
        return (
          <Title semiBold lHeight={12} fs={15} cl={"#777E90"}>
            {t("sending_message_to_email_address") ?? "Sending message to email address"}
          </Title>
        );
      case "SECURITY_QUESTION":
        return (
          <Title semiBold lHeight={12} fs={15} cl={"#777E90"}>
            {t("secret_question") ?? "Secret question"}
          </Title>
        );
    }
  }, []);

  const submitHandling = useCallback(
    ({ data: { PHONE_NUMBER, EMAIL, SECURITY_QUESTION } }) => {
      let temp = "";
      if (PHONE_NUMBER) temp = "PHONE_NUMBER";
      else if (EMAIL) temp = "EMAIL";
      else if (SECURITY_QUESTION) temp = "SECURITY_QUESTION";
      setState((s) => ({ ...s, loading: true }));

      if (PHONE_NUMBER || EMAIL || SECURITY_QUESTION)
        request({
          attributes: {
            phoneNumber: atob(get(match, "params.phone", {})),
            verificationType: temp,
          },
          cb: {
            success: ({
              data: { abbreviationMessage, reliableDevice, smsCode, smsCodeId, verificationType, questionId, questionText },
            }) => {
              if (SECURITY_QUESTION)
                history.push(
                  `/auth/secret-question/${get(match, "params.phone", {})}/${btoa(JSON.stringify(state.options))}/${btoa(
                    btoa(
                      JSON.stringify({
                        1: {
                          questionId,
                          questionText,
                        },
                      })
                    )
                  )}/${btoa("1")}/${get(match, "params.type", {})}`
                );
              else
                history.push(
                  `/auth/verification/${get(match, "params.phone", {})}/${smsCodeId}/${btoa(abbreviationMessage)}/${btoa(
                    JSON.stringify(state.options)
                  )}/${get(match, "params.type", {})}?verificationType=${btoa(verificationType)}`
                );
            },
            fail: (e) => "",
          },
          url: "auth/v1/auth/select-verification-type",
          method: "post",
        });
    },
    [state.options]
  );

  const goToBack = () => history.push(`/auth/login/${get(match, "params.phone", "")}`);

  return (
    <StyledVerificationMethodsContainer>
      <FormDemo formRequest={submitHandling}>
        <Title className="title" fs={32} medium lHeight={48}>
          Select method for verification
        </Title>
        <Title fs={20} medium lHeight={30}>
          Please enter your email address to receive a verification code
        </Title>
        <div className="entering_part">
          {state.options?.map((item, index) => (
            <div
              key={get(item, "value", "")}
              style={{
                marginBottom: index !== state.options.length - 1 ? "30px" : "0",
              }}
            >
              {getLabel(get(item, "value", ""))}
              <Field
                className={`${active === index && "active"}`}
                type="checkbox"
                name={get(item, "value")}
                label={get(item, "text", "")}
                onChange={(e) => e && setActive(index)}
                defaultValue={active === index}
                inBtn
                leftLabel
              />
            </div>
          ))}
        </div>
        <div className="button_part">
          <Button onCLick={goToBack}>
            <Icon icon="icon-arrow-right-radius" color="#353945" />
            {t("back") ?? "Back"}
          </Button>
          <Button className={`next_btn ${isNull(active) && "disable"}`} type={"submit"} disabled={isNull(active)}>
            {state.loading ? <MiniLoader /> : t("next") ?? "Next"}
          </Button>
        </div>
      </FormDemo>
    </StyledVerificationMethodsContainer>
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

export default withTranslation("pdp")(connect(null, mapDispatchToProps)(memo(VerificationMethodsContainer)));
