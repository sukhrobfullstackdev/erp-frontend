import React, { memo } from "react";
import styled, { css } from "styled-components";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { get, isArray } from "lodash";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import classNames from "classnames";

const Style = styled.div`
  position: relative;
  display: inline-block;

  ${({ sizeAuto }) =>
    sizeAuto &&
    css`
      height: auto;
      width: auto;
    `}
  .dropDown {
    &__button {
      cursor: pointer;
    }
    &__body {
      /* min-width: 0px;
      width: 0; */
      /* height: 0; */
      will-change: transform;
      background: #ffffff;
      box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.3);
      border-radius: 8px;
      position: absolute;
      top: 30px;
      right: 0;
      transition: 0.1s;
      overflow: hidden;
      z-index: 10 !important;
      display: inline-block;
      opacity: 0;
      transform: translateX(0px) scale(0) translateZ(0px);
      &__option {
        /* padding: 6px 15px; */
      }
    }
  }
  &.dropDown {
    &.active {
      .rs-anim-bounce-in,
      .rs-anim-bounce-out {
        z-index: 2;
      }
      .dropDown__body {
        /* min-width: 140px; */
        /* &__option {
          height: 100%;
        } */
      }
    }
  }

  ${({ isFixed, x, y }) =>
    isFixed &&
    x &&
    y &&
    css`
      .dropDown {
        &__body {
          position: fixed;
          top: ${y}px;
          left: ${x}px;
          //width: 200px;
          min-width: 100px;
          transition: none;
        }
      }
    `}

  .dropdown__top {
    max-height: 70vh;
    overflow: auto;
  }
`;

const GlobalDropDown = ({
  dataDropDown: {
    show = false,
    onChange,
    onClose,
    sizeAuto,
    setShow = () => {},
    className,
    isFixed,
    lastPosition,
    fixedConfig,
    yLocalAdditional,
    options,
    children,
  },
  setTemp = () => {},
}) => {
  return (
    <Style
      className={classNames("dropDown", {
        active: show,
        [className]: className,
        isFixed: isFixed,
      })}
      {...{
        sizeAuto,
        x: isFixed ? get(lastPosition, "x", 0) + get(fixedConfig, "xAdditional", 0) : null,
        y: isFixed ? get(lastPosition, "y", 0) - yLocalAdditional : null,
        isFixed,
      }}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          show && onClose();
          show && onChange(!show);
          setShow(false);
        }}
      >
        <motion.div
          animate={{
            x: 0,
            scale: show ? 1 : 0,
            opacity: show ? 1 : 0,
            transitionEnd: {
              // display: "none",
            },
          }}
          transition={{ type: "spring", duration: 0.2 }}
          style={{ display: "inline-block" }}
          className="dropDown__body"
        >
          {isArray(options) &&
            options.map((val, ind) => (
              <div key={ind + Math.floor(Math.random() * 99999999999)} className="dropDown__body__option" onClick={() => {}}>
                {val}
              </div>
            ))}
          {children}
        </motion.div>
      </OutsideClickHandler>
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    dataDropDown: get(state, "api.dropdownGlobalData", {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTemp: ({ data, storeName = "dropdownGlobalData" }) => {
      dispatch({
        type: ApiActions.TEMP_DATA.REQUEST,
        payload: {
          item: data,
          storeName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GlobalDropDown));
