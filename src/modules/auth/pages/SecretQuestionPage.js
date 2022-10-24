import React from "react";
import styled from "styled-components";
import SecretQuestionContainer from "../containers/SecretQuestionContainer";

const StyledSecretQuestionPage = styled.div``;

const SecretQuestionPage = (props) => {
  return (
    <StyledSecretQuestionPage>
      <SecretQuestionContainer {...props} />
    </StyledSecretQuestionPage>
  );
};

export default SecretQuestionPage;
