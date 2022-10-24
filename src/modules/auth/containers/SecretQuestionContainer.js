import React, { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Button from "../../../components/elements/button";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import Title from "../../../components/elements/title";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import ApiActions from "../../../services/api/actions";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";

const StyledSecretQuestion = styled.div`
  .title {
    text-align: center;
    margin-bottom: 100px;
  }

  .form {
    margin: 40px 0 20px;

    label {
      font-size: 15px;
    }

    .form-input-container {
      margin-top: 14px;

      .form-input {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        padding: 15px;

        ::placeholder {
          color: #d7dce4;
        }
      }
    }
  }

  .backButton {
    .left-arrow {
      position: absolute;
      left: 15px;
    }
  }
`;

const SecretQuestionContainer = ({ match, history, request, t, password, checkAuth, saveToken }) => {
  const [state, setState] = useState({
    loading: false,
    disable: true,
    temp: {},
  });

  if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

  const question = useMemo(() => JSON.parse(atob(atob(get(match, "params.question", "")))), [match]);
  const page = useMemo(() => atob(get(match, "params.page", "1")), [match]);
  let options = useMemo(() => JSON.parse(atob(get(match, "params.options", {}))), [match]);

  const goToBack = () => {
    if (options.length === Number(page))
      history.push(
        `/auth/verification/${get(match, "params.phone", {})}/${btoa("123")}/${btoa("123")}/${get(
          match,
          "params.options"
        )}?verificationType=${btoa("123")}`
      );
    else if (page === "1")
      history.push(
        `/auth/verification-methods/${get(match, "params.phone", "")}/${get(match, "params.options", "")}/${get(
          match,
          "params.type",
          ""
        )}`
      );
    else if (page === "2") {
      let questions = btoa(btoa(JSON.stringify(question)));
      history.push(
        `/auth/secret-question/${get(match, "params.phone", {})}/${get(match, "params.options", {})}/${questions}/${btoa(
          "1"
        )}/${get(match, "params.type", "")}`
      );
    }
  };

  console.log(atob(get(match, "params.type", "")));
  const submitHandling = useCallback(
    ({ data: { answer } }) => {
      setState((s) => ({ ...s, loading: true }));

      let tempQuestion = { ...question };
      tempQuestion[page] = {
        answer,
        questionId: get(question, `${page}.questionId`, ""),
      };
      let temp = {};
      if (page === "3") temp = { password };

      request({
        attributes: {
          phoneNumber: atob(get(match, "params.phone", {})),
          userQuestions: Object.values(tempQuestion),
          ...temp,
        },
        cb: {
          success: ({ data: { questionId, questionText, accessToken, ...other } }) => {
            setState((s) => ({
              ...s,
              loading: false,
              disable: true,
              temp: {
                setValueData: [
                  {
                    name: "answer",
                    value: "",
                  },
                ],
              },
            }));

            if (options.length === Number(page)) {
              // Storage.set('deviceKey', deviceKey);
              if (accessToken) {
                saveToken({ accessToken, ...other });
                checkAuth(accessToken);
                history.push(`/`);
              }
            } else {
              let questions = {
                ...question,
                [Number(page) + 1]: {
                  questionId,
                  questionText,
                },
              };
              questions[page] = { ...questions[page], answer };
              questions = btoa(btoa(JSON.stringify(questions)));
              history.push(
                `/auth/secret-question/${get(match, "params.phone", {})}/${get(match, "params.options", {})}/${questions}/${btoa(
                  String(Number(page) + 1)
                )}/${get(match, "params.type", "")}`
              );
            }
          },
          fail: (e) => {
            setState((s) => ({ ...s, loading: false }));
          },
        },
        url: "auth/v1/auth/check-user-question",
        method: "post",
      });
    },
    [match]
  );

  return (
    <StyledSecretQuestion>
      <Title className="title" medium fs={32} lHeight={48}>
        {t("secret_question") ?? "Secret Question"}
      </Title>
      <Title medium lHeight={30} fs={20}>
        {page}. {get(question, `${page}.questionText`, "")}
      </Title>
      <FormDemo {...state.temp} formRequest={submitHandling}>
        <Field
          className="form"
          type="input"
          name="answer"
          label={t("answer") ?? "answer"}
          placeholder={t("enter_the_answer") ?? "Enter the answer"}
          params={{ required: true }}
          autoFocus
          onChange={(value) =>
            value && state.disable
              ? setState((s) => ({ ...s, disable: false }))
              : !state.disable && !value && setState((s) => ({ ...s, disable: true }))
          }
        />

        <Flex justify={"space-between"}>
          <Button center="1" className="backButton" lightSmBorder lightButton onCLick={goToBack}>
            <Icon icon="icon-left-arrow" className="dark" mainClassName="left-arrow" />
            {t("back") ?? "Back"}
          </Button>
          <Button center="1" type={"submit"} lightSmBorder success disabled={state.disable} className="nextButton">
            {state.loading ? <MiniLoader /> : t("next") ?? "Next"}
          </Button>
        </Flex>
      </FormDemo>
    </StyledSecretQuestion>
  );
};

const mapStateToProps = (state) => {
  return {
    password: get(state, "auth.sign_in_data", ""),
  };
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
    checkAuth: (token = null) =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
        payload: { token },
      }),
    saveToken: (token = null) =>
      dispatch({
        type: Actions.SAVE_TOKEN.SUCCESS,
        payload: { token },
      }),
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(SecretQuestionContainer)));
