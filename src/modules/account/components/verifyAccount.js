import React, { useState } from "react";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import Title from "../../../components/elements/title";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Icon from "../../../components/elements/icon";
import { isNull } from "lodash";

const StyledVerifyAccount = styled.div`
  .row {
    padding: 25px 0;
    border-bottom: 1px solid #f4f5f6;
    display: flex !important;
    align-items: center !important;

    h2 {
      font-weight: 500;
      line-height: 24px;
      font-size: 16px;

      span {
        color: #ef466f;
      }
    }

    .form-input-container {
      border-radius: 8px;

      .form-input {
        padding: 12px 14px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
      }
    }

    .select__header__content {
      padding: 12px 14px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;

      .select__header__content__placeholder {
        color: #b1b5c3;
      }
    }

    .datepicker__input {
      height: 44px;
      padding: 12px 14px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
    }

    .warning {
      margin-top: 32px;
      display: flex;
      align-items: center;
      padding: 14px;
      background: #fffbf0;
      border: 1px solid #fbe2a1;
      border-radius: 6px;
      color: #eca51d;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      .ui__icon__wrapper {
        margin-right: 8px;
        width: 32px;
        height: 28px;
        .icon-warning2 {
          width: 28px;
          height: 28px;
        }
      }
    }

    .dropzone_container {
      display: flex;
      align-items: flex-end;
      background: #fcfcfd;
      border: 1px solid #e6e8ec;
      border-radius: 8px;
      padding: 4px;
      min-height: 120px;

      .dzu-dropzone {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        padding: 12px;
        border-right: 1px solid #e6e8ec;
        cursor: pointer;
        align-items: flex-start;

        .main__upload__label {
          cursor: pointer;
        }

        .ui__icon__wrapper {
          background-color: #e2f5e9;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-bottom: 16px;

          .icon-add-photo {
            width: 20px;
            height: 20px;
          }
        }

        h2 {
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
        }

        span {
          color: #777e90;
        }
      }

      .img_part {
        width: 50% !important;
        min-width: 265px;
        padding: 12px;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #777e90;

        img {
          max-width: 240px;
          max-height: 90px;
        }
      }
    }
  }
`;

const VerifyAccount = () => {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  return (
    <StyledVerifyAccount>
      <FormDemo>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              First name <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"first name"} placeholder={"Enter name..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Last name <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"last name"} placeholder={"Enter name..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>Middle name</Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"middle name"} placeholder={"Enter name..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Address <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"address"} placeholder={"Enter address..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Country <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field className={"month"} type={"custom-select"} name={"country-select"} placeholder={"Select country"} hideLabel />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Passport seria <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"passport seria"} placeholder={"Enter number..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Passport number <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"passport number"} placeholder={"Enter number..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Passport given date <span>*</span>
            </Title>
          </Col>
          <Col xs={2}>
            <Field hideLabel type={"custom-datepicker"} name={"passport given date"} placeholder={"Select date"} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Passport over date <span>*</span>
            </Title>
          </Col>
          <Col xs={2}>
            <Field hideLabel type={"custom-datepicker"} name={"passport over date"} placeholder={"Select date"} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              PINFL <span>*</span>
            </Title>
          </Col>
          <Col xs={4}>
            <Field hideLabel type={"input"} name={"PINFL"} placeholder={"Enter number..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={3}>
            <Title>Upload image</Title>
            <div className="warning">
              <Icon icon="icon-warning2" color="#ECA51D" />
              Home page of the document.
              <br />
              Fill out the document and take a photo without lighting
            </div>
          </Col>
          <Col xs={1} />
          <Col xs={4}>
            <div className="dropzone_container">
              <Field
                hideLabel
                type={"dropzone"}
                name={"Upload image 1"}
                AfterUploadViewChild={() => (
                  <>
                    <Icon icon="icon-add-photo" color="#45B26B" />
                    <Title>
                      Click to upload
                      <span> or drag and drop PNG, JPG (max 400x400px)</span>
                    </Title>
                  </>
                )}
                onChange={(e) => setImg1(e)}
              >
                <Icon icon="icon-add-photo" color="#45B26B" />
                Click to upload <span>or drag and drop PNG, JPG (max 400x400px)</span>
              </Field>
              <div className="img_part">
                {!isNull(img1) ? <img src={!isNull(img1) ? URL.createObjectURL(img1) : ""} /> : "Not founded"}
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={3}>
            <Title>Upload image</Title>
            <div className="warning">
              <Icon icon="icon-warning2" color="#ECA51D" />
              Registration page. Also, take a photo without lighting after you have fully uploaded the document
            </div>
          </Col>
          <Col xs={1} />
          <Col xs={4}>
            <div className="dropzone_container">
              <Field
                hideLabel
                type={"dropzone"}
                name={"Upload image 2"}
                AfterUploadViewChild={() => (
                  <>
                    <Icon icon="icon-add-photo" color="#45B26B" />
                    <Title>
                      Click to upload
                      <span> or drag and drop PNG, JPG (max 400x400px)</span>
                    </Title>
                  </>
                )}
                onChange={(e) => setImg2(e)}
              >
                <Icon icon="icon-add-photo" color="#45B26B" />
                Click to upload <span>or drag and drop PNG, JPG (max 400x400px)</span>
              </Field>
              <div className="img_part">
                {!isNull(img2) ? <img src={!isNull(img2) ? URL.createObjectURL(img2) : ""} /> : "Not founded"}
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={3}>
            <Title>Upload image</Title>
            <div className="warning">
              <Icon icon="icon-warning2" color="#ECA51D" />
              Take a photo with the document on the front camera
            </div>
          </Col>
          <Col xs={1} />
          <Col xs={4}>
            <div className="dropzone_container">
              <Field
                hideLabel
                type={"dropzone"}
                name={"Upload image 3"}
                AfterUploadViewChild={() => (
                  <>
                    <Icon icon="icon-add-photo" color="#45B26B" />
                    <Title>
                      Click to upload
                      <span> or drag and drop PNG, JPG (max 400x400px)</span>
                    </Title>
                  </>
                )}
                onChange={(e) => setImg3(e)}
              >
                <Icon icon="icon-add-photo" color="#45B26B" />
                Click to upload <span>or drag and drop PNG, JPG (max 400x400px)</span>
              </Field>
              <div className="img_part">
                {!isNull(img3) ? <img src={!isNull(img3) ? URL.createObjectURL(img3) : ""} /> : "Not founded"}
              </div>
            </div>
          </Col>
        </Row>
      </FormDemo>
    </StyledVerifyAccount>
  );
};

export default VerifyAccount;
