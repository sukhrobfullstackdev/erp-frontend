import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-grid-system";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import Field from "../../../../containers/Form/field";
import Icon from "../../../../components/elements/icon";
import Title from "../../../../components/elements/title";
import ApiActions from "../../../../services/api/actions";
import { get, isEmpty } from "lodash";
import FormDemo from "../../../../containers/Form/form-demo";
import { getSelectOptionsListFromData } from "../../../../utils";
import Button from "../../../../components/elements/button";

const StyledQuestion = styled.div`
  padding: 25px 0;

  .row {
    h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-top: 10px;
    }

    .questions_text {
      margin: 30px 0 25px;
    }

    .forgotten_text {
      margin-bottom: 50px;
    }

    .form-input-container {
      margin-top: 25px;
    }

    .select__header__content__placeholder {
      color: #777e90;
      font-size: 14px;
      font-weight: 400;
    }

    .select__header__content {
      font-size: 14px;
    }
  }
`;

const Question = ({ getSecurityQuestion, questionData, operationAdd }) => {
  const { resetField, setValue } = useForm();

  const [state, setState] = useState({
    selectedCash: {},
    confirmation: false,
  });
  let options = useMemo(
    () => getSelectOptionsListFromData(get(questionData, "result.data", []), "id", "question"),
    [questionData]
  );

  useEffect(() => {
    isEmpty(questionData) && getSecurityQuestion();
  }, []);

  const onChange = (val, type) => {
    setState((s) => ({
      ...s,
      selectedCash: { ...s.selectedCash, [type]: val },
    }));
  };
  const getDisabledOptions = () => Object.values(state.selectedCash);

  const formRequest = ({ data, setError }) => {
    if (state.confirmation === false) {
      setState((s) => ({ ...s, confirmation: true }));
    } else if (state.confirmation === true) {
      resetField("userQuestions[0].questionId");
      operationAdd({
        attributes: data,
        formRequest: { setError },
        url: "auth/v1/user-question",
        cb: {
          success: (res) => {
            toast.success(get(res, "message", "SUCCESS"));
            setState((s) => ({ ...s, confirmation: false }));
          },
          fail: (res) => "",
        },
      });
    }
  };

  return (
    <StyledQuestion>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={formRequest}
        footer={
          <Button className={"form_btn"} type={"submit"} success>
            Confirm
          </Button>
        }
      >
        <Row>
          <Col xs={12}>
            <div className="caution_massage">
              <Icon icon="icon-warning2" color="#ECA51D" />
              Caution !<br />
              No secret questions! We strongly recommend that you set up confidential questions. Confidential questions need to be
              set up to take full advantage of the system.
            </div>
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title medium fs={16} lHeight={24} className="questions_text">
              Where to use secret questions in the system:
            </Title>
            <Title medium fs={16} lHeight={24} className={"forgotten_text"}>
              When the password is forgotten
            </Title>
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>1. Question</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type="custom-select"
              placeholder="Select question"
              name="userQuestions[0].questionId"
              options={options}
              disabledSomeOptions={getDisabledOptions()}
              onChange={(val, obj) => onChange(obj, "one")}
            />
            <Field
              hideLabel
              type="input"
              placeholder="Enter answer..."
              name="userQuestions[0].answer"
              label={"Answer"}
              params={{ required: true }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>2. Question</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type="custom-select"
              name="userQuestions[1].questionId"
              placeholder="Select question"
              options={options}
              disabledSomeOptions={getDisabledOptions()}
              onChange={(val, obj) => onChange(obj, "two")}
            />
            <Field
              hideLabel
              type="input"
              placeholder="Enter answer..."
              name="userQuestions[1].answer"
              label={"Answer"}
              params={{ required: true }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>3. Question</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type="custom-select"
              name="userQuestions[2].questionId"
              placeholder="Select question"
              options={options}
              disabledSomeOptions={getDisabledOptions()}
              onChange={(val, obj) => onChange(obj, "three")}
            />
            <Field
              hideLabel
              type="input"
              placeholder="Enter answer..."
              name="userQuestions[2].answer"
              label={"Answer"}
              params={{ required: true }}
            />
          </Col>
        </Row>
        {state.confirmation && (
          <>
            <Row className={"row"}>
              <Col xs={12}>
                <div className="info_massage">
                  <Icon icon="icon-warning2" color="#45B36B" size={"lg"} />
                  <Title cl={"#45B36B"} sm medium lHeight={24}>
                    Info !<br />
                    We have to sent the code verification to your email born14kr@gmail.com
                  </Title>
                </div>
              </Col>
            </Row>
            <Row className={"row"}>
              <Col xs={4}>
                <Title>Verify your email</Title>
              </Col>
              <Col xs={4}>
                <Field
                  hideLabel
                  type={"input"}
                  name={"twoStepPassword"}
                  label={"Password"}
                  params={{ required: true }}
                  property={{
                    placeholder: "Enter password",
                    type: "password",
                  }}
                />
              </Col>
            </Row>
          </>
        )}
      </FormDemo>
    </StyledQuestion>
  );
};

const mapStateToProps = (state) => {
  return {
    questionData: get(state, "api.security-question-data.data", {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSecurityQuestion: () => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: "auth/v1/question",
          method: "get",
          storeName: "security-question-data",
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Question);
