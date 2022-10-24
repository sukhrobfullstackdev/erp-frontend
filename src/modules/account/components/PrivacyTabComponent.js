import React from "react";
import styled from "styled-components";
import Tabs from "../../../components/tabs";
import Authentication from "./privacy/Authentication";
import AuthenticationEmail from "./privacy/AuthenticationEmail";
import Password from "./privacy/Password";
import PhoneNumber from "./privacy/PhoneNumber";
import Question from "./privacy/Question";

const PrivacyStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f4f5f6;
  padding-top: 10px;

  .tabs__list {
    &__tab {
      font-weight: 500;
      color: #777e91;
      height: 32px;

      :nth-child(4) {
        padding: ${({ register }) => (register ? "8px 15px" : "0px")};
      }
    }

    .active {
      background-color: #45b26b;
      color: #fcfcfd;
      font-weight: 400;
    }
  }

  .tabs {
    width: 100%;

    &__content {
      .form-input-container {
        border-radius: 8px;

        .form-input {
          font-size: 12px;
          font-weight: 500;
          padding: 12px 14px;

          ::placeholder {
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .caution_massage {
        background-color: #fffbf0;
        border: 1px solid #fbe2a1;
        color: #eca51d;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 20px 25px !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;

        .ui__icon__wrapper {
          margin-right: 20px;
          height: 30px;
          width: 30px;

          .icon-warning2 {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
`;

const PrivacyTabComponent = ({ register, operationAdd, operationUpdate }) => {
  return (
    <PrivacyStyled register={register}>
      <Tabs
        leftList={[
          "Password",
          "Telephone number",
          "Two-factor authentication",
          register && "Two-factor authentication email",
          "Secret questions",
        ]}
        rightList={[]}
        leftContent={[
          <Password operationUpdate={operationUpdate} />,
          <PhoneNumber />,
          <Authentication operationAdd={operationAdd} operationUpdate={operationUpdate} />,
          register && <AuthenticationEmail />,
          <Question operationAdd={operationAdd} />,
        ]}
      />
    </PrivacyStyled>
  );
};

export default PrivacyTabComponent;
