import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import Field from "../../../../containers/Form/field";
import Button from "../../../../components/elements/button";
import Title from "../../../../components/elements/title";
import FormDemo from "../../../../containers/Form/form-demo";

const StyledAuthenticationEmail = styled.div`
  padding: 10px 0;
  position: relative;

  .disable_btn {
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

    .guide_title {
      margin: 30px 0 25px;
    }
    .guide_content {
      margin-bottom: 50px;
    }
  }
`;

const AuthenticationEmail = () => {
  return (
    <StyledAuthenticationEmail>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={""}
        footer={
          <Button className={"form_btn"} type={"submit"} disabled={true} success>
            Confirm
          </Button>
        }
      >
        <Button className="disable_btn" danger>
          Disable two-step security
        </Button>
        <Row className={"row"}>
          <Col xs={4}>
            <Title medium fs={16} lHeight={24} className="guide_title">
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
            <Title>Email</Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type="input" name="number" placeholder="Type here..." property={{ type: "email" }} />
          </Col>
        </Row>
        <Row className="row">
          <Col xs={4}>
            <Title>Password</Title>
          </Col>
          <Col xs={4}>
            <Field
              hideLabel
              type={"input"}
              name={"Repeat password"}
              property={{
                placeholder: "Enter password",
                type: "password",
              }}
              params={{ required: true }}
            />
          </Col>
        </Row>
      </FormDemo>
    </StyledAuthenticationEmail>
  );
};

export default AuthenticationEmail;
