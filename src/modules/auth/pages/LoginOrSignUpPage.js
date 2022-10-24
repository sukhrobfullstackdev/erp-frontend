import React, { useState } from "react";
import styled from "styled-components";
import LoginOrSignUpContainer from "../containers/LoginOrSignUpContainer";

const LoginOrSignUpPageStyled = styled.div`
  .backButton {
    .left-arrow {
      position: absolute;
      left: 25px;
    }
  }
  .auth-select__input {
    margin-bottom: 0px;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    height: 54px;
    &:hover {
      border: 1px solid rgba(220, 222, 226, 1);
    }
    border: 1px solid ${({ isFocused }) => (isFocused ? "#45b36b" : "#E6E8EC")};
  }

  .auth-select__input__dropdown {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .flag {
    border-radius: 2px;
    width: 20px;
    height: 14px;
  }
  .masked-input {
    /* margin: auto; */
    /* width: auto; */
    border: none;
    margin-left: -7px;
    /* padding: 10px; */
    /* &.error, .auth-select__input {
      border: 1px solid #EF466F;
    } */
  }
  .form-error-message {
    position: absolute;
    top: 30px;
    left: -85px;
    padding: 2px 0;
  }
  label {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 80px;
  }
  .forgot-password {
    color: #ef466f;
    font-size: 14px;
    line-height: 21px;
    display: inline-block;
    margin-bottom: 30px;
    margin-top: 30px;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .loginWidthComponent {
    margin-top: 40px;
    .label {
      margin-bottom: 40px;
    }
  }

  .select {
    &__header {
      width: 87px;
      height: 42px;
      background: #f4f5f6;
      border-radius: 8px;
      margin-left: 6px;
      &__content {
        .flag {
          width: 31px;
          height: 22px;
        }
      }
    }
    &__body {
      min-width: 240px;
      &__options {
        &__option {
          background: #fcfcfd;
          border-radius: 5px;
          padding-right: 10px;
          .content {
            .flag {
              margin-right: 10px;
            }
            span {
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  @media (max-width: 550px) {
    h2 {
      margin-top: 20px;
      margin-bottom: 60px;
      line-height: 34px;
      font-size: 26px;
    }
    label {
      margin-bottom: 8px;
      font-size: 13px;
    }
  }
  @media (max-width: 450px) {
    .auth-select__input {
      height: 50px;

      .select__header {
        height: 30px;
      }
      .prefix {
        height: 50px;
        .masked-input {
          height: 46px;
        }
      }
    }
  }
`;

const LoginOrSignUpPage = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <LoginOrSignUpPageStyled {...{ isFocused, ...props }}>
      <LoginOrSignUpContainer {...{ setIsFocused, ...props }} />
    </LoginOrSignUpPageStyled>
  );
};

export default LoginOrSignUpPage;
