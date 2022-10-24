import Container from "../../../containers/branch/district/DistrictContainer";
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
      margin-bottom: 20px;
      border-radius: 6px;
      height: 38px;
    }
    .form-input {
      height: 38px;
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
  .select__header__content {
    height: 38px;
    font-size: 12px;
    font-weight: 500;
  }
  .form-input {
    font-size: 12px !important;
    font-weight: 500;
  }
`;

const Country = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "District");
  }, []);

  return (
    <Style>
      <Container {...rest} />
    </Style>
  );
};
export default Country;
