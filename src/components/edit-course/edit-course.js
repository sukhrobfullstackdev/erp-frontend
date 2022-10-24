import React, { useState } from "react";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import Field from "../../containers/Form/field";
import FormDemo from "../../containers/Form/form-demo";
import Button from "../elements/button/button";
import Icon from "../elements/icon";
import Input from "../elements/input/input";
import Label from "../elements/label/label";
import Textarea from "../elements/textarea/textarea";
import Title from "../elements/title/title";

const EditCourseStyle = styled.div`
  .card {
    padding: 15px 18px;
    width: 520px;
    background: #ffffff;
    border: 1px solid #e6e8ec;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    border-radius: 8px;
    &__input__form {
      display: flex;
      flex-direction: column;
      &__label {
        padding-bottom: 4px;
        padding-top: 10px;
      }
    }
    &__action {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      &__right,
      &__left {
        display: flex;
        align-items: center;
        .card__action__button:first-child {
          margin-right: 5px;
        }
      }
      &__button button {
        padding: 5px 10px;
        input {
          margin-right: 8.25px;
        }
      }
    }
  }
  .inputContainer {
    width: 100%;
  }
`;

const EditCourse = () => {
  return (
    <EditCourseStyle>
      <div className="card">
        <Title>Edit course</Title>
        <form className="card__input__form">
          <Row>
            <Col xs={12}>
              <Label xxs>Course name</Label>
              <Input type="text" color />
            </Col>
            <Col xs={12}>
              <Label xxs>Description</Label>
            </Col>
            <Col>
              <Textarea />
            </Col>
          </Row>
          <div className="card__action">
            <div className="card__action__left">
              <div className="card__action__button">
                <Button center disabled>
                  <FormDemo>
                    <Field type={"checkbox"} name={"checkbox"} label={""} />
                  </FormDemo>
                  Active
                </Button>
              </div>
              <Icon icon="icon-question" />
            </div>
            <div className="card__action__right">
              <div className="card__action__button">
                <Button outlineDanger center>
                  Cancel
                </Button>
              </div>
              <div className="card__action__button">
                <Button center success>
                  Add Column
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </EditCourseStyle>
  );
};
export default EditCourse;
