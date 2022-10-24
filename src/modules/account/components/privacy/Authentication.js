import React, { memo, useState } from "react";
import { Row, Col } from "react-grid-system";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import Field from "../../../../containers/Form/field";
import Icon from "../../../../components/elements/icon";
import Title from "../../../../components/elements/title";
import FormDemo from "../../../../containers/Form/form-demo";
import { showError } from "../../../../utils";
import Button from "../../../../components/elements/button";
import { toast } from "react-toastify";
import { get } from "lodash";

const StyledAuthentication = styled.div`
  padding: 35px 0;

  .row {
    h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }

    .guide_title {
      margin: 30px 0 25px;
    }

    .guide_content {
      margin-bottom: 50px;
    }

    .info_massage {
      background: #f2fdf6;
      border: 1px solid #e2f5e9;
      border-radius: 6px;
      display: flex;
      align-items: center;
      padding: 20px 25px !important;
      margin-top: 25px;

      .ui__icon__wrapper {
        margin-right: 20px;
      }
    }

    .verification {
      .verification__input {
        input {
          width: 73px !important;
          height: 44px !important;
          border-radius: 8px;
        }
      }
    }
  }

  .countdown_col {
    padding-left: 5px !important;

    .refresh {
      width: 40px;
      height: 40px;
      background-color: #fff;
      border: 2px solid #e6e8ec;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const Authentication = ({ defaultTime = 60, operationAdd, operationUpdate }) => {
  const [data, setData] = useState({
    verifyEmail: "",
    time: defaultTime,
  });

  const formRequest = ({ data, setError }) => {
    if (data.smsCode) {
      operationUpdate({
        attributes: { data },
        formMethods: { setError },
        url: `auth/v1/two-step-verification/verify-code-two-step-verification?code=${data.smsCode}`,
        cb: {
          success: (res) => {
            toast.success(get(res, "result.message", "SUCCESS"));
          },
          fail: (res) => {
            showError(res);
          },
        },
      });
    } else {
      operationAdd({
        attributes: data,
        formRequest: { setError },
        method: "post",
        url: "auth/v1/two-step-verification/set-two-step-verification",
        cb: {
          success: (res) => {
            setData((value) => ({
              ...value,
              verifyEmail: res.message,
            }));
          },
          fail: (res) => {
            showError(res, setError);
          },
        },
      });
    }
  };
  return (
    <StyledAuthentication>
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
              <Icon icon="icon-warning2" color="#ECA51D" /> Caution !<br />
              No two-stage protection! We strongly recommend that you install two-stage protection. To take full advantage of the
              system, two-stage protection is required.
            </div>
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title medium fs={16} lHeight={24} className={"guide_title"}>
              Applications of two-stage protection in the system:
            </Title>
            <div className="guide_content">
              <Title medium fs={16} lHeight={24}>
                1. When the password is forgotten
              </Title>
              <Title medium fs={16} lHeight={24}>
                2. When adding and editing secret questions
              </Title>
            </div>
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>New password</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type={"input"}
              name={"password"}
              label={"Password"}
              params={{ required: true }}
              property={{
                placeholder: "Enter password",
                type: "password",
              }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>Repeat the new password</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type={"input"}
              name={"prePassword"}
              label={"Repeat Password"}
              params={{ required: true }}
              property={{
                placeholder: "Enter password",
                type: "password",
              }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>Hint</Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"hint"} placeholder={"Type here..."} />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>Email</Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type="input" name={"email"} label={"Email"} placeholder="Enter Email" params={{ required: true }} />
          </Col>
        </Row>
        {data.verifyEmail && (
          <>
            <Row className={"row"}>
              <Col xs={12}>
                <div className="info_massage">
                  <Icon icon="icon-warning2" color="#45B36B" size={"lg"} />
                  <Title cl={"#45B36B"} sm medium lHeight={24}>
                    Info !<br />
                    {data.verifyEmail}
                  </Title>
                </div>
              </Col>
            </Row>
            <Row className={"row"}>
              <Col xs={4}>
                <Title>Verify your email</Title>
              </Col>
              <Col xs={4}>
                <Field className={"verification"} type={"verification"} hideLabel params={{ required: false }} name={"smsCode"} />
              </Col>
              <Col xs={2} className={"countdown_col"}>
                {data.time > 0 ? (
                  <CountdownCircleTimer
                    className="countdownCircleTimer"
                    isPlaying
                    duration={data.time}
                    colors={"#45B36B"}
                    strokeWidth={3}
                    trailStrokeWidth={4}
                    size={38}
                    trailColor="#B1B5C4"
                    onComplete={(e) => setData((s) => ({ ...s, time: 0 }))}
                  >
                    {({ remainingTime }) => (
                      <span
                        style={{
                          color: "#353945",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {remainingTime}
                      </span>
                    )}
                  </CountdownCircleTimer>
                ) : (
                  <Icon className={"refresh"} icon={"icon-refresh"} color={"#3772FF"} />
                )}
              </Col>
            </Row>
          </>
        )}
      </FormDemo>
    </StyledAuthentication>
  );
};

export default memo(Authentication);
