import React from "react";
import styled from "styled-components";
import ForgotPhoneNumberContainer from "../containers/ForgotPhoneNumberContainer";

const ForgetStyled = styled.div`
  .number {
    width: 450px;
    display: flex;
    flex-direction: column;

    &__header {
      text-align: center;
      margin-bottom: 100px;
    }

    &__footer {
      margin-top: 40px;
    }

    .form-label {
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 12px;
    }

    .form-input {
      height: 54px;

      ::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #d7dce4;
      }
    }

    .flex {
      margin-top: 20px;
    }

    .back-button {
      button {
        width: 215px;
        height: 54px;
        display: flex;
        align-items: center;
        color: #353945;
        padding: 15px 0 15px 15px;
        .icon {
          background: #353945 !important;
        }
      }

      .left-arrow {
        margin-right: 49px;
      }
    }

    .next-button {
      button {
        width: 215px;
        height: 54px;
      }
    }
  }
`;

const ForgotPhoneNumberPage = (props) => {
  return (
    <ForgetStyled>
      <ForgotPhoneNumberContainer {...props} />
    </ForgetStyled>
  );
};

export default ForgotPhoneNumberPage;
