import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import { find, get, isArray, isEqual } from "lodash";
import classNames from "classnames";
import StickyBox from "react-sticky-box";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import miniLogo from "../../assets/images/mini-logo.svg";
import Icon from "../elements/icon";
import Title from "../elements/title";
import switcherImg from "../../assets/icons/sidebar-switcher.svg";
import Actions from "../../modules/settings/actions";
import { getIconName, getUrlFromName } from "../../utils";
import slugify from "react-slugify";
import { withTranslation } from "react-i18next";
import Rectangle from "../../assets/icons/Rectangle.svg";
import { toast } from "react-toastify";
import actions from "../../modules/settings/actions";

const StyledSidebar = styled.div`
  display: flex;
  .sidebar {
    width: 100px;
    background: #23262f;
    box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    overflow-y: hidden;
    z-index: 99;
    transition: 0.3s;
    overflow-x: hidden;
    ${({ isSidebarOpen }) =>
      !isSidebarOpen &&
      css`
        width: 0px;
      `}
  }

  .sidebar {
    min-height: 600px;

    &__header {
      height: 80px;
      display: flex;
      justify-content: center;
      padding-top: 30px;
      .img-fluid {
        width: 50px;
      }
    }

    &__content {
      padding-top: 15px;
      ${`min-height: calc(100vh - 283px);`};
    }

    &__footer {
      border-top: 1px solid #353945;
      padding-top: 16px;
      height: 203px;

      &_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 35px;
        .icon {
          transition: none;
          transform: translate(-50%, -50%) rotate(180deg);
        }
        &.rotated {
          .icon {
            transform: translate(-50%, -50%) rotate(0deg);
            /* left: 0 !important;
            top: 0 !important; */
          }
        }

        .icon {
          width: 8px !important;
          height: 14px !important;
          display: inline-block;

          &:hover {
            background-color: #fff;
          }
        }
      }
      .menu__item {
        display: flex;
        justify-content: center;
        .dropDown {
          width: auto;
          height: auto;
        }
      }
    }

    &__switcher {
      position: absolute;
      left: ${({ isSidebarOpen }) => (isSidebarOpen ? "77.4px" : "-22px")};
      width: 45px;
      height: 90px;
      border-radius: 50%;
      background-image: url(${switcherImg});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      z-index: 99;
      top: -1px;
      transition: 0.3s;
      .icon.icon-double-arrow-left {
        position: relative !important;
        top: 18px;
        left: 20px;
      }

      .for-animation {
        transition: 0.1s ease;

        &.rotated {
          transform: rotate(180deg);
          transform-origin: center;
          padding-right: 15px;
          position: relative !important;
          top: 6px;
          left: 6px;
        }
      }
    }
  }

  .menu {
    &__item {
      margin-top: 20px;
      position: relative;
      list-style: none;
      &__text {
        font-size: 12px;
      }
      &:last-child {
        margin-bottom: 0;
      }

      &:after {
        position: absolute;
        content: "";
        left: 0px;
        top: 7px;
        transition: 0.2s ease;
        mask-image: url(${Rectangle});
        -webkit-mask-image: url(${Rectangle});
        height: 48px;
        width: 5px;
      }

      &:hover {
        &:after {
          background: #f4f5f6;
        }

        .menu__item_text {
          color: #fff;
        }

        .icon {
          background-color: #fff;
        }
      }

      &_link {
        display: flex;
        flex-direction: column;
        padding: 5px 15px;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        .ui__icon__wrapper {
          border-radius: 0;
          &.lg {
            .icon {
              width: 30px;
              height: 30px;
            }
          }
        }
      }

      &_text {
        font-size: 12px;
        color: #b1b5c4;
        margin-top: 7px;
        font-weight: 500;
        transition: 0.2s ease;
        text-transform: uppercase;
      }

      &.active {
        .menu__item_text {
          color: #fff;
        }
        .icon {
          background-color: #fff;
        }

        &:after {
          background: #30c062;
        }
      }
    }
  }
  .sidebar__footer {
    .menu {
      &__item {
        &:hover {
          &:after {
            background: none;
            content: none;
          }

          .menu__item_text {
            color: #fff;
          }

          .icon {
            background-color: #b1b5c4;
          }
        }
        &.active {
          .menu__item_text {
            color: #fff;
          }

          .icon {
            background-color: #b1b5c4;
          }

          &:after {
            background: none;
            content: none;
          }
        }
      }
    }
  }

  .submenu {
    width: ${({ isSubmenuOpen }) => (isSubmenuOpen ? "0px" : "250px")};
    background-color: #fcfcfd;
    border-right: 1px solid #e6e8ec;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 0px 12px 12px 0px;
    height: 100vh;
    padding: 0px 0px 15px 0px;
    overflow-x: hidden;
    /* position: ${({ isSubmenuOpen }) => (isSubmenuOpen ? "relative" : "absolute")};
    left: ${({ isSubmenuOpen }) => (isSubmenuOpen ? "0px" : "100px")};
    display: ${({ isSubmenuOpen, hoverMenuId }) => (isSubmenuOpen ? "block" : "none")}; */
    z-index: 99;
    transition: 0.2s;
    &__content {
      &_item {
        padding-top: 29px;
        &:nth-of-type(1) {
          .submenu__links {
            //border-top: 1px solid #F4F5F6;
            //border-bottom: 1px solid #F4F5F6;
            border-top: 1px solid #e6e8ec;
            border-bottom: 1px solid #e6e8ec;
            margin-top: 29px;
          }
        }
      }

      h2 {
        padding-left: 35px;
        padding-right: 15px;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        //width: 252px;
        width: 215px;
        overflow: hidden;

        &[data-title]::before {
          content: attr(data-title);
          opacity: 0;
          position: absolute;
          margin-top: 33px;
          padding: 0px 10px;
          background: #23262f;
          color: #fff;
          font-size: 12px;
          font-weight: 400;
          white-space: wrap;
          z-index: -9;
          transition: 0.5s;
          border-radius: 5px;
          left: ${({ isSubmenuOpen }) => (isSubmenuOpen ? "-100%" : "auto")};
        }
        &[data-title]:hover {
          &::before {
            z-index: 9;
            opacity: 1;
          }
        }
      }
      .submenu__links {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .submenu__link {
        margin: 0 15px;
        padding: 8px 15px 8px 20px;
        padding: 8px 15px;
        height: 57px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #353945;
        text-decoration: none;
        transition: 0.3s ease;
        .text {
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        &.active {
          border-radius: 10px;
          background: rgba(69, 179, 107, 0.07);
          color: #30c062;
        }
        &:hover {
          border-radius: 10px;
          background: rgba(69, 179, 107, 0.07);
          color: #30c062;
        }
      }
    }
  }
`;

