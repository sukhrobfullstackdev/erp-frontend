import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import Title from "../../../../components/elements/title";
import Field from "../../../../containers/Form/field";
import FormDemo from "../../../../containers/Form/form-demo";
import Button from "../../../../components/elements/button";

const StyledPhoneNumber = styled.div`
  padding: 30px 0;
  .phone_number-row {
    padding: 25px 0;
    border-top: 1px solid #f4f5f6;
    h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const PhoneNumber = () => {
  return (
    <StyledPhoneNumber>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={""}
        footer={
          <Button className={"form_btn"} type={"submit"} success>
            Confirm
          </Button>
        }
      >
        <Row className="row phone_number-row">
          <Col xs={4}>
            <Title>1. Phone number</Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type="input" name="number" placeholder="Enter number" />
          </Col>
        </Row>
      </FormDemo>
    </StyledPhoneNumber>
  );
};

export default PhoneNumber;
