import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SignUpContainer from "../containers/SignUpContainer";

const SignUpPageStyled = styled.div`
  .backButton {
    .left-arrow {
      position: absolute;
      left: 25px;
    }
  }
  label {
    margin-bottom: 10px;
  }
  .input-container {
    margin-bottom: 30px;
    &.last {
      margin-bottom: 20px;
    }
  }
`;

const SignUpPage = ({ ...rest }) => {
  const { phone } = useParams();
  return (
    <SignUpPageStyled>
      <SignUpContainer phone={atob(phone)} {...rest} />
    </SignUpPageStyled>
  );
};

export default SignUpPage;