const Sidebar = ({
  t,
  modules = [],
  setActiveMenuItemIdRequest,
  sidebarActiveMenuId,
  setOpenSubmenuRequest,
  isSubmenuOpen,
  setOpenSidebarRequest,
  isSidebarOpen,
  setSubmenu,
  breadcrumbs,
  setActiveBreadcrumbItem,
  ...rest
}) => {
  const [hoverMenuId, setHoverMenuId] = useState(null);
  const [departments, setDepartments] = useState([]);

  const setActiveMenuItemId = (id) => {
    setActiveMenuItemIdRequest(id);
  };

  const setOpenSubmenu = () => {
    setOpenSubmenuRequest(!isSubmenuOpen);
  };

  const setOpenSidebar = () => {
    isSidebarOpen && setOpenSubmenuRequest(true);
    setOpenSidebarRequest(!isSidebarOpen);
  };

  let btn = document.querySelector(".dropDown__button");

  const clickDropDown = () => {
    btn.click();
  };

  useEffect(() => {
    setDepartments(
      get(
        find(modules, (module) => isEqual(get(module, "id"), sidebarActiveMenuId)),
        "departments",
        []
      )
    );
    // if (btn.innerText === "") btn.click();
  }, [sidebarActiveMenuId]);

  const handleClick = (e, url) => {
    if (breadcrumbs.length >= 14) {
      e.preventDefault();
      toast.info(t("please_delete_any_of_the_tabs_and_try_again") ?? "please delete any of the tabs and try again");
    } else {
      setActiveBreadcrumbItem(url);
    }
  };

  return (
    <StickyBox offsetTop={0} offsetBottom={0} className={"sticky"} style={{ zIndex: 5 }}>
      <StyledSidebar isSubmenuOpen={isSubmenuOpen} isSidebarOpen={isSidebarOpen} hoverMenuId={hoverMenuId} {...rest}>
        {
          <div className={"sidebar"}>
            <div className="sidebar__header">
              <Link to={"/"}>
                <LazyLoadImage src={miniLogo} className={"img-fluid"} alt="logo" />
              </Link>
            </div>
            <div className="sidebar__content">
              <ul className="menu" onMouseEnter={() => setSubmenu(true)} onMouseLeave={() => setSubmenu(false)}>
                {isArray(modules) &&
                  modules &&
                  modules.map((module, index) => (
                    <li
                      key={get(module, "id", index + 1)}
                      onClick={() => setActiveMenuItemId(get(module, "id"))}
                      className={classNames("menu__item", {
                        active: window.location.pathname.includes(get(module, "title")),
                      })}
                      onMouseEnter={() => setHoverMenuId(get(module, "id"))}
                      onMouseLeave={() => setHoverMenuId(null)}
                    >
                      <div
                        // to={getUrlFromName(get(module, "name", "/"))}
                        className={`menu__item_link ${window.location.pathname.includes(get(module, "title")) ? "active" : ""}`}
                      >
                        <Icon icon={getIconName(get(module, "name"))} size="lg" color="#B1B5C4" />
                        <span className={"menu__item_text"}>{t(get(module, "title", "-")) ?? get(module, "title", "-")}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="sidebar__footer">
              <ul>
                <li
                  className={classNames("menu__item", {
                    active: isEqual(modules.length, sidebarActiveMenuId),
                  })}
                >
                  <div className={"menu__item_link"} onClick={clickDropDown}>
                    <Icon icon={"icon-settings"} size="lg" color="#B1B5C4" />
                    <span className={"menu__item_text"}>{t("SETTINGS")}</span>
                  </div>
                </li>
              </ul>
              <motion.div
                className={classNames("sidebar__footer_icon", {
                  rotated: isSubmenuOpen,
                })}
              >
                <Icon icon={"icon-arrow-right-radius"} onClick={setOpenSubmenu} color="#B1B5C4" />
              </motion.div>
            </div>
          </div>
        }
        <motion.div className="submenu">
          <div className="submenu__content">
            {departments &&
              departments.map((department, index) => (
                <div key={get(department, "id")} className="submenu__content_item">
                  <Title medium sm data-title={get(department, "name", "-")}>
                    {t(get(department, "name", "-")) ?? get(department, "name", "-")}
                  </Title>
                  <nav className={"submenu__links"}>
                    {get(department, "pages", []).map((page) => {
                      let url =
                        "/" +
                        getUrlFromName(
                          `${slugify(
                            get(
                              modules.find((module) => isEqual(get(module, "id"), sidebarActiveMenuId)),
                              "name",
                              "/"
                            )
                          )} ${slugify(get(department, "name", ""))} ${slugify(get(page, "name", "#"))}`
                        );
                      return (
                        <NavLink onClick={(e) => handleClick(e, url)} key={get(page, "id")} to={url} className={"submenu__link"}>
                          <span className={"dot"}></span>
                          <span className={"text"}>{t(get(page, "title", "-")) ?? get(page, "title", "-")}</span>
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
              ))}
          </div>
        </motion.div>
        <div className="sidebar__switcher">
          <motion.div
            className={classNames("for-animation", {
              rotated: !isSidebarOpen,
            })}
          >
            <Icon onClick={setOpenSidebar} size={"lg"} icon={"icon-double-arrow-left"} color={"success"} />
          </motion.div>
        </div>
      </StyledSidebar>
    </StickyBox>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarActiveMenuId: get(state, "settings.menu_item_active_id", 1),
    isSubmenuOpen: get(state, "settings.is_open_submenu", false),
    isSidebarOpen: get(state, "settings.is_open_sidebar", true),
    breadcrumbs: get(state, "settings.breadcrumbs", []),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveMenuItemIdRequest: (id) => {
      dispatch({
        type: Actions.SET_ACTIVE_MENU_ITEM_ID.REQUEST,
        payload: { id },
      });
    },
    setOpenSubmenuRequest: (open) => {
      dispatch({
        type: Actions.SET_OPEN_SUBMENU.REQUEST,
        payload: { open },
      });
    },
    setOpenSidebarRequest: (open) => {
      dispatch({
        type: Actions.SET_OPEN_SIDEBAR.REQUEST,
        payload: { open },
      });
    },
    setActiveBreadcrumbItem: (pathname) =>
      dispatch({
        type: actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST,
        payload: { pathname },
      }),
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
