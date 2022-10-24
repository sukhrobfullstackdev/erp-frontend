import ListContainer from "modules/sales/containers/specialization-discount/ListContainer";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { checkTab } from "utils";

const Styled = styled.div`
  .form-label {
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #a7adbf;
  }
  .modal__body {
    width: 620px;
  }
  .form-input-container {
    height: 38px;
    border-radius: 6px;
    .form-input {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .rowFlex {
    width: 610px;
  }
  .inputSelect {
    position: relative;
    width: 270px;
    height: 38px;
    background-color: #fcfcfd;
    border: 1px solid #e6e6e6;
    margin-top: 24px;
    border-radius: 6px;
    display: grid;
    grid-template-columns: 75% 10%;
    /* align-items: center; */
  }
  .plusBtn button {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    display: grid;
    place-items: center center;
    padding: 0;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .stick {
    width: 1px;
    height: 21px;
    background-color: #e6e8ec;
    position: absolute;
    top: 8px;
    right: 35px;
  }
  .customInput {
    margin-top: -25px;
    div {
      width: 60%;
      background: transparent !important;
      border: 0 !important;
    }
  }

  .customSelect {
    .select__header__content__text {
      display: flex;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #b1b5c4;
    }
  }

  .customSelectCol {
    div {
      margin-top: 0;
      border-color: transparent !important;
    }
    .select {
      min-width: 30px !important;
    }

    .select__header__content {
      width: 100px;
      left: -86px;
    }

    .select__body {
      width: 242px;
      min-height: 92px;
      height: 92px;
      left: -210px;
      top: 38px;
    }
  }
  .ui__icon__wrapper.md {
    width: 22px;
    height: 20px;
  }

  .ui__icon__wrapper.md .icon {
    width: 12px;
    height: 15px;
  }
`;

function ListPage({ location: { pathname }, ...rest }) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "SALES Specialization Discount  page");
  }, []);
  return (
    <Styled>
      <ListContainer {...rest} />
    </Styled>
  );
}

export default withRouter(memo(ListPage));
