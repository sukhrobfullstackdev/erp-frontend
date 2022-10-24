import React from "react";
import styled from "styled-components";
import Button from "../button";
import Flex from "../flex";

// import googleImg from "../../../assets/icons/Google.svg";
// import linkedinImg from "../../../assets/icons/Linkind.svg";
// import githubImg from "../../../assets/icons/Github.svg";
// import telegramImg from "../../../assets/icons/Telegram.svg";

const LoginWithStyled = styled.div`
  max-width: 400px;
  border-top: 1px solid #e6e8ec;
  margin-top: 30px;
  position: relative;
  .label {
    display: flex;
    justify-content: center;
    span {
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #353945;
      background: #fff;
      display: inline-block;
      padding: 5px 20px;
      margin-top: -17px;
      position: absolute;
    }
  }
  .buttonContainer {
    margin-top: 30px;
    &:last-child {
      margin-top: 20px;
    }
    a,
    button {
      text-decoration: none;
      border: 1px solid #f4f5f6;
      img {
        margin-right: 26px;
      }
      width: 190px;
      height: 50px;
      &:hover {
        color: #353945;
      }
    }
    span {
      padding: 13px 0;
    }
  }
  @media (max-width: 550px) {
    max-width: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    .buttonContainer {
      width: 100%;
      justify-content: space-around;
    }
  }
  @media (max-width: 426px) {
    .buttonContainer {
      a,
      button {
        width: 160px;
        height: 45px;
      }
    }
  }
  @media (max-width: 370px) {
    .buttonContainer {
      a,
      button {
        width: 145px;
        img {
          margin-right: 15px;
        }
      }
    }
  }
`;

export default function LoginWith({ ...props }) {
  return (
    <LoginWithStyled {...props}>
      <div className="label">
        <span>or log in with</span>
      </div>
      <Flex justify={"space-between"} className="buttonContainer">
        <Button lightButton lightSmBorder link="https://google.com" target="_blank" center>
          <img src={"/icons/Google.png"} alt="google" />
          <span>Google</span>
        </Button>
        <Button lightButton lightSmBorder link="https://google.com" target="_blank" center>
          <img src={"/icons/Linkind.png"} alt="linkedin" />
          <span>LinkedIn</span>
        </Button>
      </Flex>
      <Flex justify={"space-between"} className="buttonContainer">
        <Button lightButton lightSmBorder link="https://github.com/aslamjon" target="_blank" center>
          <img src={"/icons/Github.png"} alt="github" />
          <span>Github</span>
        </Button>
        <Button lightButton lightSmBorder link="https://t.me/I_am_Anonim" target="_blank" center>
          <img src={"/icons/Telegram.png"} alt="telegram" />
          <span>Telegram</span>
        </Button>
      </Flex>
    </LoginWithStyled>
  );
}
