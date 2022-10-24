import React from "react";
import VerificationMethodsContainer from "../containers/VerificationMethodsContainer";
import styled from "styled-components";

const Style = styled.div`
  @media (max-width: 550px) {
    .entering_part {
      width: auto;

      .form-checkbox-controler {
        min-width: auto;
      }
    }
    .button_part {
      justify-content: space-around;
      button {
        width: 180px;
        height: 50px;
        &:first-child {
          margin-right: 0;
        }
        .ui__icon__wrapper {
          margin-right: 27px;
        }
      }
    }
  }
  @media (max-width: 420px) {
    .entering_part {
      .form-checkbox-controler {
        button {
          font-size: 16px;
          height: 50px;
        }
      }
    }
    .button_part {
      button {
        width: 150px;
        height: 50px;
      }
    }
    .rc-checkbox {
      height: 20px;
    }
  }
`;
const VerificationMethodsPage = ({ ...rest }) => {
  return (
    <Style>
      <VerificationMethodsContainer {...rest} />
    </Style>
  );
};

export default VerificationMethodsPage;
