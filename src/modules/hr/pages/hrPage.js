import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import HrContainer from "../containers/hrContainer";

const HrStyled = styled.div`
  /* padding: 0 40px 0 36px; */
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  .box {
    display: flex;
    flex-direction: column;

    form {
      width: 311px;
    }

    label {
      padding-left: 0;
    }

    .dateInputContainer {
      width: 311px;
      height: 50px;
      /* border: 1px solid #E6E8EC; */
      border-radius: 10px;
    }

    &.box-center {
      width: 100%;
    }

    &.box-end {
      .form-input-container {
        width: 311px;
      }
    }

    .boxInside {
      padding: 0 27px 0 40px;

      form {
        label {
          width: 100%;
        }
      }
    }

    .select-privilliges {
      padding-left: 40px;
      padding-right: 27px;
      position: relative;
      width: 100%;

      .Select__controller {
        /* position: absolute;
        top: 0;
        left: 0; */
        width: 100%;
      }

      .form-body-select,
      label {
        width: 100%;
      }
    }
  }
  .boxInsideFlex {
    width: 100%;
    .boxInsideBox {
      margin-right: 27px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  .box-end {
    label {
      width: 100%;
    }
  }
  .infoContainer {
    display: flex;
    justify-content: space-between;
  }
  .firstCollapse,
  .secondCollapse,
  .thirdCollapse,
  .fourthCollapse,
  .fifthCollapse,
  .sixthCollapse,
  .seventhCollapse {
    position: relative;
    margin: 0 0px 10px 0px;
    border-radius: 10px;
    .collapse__title {
      font-size: 16px;
      line-height: 24px;
      color: #23262f;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      box-sizing: border-box;
      border-radius: 10px;
      &:hover {
        background: rgba(242, 242, 243, 1);
        border: 1px solid #e6e8ec;
      }
    }
    &.active {
      border-radius: 10px;
      .collapse__title {
        border-radius: 10px 10px 2px 2px;
        background: #353945;
        color: #fcfcfd;
        &__bottom-arrow {
          .icon {
            background-color: #fcfcfd;
          }
        }
      }
      .collapse__body {
        border: 1px solid #e6e8ec;
        border-radius: 0 0 10px 10px;
        border-top: none;
        overflow: unset;
      }
    }
    .form-input {
      font-weight: 500;
      color: #777e91;
    }
    .form-select-container {
      .select {
        &__header {
          height: 50px;
          &__content {
            color: #777e91;
            font-weight: 500;
          }
        }
      }
    }
    .form-label,
    .form-select-label {
      margin-bottom: 14px;
    }
  }
  .add-doc-container {
    position: absolute;
    left: 47%;
    bottom: -20px;
    padding: 9px;
    background: #45b36b;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }
  .sixthCollapse {
    .inputContainer {
      width: 100%;
    }
    .skills {
      width: 60%;
      .box {
        display: inline-block;
        width: ${() => window.innerWidth / 6}px;
      }
    }
    .clearBtn {
      position: absolute;
      bottom: 12px;
      right: 12px;
      min-width: 70px;
      height: 28px;
      font-size: 12px;
      line-height: 18px;
    }
    .selectContainer {
      width: 100%;
    }
  }
  .radioInput {
    padding-left: 12px !important;
  }
  .submitBtn {
    width: 100%;
    height: 70px;
    background: #f4f5f6;
    bottom: 0;
    left: 0px;
    position: fixed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    button {
      height: 40px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      padding: 0 16px;
    }
  }

  @media (min-width: 1450px) {
    .firstCollapse,
    .secondCollapse,
    .thirdCollapse,
    .fourthCollapse,
    .fifthCollapse,
    .sixthCollapse {
      &.active {
        .collapse__body {
          padding: 40px 40px 40px 40px;
        }
      }
    }
  }
  @media (max-width: 1449px) {
    .firstCollapse,
    .secondCollapse,
    .thirdCollapse,
    .fourthCollapse,
    .fifthCollapse {
      .selectContainer,
      .dateInputContainer,
      .inputContainer {
        width: auto;
      }
    }

    .box {
      width: 100%;
    }

    .firstCollapse {
      .box {
        width: 30%;
      }
    }
  }
`;

const HrPage = ({ location: { pathname }, ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "employee one page");
  }, []);
  return (
    <HrStyled>
      <HrContainer {...props} />
    </HrStyled>
  );
};
export default memo(HrPage);
