import CountryContainer from "../../../containers/branch/country/CountryContainer";
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
  }
  .statusBtn {
    button {
      text-transform: uppercase;
      font-size: 10px !important;
      line-height: 15px;
      padding: 4px 12px 3px !important;
    }
  }

  .form-checkbox-controler {
    .checkbox-with-button {
      button {
        display: flex;
        align-items: center;
        height: 30px;
        border-radius: 6px;
        margin: 10px 10px 0 0;
        font-size: 12px;
        font-weight: 500;
        .rc-checkbox {
          margin-right: 10px;
        }
        .questionIcon {
          margin-left: 5px;
          &.md {
            .icon {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
  }
`;

const Country = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Country");
  }, []);

  return (
    <Style>
      <CountryContainer {...rest} />
    </Style>
  );
};
export default Country;
