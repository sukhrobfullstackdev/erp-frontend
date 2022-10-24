import React, { memo } from "react";
import styled from "styled-components";
import TwoStepAuthenticationContainer from "../containers/TwoStepAuthenticationContainer";

const TwoStepAuthenticationStyled = styled.div`
  .backButton {
    .left-arrow {
      position: absolute;
      left: 25px;
    }
  }
  label {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 80px;
  }
  .input-container {
    margin-bottom: 30px;
    &.last {
      margin-bottom: 20px;
    }
  }
`;

const TwoStepAuthenticationPage = ({ ...rest }) => {
  return (
    <TwoStepAuthenticationStyled>
      <TwoStepAuthenticationContainer {...rest} />
    </TwoStepAuthenticationStyled>
  );
};

export default memo(TwoStepAuthenticationPage);
