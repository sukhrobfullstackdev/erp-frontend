import styled, { css } from "styled-components";
import { find, get, isEqual } from "lodash";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import slugify from "react-slugify";
import { NavLink } from "react-router-dom";
import Title from "../elements/title";
import { getUrlFromName } from "../../utils";
import { toast } from "react-toastify";
import actions from "modules/settings/actions";

const SubmenuStyle = styled.div`
  &.submenu {
    background-color: #fcfcfd;
    border-right: 1px solid #e6e8ec;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
    border-radius: 0px 12px 12px 0px;
    height: 100vh;
    padding: 0px 0px 15px 0px;
    overflow-x: hidden;
    transition: 0.2s;
    width: 250px;
    height: 100vh;
    background-color: #fcfcfd;
    position: absolute;
    z-index: 4;
    left: -300px;
    top: 0;

    ${({ active }) =>
      active &&
      css`
        left: 100px;
      `}
    .submenu__content {
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
          left: ${({ active }) => (active ? "-100%" : "auto")};
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

const Submenu = ({ active = false, sidebarActiveMenuId, modules, t, setSubmenu, breadcrumbs, setActiveBreadcrumbItem }) => {
  const [departments, setDepartments] = useState([]);
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
    <SubmenuStyle
      {...{ active }}
      className={"submenu"}
      onMouseEnter={() => setSubmenu(true)}
      onMouseLeave={() => setSubmenu(false)}
    >
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
                      <span className={"dot"} />
                      <span className={"text"}>{t(get(page, "title", "-")) ?? get(page, "title", "-")}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
      </div>
    </SubmenuStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarActiveMenuId: get(state, "settings.menu_item_active_id", 1),
    breadcrumbs: get(state, "settings.breadcrumbs", []),
    // isSubmenuOpen: get(state, "settings.is_open_submenu", false),
    // isSidebarOpen: get(state, "settings.is_open_sidebar", true),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveBreadcrumbItem: (pathname) =>
      dispatch({
        type: actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST,
        payload: { pathname },
      }),
  };
};
export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(Submenu));
