import React, { useState } from "react";
import styled, { css } from "styled-components";
import { findIndex, get, isArray, isEqual, isNil } from "lodash";
import ReactTooltip from "react-tooltip";
import { Link, useHistory } from "react-router-dom";
import Icon from "../elements/icon";
import classNames from "classnames";
import { connect } from "react-redux";
import Actions from "../../modules/settings/actions";
import activeBg from "../../assets/images/union-bg.png";
import { getWordFromString, cropText } from "../../utils/index";
import Title from "../elements/title";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";

const StyledBreadcrumb = styled.div`
  display: flex;

  .breadcrumb {
    display: inline-flex;
    margin-bottom: 0;

    a {
      text-decoration: none;
    }

    &__item {
      list-style: none;
      display: flex;
      width: 235px;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      background-color: #eff1f3;
      padding-left: 16px;
      padding-right: 28px;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;

      ::before {
        content: "";
        width: 1px;
        height: 16px;
        position: absolute;
        left: 0;
        background-color: #b1b5c3;
      }

      .a {
        color: #353945;
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        width: 93%;
        height: 100%;
        padding-left: 14px;
        padding-top: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .xBtn {
        position: absolute;
        right: 18px;
      }

      &.active {
        border-radius: 20px 20px 0 0;
        background-image: url(${activeBg});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: left bottom;
        background-clip: border-box;
        padding-left: 12px;
        //padding-right: 20px;
        padding-right: 38px;

        ::before {
          display: none;
        }

        & + li::before {
          display: none;
        }

        .a {
          font-weight: 500;
        }
      }
    }

    .context_menu {
      :first-child {
        .breadcrumb__item {
          ::before {
            display: none;
          }
        }
      }
    }
  }

  .short-width {
    min-width: 50px !important;

    .a {
      margin-right: 15px;
    }
  }

  .react__contextmenu {
    list-style: none;
    position: fixed;
    display: none;
    min-width: 320px;
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-shadow: 0px 24px 24px -20px rgba(15, 15, 15, 0.15);
    border-radius: 4px;
    padding: 9px 6px;
    z-index: 99999;

    &__item {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      padding: 5px 8px;
      transition: 0.5s ease;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background: #f4f5f6;
      }
    }

    ${({ position }) =>
      position &&
      css`
        display: block;
        top: ${position.top}px;
        left: ${position.left}px;
      `}
  }

  ${({ items }) =>
    items.length >= 7 &&
    items.length <= 10 &&
    css`
      .breadcrumb {
        &__item {
          width: 164px;

          &.active {
            padding-left: 10px;
            padding-right: 40px;
          }
        }
      }
    `}
  ${({ items }) =>
    items.length > 10 &&
    css`
      .breadcrumb {
        &__item {
          padding-left: 5px;
          padding-right: 32px;
          width: 118px !important;

          .a {
            margin-right: 9px;
          }

          &.active {
            padding-left: 5px;
            //padding-right: 37px;
            padding-right: 28px;
          }
          .xBtn {
            right: 10px;
          }
        }
      }
    `} @keyframes leftAnim {
    0% {
      right: 0px;
      opacity: 0.8;
    }
    100% {
      right: 230px;
      opacity: 0;
    }
  }

  @media only screen and (max-width: 1915px) {
    .breadcrumb__item {
      width: 117px !important;
      padding-left: 0;
      .a{
        margin-right: 0px;
        padding-left: 15px;
        width: 100%;
      }
      .xBtn{
        right: 8px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 12px;
      }
      .xBtn{
        right: 12px !important;
      }
    }
    ${({ items }) =>
    items.length <= 7  && css`
      .breadcrumb {
        &__item {
          width: 234px !important;
          .a{
            padding-left: 13px;
          }
          .xBtn{
            right: 11px !important;
          }
        }
        .active {
          .a{
            padding-left: 10px;
          }
          .xBtn{
            right: 16px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 8 &&
    items.length <= 10 && css`
      .breadcrumb {
        &__item {
          width: 163px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}
  }

  @media only screen and (max-width: 1900px) {
    .breadcrumb__item {
      width: 110px !important;
      padding-left: 0;
      .a{
        margin-right: 0px;
        padding-left: 14px;
        width: 100%;
      }
      .xBtn{
        right: 7px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 11px;
      }
      .xBtn{
        right: 11px !important;
      }
    }
    ${({ items }) =>
    items.length <= 7  && css`
      .breadcrumb {
        &__item {
          width: 220px !important;
          .a{
            padding-left: 13px;
          }
          .xBtn{
            right: 11px !important;
          }
        }
        .active {
          .a{
            padding-left: 10px;
          }
          .xBtn{
            right: 16px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 8 &&
    items.length <= 10 && css`
      .breadcrumb {
        &__item {
          width: 154px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}
  }

  @media only screen and (max-width: 1800px) {
    .breadcrumb__item {
      width: 104px !important;
      padding-left: 0;
      .a{
        margin-right: 0px;
        padding-left: 14px;
        width: 100%;
      }
      .xBtn{
        right: 7px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 11px;
      }
      .xBtn{
        right: 11px !important;
      }
    }

    ${({ items }) =>
    items.length <= 7  && css`
      .breadcrumb {
        &__item {
          width: 208px !important;
          .a{
            padding-left: 13px;
          }
          .xBtn{
            right: 11px !important;
          }
        }
        .active {
          .a{
            padding-left: 10px;
          }
          .xBtn{
            right: 16px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 8 &&
    items.length <= 10 && css`
      .breadcrumb {
        &__item {
          width: 145px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}
  }

  @media only screen and (max-width: 1715px) {
    .breadcrumb__item {
      width: 96px !important;
      padding-left: 0;
      .a{
        margin-right: 0px;
        padding-left: 12px;
        width: 100%;
      }
      .xBtn{
        right: 6px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 10px;
      }
      .xBtn{
        right: 10px !important;
      }
    }

    ${({ items }) =>
    items.length <= 6  && css`
      .breadcrumb {
        &__item {
          width: 222px !important;
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 13px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 7 &&
    items.length <= 8 && css`
      .breadcrumb {
        &__item {
          width: 167px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 9 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 122px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1605px) {
    .breadcrumb__item {
      width: 90px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 100%;
      }
      .xBtn{
        right: 5px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 9px;
      }
      .xBtn{
        right: 9px !important;
      }
    }
    ${({ items }) =>
    items.length <= 6  && css`
      .breadcrumb {
        &__item {
          width: 210px !important;
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 13px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 7 &&
    items.length <= 9 && css`
      .breadcrumb {
        &__item {
          width: 140px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 10 &&
    items.length <= 12 &&
    css`
      .breadcrumb {
        &__item {
          width: 105px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1520px) {
    .breadcrumb__item {
      width: 84px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 98%;
      }
      .xBtn{
        right: 5px !important;
        .ui__icon__wrapper  {
          width: 21px;
          height: 21px;
          .icon-exit{
            width: 21px;
            height: 21px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 8px;
      }
      .xBtn{
        right: 9px !important;
      }
    }

    ${({ items }) =>
    items.length <= 5  && css`
      .breadcrumb {
        &__item {
          width: 235px !important;
          .a{
            padding-left: 17px;
          }
          .xBtn{
            right: 15px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 6 &&
    items.length <= 7 && css`
      .breadcrumb {
        &__item {
          width: 165px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 8 &&
    items.length <= 9 && css`
      .breadcrumb {
        &__item {
          width: 130px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 10 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 105px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1435px) {
    .breadcrumb__item {
      width: 77px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 100%;
      }
      .xBtn{
        right: 4px !important;
        .ui__icon__wrapper  {
          width: 20px;
          height: 20px;
          .icon-exit{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 8px;
      }
      .xBtn{
        right: 8px !important;
      }
    }
    ${({ items }) =>
    items.length <= 5  && css`
      .breadcrumb {
        &__item {
          width: 215px !important;
          .a{
            padding-left: 17px;
          }
          .xBtn{
            right: 15px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 6 &&
    items.length <= 7 && css`
      .breadcrumb {
        &__item {
          width: 154px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 8 &&
    items.length <= 9 && css`
      .breadcrumb {
        &__item {
          width: 118px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 10 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 97px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1340px) {
    .breadcrumb__item {
      width: 68px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 100%;
      }
      .xBtn{
        right: 4px !important;
        .ui__icon__wrapper  {
          width: 19px;
          height: 19px;
          .icon-exit{
            width: 19px;
            height: 19px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 8px;
      }
      .xBtn{
        right: 7px !important;
      }
    }

    ${({ items }) =>
    items.length <= 4 && css`
      .breadcrumb {
        &__item {
          width: 230px !important;
          .a{
            padding-left: 17px;
          }
          .xBtn{
            right: 15px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 5 &&
    items.length <= 6 && css`
      .breadcrumb {
        &__item {
          width: 157px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 7 &&
    items.length <= 9 && css`
      .breadcrumb {
        &__item {
          width: 118px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 9 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 86px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1213px) {
    .breadcrumb__item {
      width: 60px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 100%;
      }
      .xBtn{
        right: 4px !important;
        .ui__icon__wrapper  {
          width: 18px;
          height: 18px;
          .icon-exit{
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 8px;
      }
      .xBtn{
        right: 7px !important;
      }
    }

    ${({ items }) =>
    items.length <= 4 && css`
      .breadcrumb {
        &__item {
          width: 210px !important;
          .a{
            padding-left: 10px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 5 &&
    items.length <= 6 && css`
      .breadcrumb {
        &__item {
          width: 140px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 7 &&
    items.length <= 9 && css`
      .breadcrumb {
        &__item {
          width: 105px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 9 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 76px !important;
        }
      }
    `}
  }

  @media only screen and (max-width: 1100px) {
    .breadcrumb__item {
      width: 52px !important;
      padding-left: 0;
      .a{
        margin-right: 0;
        padding-left: 10px;
        width: 100%;
      }
      .xBtn{
        right: 4px !important;
        .ui__icon__wrapper  {
          width: 18px;
          height: 18px;
          .icon-exit{
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .active {
      .a{
        padding-left: 7px;
      }
      .xBtn{
        right: 7px !important;
      }
    }

    ${({ items }) =>
    items.length < 4 && css`
      .breadcrumb {
        &__item {
          width: 240px !important;
          .a{
            padding-left: 10px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
        .active {
          .a{
            padding-left: 15px;
          }
          .xBtn{
            right: 20px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 4 &&
    items.length <= 6 && css`
      .breadcrumb {
        &__item {
          width: 140px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 6 &&
    items.length <= 8 && css`
      .breadcrumb {
        &__item {
          width: 90px !important;
        }
        .active {
          .a{
            padding-left: 5px;
          }
          .xBtn{
            right: 10px !important;
          }
        }
      }
    `}

    ${({ items }) =>
    items.length >= 9 &&
    items.length <= 11 &&
    css`
      .breadcrumb {
        &__item {
          width: 66px !important;
        }
      }
    `}
  }
`;

const Breadcrumb = ({ items = [], active = null, removeBreadcrumbItem, setActiveBreadcrumbItem, ...rest }) => {
  const history = useHistory();
  const [isContextMenuOpen, setContextMenuOpen] = useState({
    position: null,
    url: null,
  });

  const removeItem = (pathname) => {
    const index = findIndex(items, (item) => isEqual(get(item, "url"), pathname));
    if (index >= 0) {
      items = items.filter((item) => get(item, "url", "") !== pathname);
      if (items.length === 0) history.push("/default");
      removeBreadcrumbItem(items);
      if (pathname === active) history.push(get(items, `[${index - 1}].url`));
    } else if (pathname === active) removeAllTab();
  };

  const removeOtherTab = (pathname) => {
    const newTabs = items.filter((item) => isEqual(get(item, "url"), pathname));
    removeBreadcrumbItem(newTabs);
    history.push(pathname);
  };

  const removeAllTab = (pathname) => {
    history.push("/default");
    removeBreadcrumbItem([]);
  };

  const removeLeftTab = (pathname, index) => {
    index = findIndex(items, (item) => isEqual(get(item, "url"), pathname));
    let newTabs = items.filter((i, ind) => ind > index - 1);
    if (get(items[index], "url", "") !== active) {
      let res = newTabs.find((item) => get(item, "url", "") === active);
      if (isNil(res)) history.push(get(newTabs, `[${0}].url`));
    }
    removeBreadcrumbItem(newTabs);
  };

  const removeRightTab = (pathname, index) => {
    index = findIndex(items, (item) => isEqual(get(item, "url"), pathname));
    let newTabs = items.filter((i, ind) => ind <= index);

    if (get(items[index], "url", "") !== active) {
      let res = newTabs.find((item) => get(item, "url", "") === active);
      if (isNil(res)) history.push(get(newTabs, `[${0}].url`));
    }
    removeBreadcrumbItem(newTabs);
  };

  const onClickHandler = (item) => {
    setActiveBreadcrumbItem(get(item, "url", "#"));
    history.push(get(item, "url", "#"));
  };

  const handleRightClick = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuOpen({ position: { top: e.clientY, left: e.clientX }, url: url });
  };

  function clickMenuItem(e, type) {
    closeMenu();
    if (type === "close") removeItem(isContextMenuOpen.url);
    else if (type === "close other") removeOtherTab(isContextMenuOpen.url);
    else if (type === "close all") removeAllTab();
    else if (type === "close left") removeLeftTab(isContextMenuOpen.url);
    else if (type === "close right") removeRightTab(isContextMenuOpen.url);
  }
  const closeMenu = () => isContextMenuOpen.url && setContextMenuOpen({ position: null, url: null });

  return (
    <StyledBreadcrumb position={isContextMenuOpen.position} {...rest} items={items}>
      <div className={"left_border"}></div>
      <ReactTooltip id="tabHover" />
      <ul className={"breadcrumb"}>
        {isArray(items) &&
          items &&
          items.map((item, index) => (
            <li
              key={get(item, "id", index + 1)}
              onContextMenuCapture={(e) => handleRightClick(e, get(item, "url"))}
              className={classNames(
                "breadcrumb__item",
                {
                  active: isEqual(get(item, "url"), active),
                },
                { "short-width": items.length >= 8 }
              )}
              data-tip={get(item, "name")}
              data-place={"bottom"}
              data-effect={"solid"}
              data-for={"tabHover"}
            >
              <Title
                onContextMenuCapture={(e) => handleRightClick(e, get(item, "url"))}
                className="a"
                onClick={() => onClickHandler(item)}
              >
                {/* {isEqual(get(item, "url"), active)
                  ? cropText(get(item, "name", "-"))
                  : getWordFromString(get(item, "name", "-"), items.length)} */}
                {cropText(get(item, "name", "-"))}
                {/* {get(item, "name", "-")} */}
              </Title>
              <Icon mainClassName={"xBtn"} icon="icon-exit" color="#323232" onClick={(e) => removeItem(get(item, "url"))} />
            </li>
          ))}
      </ul>

      {/* Context menu */}
      {isContextMenuOpen.url && (
        <OutsideClickHandler onOutsideClick={closeMenu}>
          <ul className="react__contextmenu">
            <li className="react__contextmenu__item" onClick={(e) => clickMenuItem(e, "close")}>
              Close
            </li>
            <li className="react__contextmenu__item" onClick={(e) => clickMenuItem(e, "close other")}>
              Close Other Tabs
            </li>
            <li className="react__contextmenu__item" onClick={(e) => clickMenuItem(e, "close all")}>
              Close All Tabs
            </li>
            <li className="react__contextmenu__item" onClick={(e) => clickMenuItem(e, "close left")}>
              Close Tabs to the Left
            </li>
            <li className="react__contextmenu__item" onClick={(e) => clickMenuItem(e, "close right")}>
              Close Tabs to the Right
            </li>
          </ul>
        </OutsideClickHandler>
      )}
    </StyledBreadcrumb>
  );
};
const mapStateToProps = (state) => {
  return {
    items: get(state, "settings.breadcrumbs", []),
    active: get(state, "settings.breadcrumb", null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeBreadcrumbItem: (items) =>
      dispatch({
        type: Actions.REMOVE_BREADCRUMB_ITEM.REQUEST,
        payload: { items },
      }),
    setActiveBreadcrumbItem: (pathname) =>
      dispatch({
        type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST,
        payload: { pathname },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
