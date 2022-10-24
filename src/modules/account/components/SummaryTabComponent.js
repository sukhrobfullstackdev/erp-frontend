import React, { useState } from "react";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";

import UserImg from "../../../assets/images/staticWoman.png";
import UnknowUserImg from "../../../assets/images/unknow-user.png";
import Field from "../../../containers/Form/field";
import Icon from "../../../components/elements/icon";
import Title from "../../../components/elements/title";
import Button from "../../../components/elements/button";
import FormDemo from "../../../containers/Form/form-demo";

const SummaryTabStyle = styled.div`
  .row {
    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    span {
      color: #ef466f;
    }

    .form-input-container {
      width: 540px;
      border-radius: 8px;

      .form-input {
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        padding: 12px 14px;

        ::placeholder {
          font-weight: 300;
          font-size: 14px;
          color: rgba(177, 181, 195, 1);
        }
      }
    }
  }

  .upload-img_row {
    border-top: 1px solid #f4f5f6;
    border-bottom: 1px solid #f4f5f6;
    padding: 20px 0px;

    .title {
      margin-top: 15px;
    }

    .upload_div {
      display: flex;

      .user_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fcfcfd;
        border: 1px solid #f4f5f6;
        margin-right: 20px;
      }

      .dropzone {
        width: 470px;
        padding: 20px 0px;
        background: #fcfcfd;
        border: 1px solid #e6e8ec;
        border-radius: 8px;

        &_icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e2f5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-bottom: 10px;
        }

        span {
          color: #353945;
          opacity: 0.8;
          font-weight: 400;
        }
      }
    }
  }

  .select_div {
    width: 538px;
    display: flex;
    justify-content: space-between;

    .select {
      .select__header__content {
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        padding: 12px 14px;
        border-radius: 8px;
      }

      span {
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        color: #b1b5c4;
      }
    }

    .month {
      .select {
        width: 260px;
      }
    }

    .day {
      .select {
        width: 120px;
      }
    }

    .year {
      .select {
        width: 120px;
      }
    }
  }

  .gender_btn {
    width: 538px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active {
      button {
        background: #f2fdf6;
        border: 1px solid #e2f5e9;

        &:hover {
          background: #f2fdf6;
          border: 1px solid #e2f5e9;
        }
      }
    }

    button {
      width: 260px;
      color: #353945;
      line-height: 18px;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px 12px 14px;

      &:hover {
        background: #fcfcfd;
        color: #353945;
      }
    }
  }
`;

const SummaryTabComponent = ({ register, FormRequest }) => {
  const [gender, setGender] = useState();

  return (
    <SummaryTabStyle>
      <FormDemo
        mainClassName={"form_demo"}
        formRequest={FormRequest}
        footer={
          <Button disabled={true} className={"form_btn"} type={"submit"} success>
            Confirm
          </Button>
        }
      >
        <Row className={"upload-img_row"}>
          <Col xs={4}>
            <Title className={"title"} semiBold regular lHeight={24}>
              Upload image
            </Title>
          </Col>
          <Col xs={8}>
            <div className="upload_div">
              {register ? (
                <img className={"user_img"} src={UserImg} alt="img" />
              ) : (
                <img className={"user_img"} src={UnknowUserImg} alt="img" />
              )}
              <Field hideLabel className={"dropzone"} type={"dropzone"} name={"dropzone"}>
                <div className="dropzone_icon">
                  <Icon icon={"icon-upload"} color={"success"} size={"xmd"} />
                </div>
                <Title medium xs lHeight={18}>
                  Click to upload{" "}
                  <span>
                    or drag and drop <br /> PNG, JPG (max 400x400px)
                  </span>
                </Title>
              </Field>
            </div>
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Name <span>*</span>
            </Title>
          </Col>
          <Col xs={8}>
            <Field hideLabel type={"input"} name={"name"} placeholder={"Enter name..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Surname <span>*</span>
            </Title>
          </Col>
          <Col xs={8}>
            <Field hideLabel type={"input"} name={"surname"} placeholder={"Enter name..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>Parents name</Title>
          </Col>
          <Col xs={8}>
            <Field hideLabel type={"input"} name={"parsentname"} placeholder={"Type here..."} />
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Date of Birth <span>*</span>
            </Title>
          </Col>
          <Col xs={8}>
            <div className="select_div">
              <Field
                className={"month"}
                type={"custom-select"}
                name={"month-select"}
                placeholder={"Month..."}
                hideLabel
                options={[
                  { value: "1", label: "April" },
                  { value: "2", label: "Mart" },
                ]}
              />
              <Field
                className={"day"}
                type={"custom-select"}
                name={"day-select"}
                placeholder={"Day..."}
                hideLabel
                options={[
                  { value: "1", label: "12" },
                  { value: "2", label: "7" },
                ]}
              />
              <Field
                className={"year"}
                type={"custom-select"}
                name={"year-select"}
                placeholder={"Year..."}
                hideLabel
                options={[
                  { value: "1", label: "1995" },
                  { value: "2", label: "2002" },
                ]}
              />
            </div>
          </Col>
        </Row>
        <Row className={"row"}>
          <Col xs={4}>
            <Title>
              Gender <span>*</span>
            </Title>
          </Col>
          <Col xs={8}>
            <div className="gender_btn">
              <Button onCLick={() => setGender("male")} className={gender == "male" && "active"} medium sm>
                Male
                <Icon icon={"icon icon-check3"} color={gender == "male" ? "success" : "#B1B5C4"} size={"sm"} />
              </Button>
              <Button onCLick={() => setGender("female")} className={gender == "female" && "active"} medium sm>
                Female
                <Icon icon={"icon icon-check3"} color={gender == "female" ? "success" : "#B1B5C4"} size={"sm"} />
              </Button>
            </div>
          </Col>
        </Row>
      </FormDemo>
    </SummaryTabStyle>
  );
};

export default SummaryTabComponent;
