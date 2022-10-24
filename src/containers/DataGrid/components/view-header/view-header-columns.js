import React, { memo } from "react";
import styled from "styled-components";
import { get, isArray, orderBy, some, toLower } from "lodash";
import ColorIcon from "../../../../assets/icons/Color.svg";
import classNames from "classnames";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import Icon from "../../../../components/elements/icon";
import Button from "../../../../components/elements/button";
import { withTranslation } from "react-i18next";
import Text from "../../../../components/elements/text";
import Switcher from "../../../../components/form-group-elements/Switcher";
import slugify from "react-slugify";

const Style = styled.div`
  .dropDown__button {
    button {
      color: #777e90;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid #e6e8ec;

      :hover {
        background-color: #e6e8ec;
      }

      .ui__icon__wrapper {
        margin-left: 14px;
        height: 18px;
        width: 18px;

        .icon-hide-eye {
          height: 18px;
          width: 18px;
        }
      }
    }
  }

  .dropDown__body {
    z-index: 9;
    left: auto !important;
    right: 0 !important;
  }

  .dropdown {
    min-width: 215px;
    overflow-y: auto;
    position: relative;

    &__top {
      padding: 6px;
    }

    form {
      overflow: auto;
      max-height: 45vh;

      &::-webkit-scrollbar {
        width: 7px;
        height: 11px;
      }

      &::-webkit-scrollbar-track {
        display: none;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(119, 126, 144, 1);
        border-radius: 5px;
        transition: 0.2s;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgba(119, 126, 144, 0.8);
      }
    }

    .search_part {
      display: flex;
      align-items: center;
      background-color: #fafafb;
      border-radius: 4px;
      width: 100%;
      min-height: 30px;
      padding: 7px;
      margin-bottom: 9px;

      .search {
        background-color: #fafafb;
        width: 100%;
        min-height: 20px;
        border: none;
        font-size: 12px;
        position: relative;

        ::placeholder {
          color: #b1b5c3;
        }

        :focus {
          outline: none;
        }
      }

      .ui__icon__wrapper {
        height: 14px;
        width: 14px;

        .icon-search {
          height: 14px;
          width: 14px;
        }
      }
    }

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 6px 7px;
      background-color: #fafafb;
      border-radius: 6px;
      margin-bottom: 4px;

      .d-flex {
        display: flex;
        align-items: center;

        .ui__icon__wrapper {
          margin-right: 5px;

          .icon {
            height: 14px;
            width: 14px;
            background-color: #353945;
          }
        }

        p {
          font-size: 10px;
          font-weight: 500;
          max-width: 105px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        img {
          height: 14px;
          width: 14px;
          margin: 0 6px 0 10px;
        }
      }
    }

    .bottom__button {
      border-top: 1px solid #e6e8ec;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 6px;

      button {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        color: #353945;
        border-radius: 4px;
        border: 1px solid #e6e8ec;
        padding: 6px 20px;
        background-color: transparent;
      }
    }

    .disable__btn {
      button {
        background-color: #f4f5f6;
        border: none;
        color: #777e90;
        cursor: not-allowed;
      }
    }
  }
`;

const ViewHeaderColumns = ({ t, columns = [], hideOrShowColumn = () => {}, ...rest }) => {
  const handleChange = (checked, name) => {
    hideOrShowColumn(name, checked);
  };

  return (
    <Style>
      <Dropdown
        button={
          <Button>
            Columns
            <Icon icon="icon-hide-eye" />
          </Button>
        }
      >
        <div className="dropdown">
          <div className="dropdown__top">
            <div className="search_part">
              <input className="search" placeholder="Search" />
              <Icon icon="icon-search" />
            </div>
            {columns &&
              isArray(columns) &&
              orderBy(columns, ["name"], ["asc"]).map(
                (field, index) =>
                  !get(field, "root") && (
                    <div key={index + 1} className="option">
                      <div className="d-flex">
                        <Icon size="sm" icon={`icon-${slugify(get(field, "type"))}`} />
                        <Text data-tip={get(field, "name")} data-place={"bottom"} data-effect={"solid"} data-for={"foo"}>
                          {get(field, "name")}
                        </Text>
                      </div>
                      <div className="d-flex">
                        <img src={ColorIcon} />
                        <Switcher defaultValue={!get(field, "hidden")} name={get(field, "id")} onChange={handleChange} sm />
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className="bottom__button">
            <Button
              className={classNames({
                disable__btn: !some(columns, {
                  hidden: false,
                  root: false,
                }),
              })}
              onCLick={() => {
                hideOrShowColumn(null, false);
              }}
            >
              Hide All
            </Button>
            <Button
              className={classNames({
                disable__btn: !some(columns, ["hidden", true]),
              })}
              onCLick={() => {
                hideOrShowColumn(null, true);
              }}
            >
              Show All
            </Button>
          </div>
        </div>
      </Dropdown>
    </Style>
  );
};

export default withTranslation("pdp")(memo(ViewHeaderColumns));
