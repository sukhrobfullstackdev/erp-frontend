import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import { isEqual, get } from "lodash";
import Icon from "../icon";

const SortStyled = styled.span`
  position: relative;

  .sortContainer {
    border-radius: 50%;
    position: relative;
    text-align: center;
    width: 18px;
    height: 18px;
    background: #a7adbf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .upIcon {
      margin-bottom: 1px;
    }

    .ui__icon__wrapper {
      width: 8px !important;
      height: 6px !important;

      .icon {
        width: 100% !important;
        height: 100% !important;
        background-color: #777e91;
        -webkit-mask-size: 100%;
        mask-size: 100%;
        /* &:hover {
            background-color: #F4F5F6;
        } */
      }

      &.up,
      &.down {
        transition: none;
        .icon {
          transition: none;
        }
        &.active {
          .icon {
            background-color: #f4f5f6;
          }
        }
      }

      &.up {
        transform: rotate(180deg);
      }

      &.down {
        height: 7px !important;
      }
    }
    &.active {
      width: 28px;
      height: 16px;
      background: #23262f;
      border-radius: 8px;
      flex-direction: inherit;
      font-weight: 500;
      font-size: 8px;
      line-height: 12px;
      color: #ffffff;
      z-index: 2;
      .downIcon {
        margin-left: 5px;
        .down {
          height: 5px !important;
          width: 7px !important;
        }
      }
    }
  }
  .unSort {
    width: 28px;
    height: 16px;
    background: #fcfcfd;
    border-radius: 8px;
    z-index: 1;
    position: absolute;
    top: 0;
    transition: 150ms;
    &:hover {
      background: #b1b5c4;
    }
    .exit {
      display: flex;
      justify-content: flex-end;
      .ui__icon__wrapper {
        width: 16px !important;
        height: 16px !important;
        margin-right: 0px !important;
        .icon {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }

  &:hover {
    .unSort {
      width: 42px;
    }
  }

  .icon icon-bottom {
  }
`;

const Sort = ({ sortFromView = () => {}, column = {}, number = 1, upClick = () => {}, downClick = () => {}, className = "" }) => {
  const handleClick = () => {
    sortFromView(column, true);
  };

  const removeSortingColumn = () => {
    sortFromView(column, false);
  };

  return (
    <SortStyled
      className={classNames("", {
        [className]: className,
        active: number > 0,
      })}
      data-tip={"Sort"}
      data-place={"top"}
      data-effect={"solid"}
      data-for={"foo"}
    >
      <div
        className={classNames("sortContainer", {
          active: number > 0,
        })}
      >
        {number > 0 && (
          <>
            {number}{" "}
            <Icon
              onClick={handleClick}
              icon="icon-bottom"
              size="sm"
              mainClassName="downIcon"
              className={classNames(
                "active",
                { up: isEqual(get(column, "direction"), 1) },
                { down: isEqual(get(column, "direction"), -1) }
              )}
            />
          </>
        )}

        <div onClick={handleClick}>
          {!(number > 0) && <Icon icon="icon-bottom" size="sm" mainClassName="upIcon" className={`up active`} color="#FCFCFD" />}
          {!(number > 0) && <Icon icon="icon-bottom" size="sm" mainClassName="downIcon" className={`down`} />}
        </div>
      </div>
      {number > 0 && (
        <div className="unSort">
          <Icon
            data-tip={"Clear sort"}
            data-place={"top"}
            data-effect={"solid"}
            data-for={"foo"}
            icon="icon-exit"
            size="sm"
            onClick={removeSortingColumn}
            mainClassName="exit"
            className={``}
          />
        </div>
      )}
    </SortStyled>
  );
};

export default Sort;
