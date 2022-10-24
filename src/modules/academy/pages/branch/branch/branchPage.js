import Container from "../../../containers/branch/branch/BranchContainer";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTab } from "utils";

const Style = styled.div`
  .modal__body {
    min-width: 620px;
    .title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .form-label {
      font-size: 10px;
      font-weight: 600;
      color: #a7adbf;
      margin-bottom: 6px;
    }
    .form-input-container {
      border-radius: 6px;
      height: 38px;
    }
    .form-input {
      height: 38px;
      font-size: 12px;
      font-weight: 500;
      color: #353945;
    }
    .cancelBtn,
    .addBtn {
      button {
        font-size: 12px;
        font-weight: 500;
        min-width: 63px;
        line-height: 18px;
        border-radius: 6px;
        margin-top: 10px;
      }
    }
    .cancelBtn {
      margin-right: 10px;
    }
    .checkbox-with-button {
      button {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        margin-right: 10px;
        border-radius: 6px;
        margin-top: 10px;
        .rc-checkbox {
          margin-right: 10px;
        }
        .ui__icon__wrapper {
          width: 14px;
          height: 14px;
          margin-left: 10px;
          .icon-question {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
  .statusBtn {
    button {
      text-transform: uppercase;
      font-size: 10px !important;
      line-height: 15px;
      padding: 4px 12px 3px !important;
    }
  }
`;

const Country = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Branch");
  }, []);

  return (
    <Style>
      <Container {...rest} />
    </Style>
  );
};
export default Country;
