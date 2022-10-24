import React, { memo, useState } from "react";
import { Row, Col } from "react-grid-system";
import styled, { css } from "styled-components";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import Title from "../../../../components/elements/title";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import { toast } from "react-toastify";
import { get } from "lodash";

const StyledPassword = styled.div`
  position: relative;
  padding: 25px 0 0;

  .forgetPassword_btn {
    position: absolute;
    right: 0;
    top: -50px;

    button {
      font-size: 14px;
      border-radius: 6px;
      line-height: 20px;
      font-weight: 400;
      text-transform: none;
    }
  }

  .row {
    h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .title {
    padding: 25px 0px 20px;
  }
`;

const Password = ({ operationUpdate }) => {
  const formRequest = ({ data, setError }) => {
    operationUpdate({
      attributes: data,
      formMethods: { setError },
      url: "auth/v1/user/edit-user-password",
      cb: {
        success: (res) => {
          toast.success(get(res, "result.message", "SUCCESS"));
        },
        fail: (res) => "",
      },
    });
  };

  return (
    <StyledPassword>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={formRequest}
        footer={
          <Button className={"form_btn"} type={"submit"} success>
            Confirm
          </Button>
        }
      >
        <Button className="forgetPassword_btn" danger>
          Forget password ?
        </Button>
        <Row className={"row title"}>
          <Col xs={12}>
            <Title sm medium>
              After a successful password update, you will be redirected to a login page where you can log in with a new password.
            </Title>
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>Current password</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type={"input"}
              name={"currentPassword"}
              label={"Current password"}
              params={{ required: true }}
              property={{
                placeholder: "Enter password",
                type: "password",
              }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={12}>
            <div className="caution_massage">
              <Icon icon="icon-warning2" color="#ECA51D" />
              The password must be at least 8 characters long. Must be uppercase lowercase letters and numbers !!
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
              name={"newPassword"}
              label={"New password"}
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
      </FormDemo>
    </StyledPassword>
  );
};

export default memo(Password);
