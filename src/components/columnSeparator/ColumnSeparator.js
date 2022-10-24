import React, { useState, memo, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { get, toLower, isEmpty, isArray } from "lodash";
import classNames from "classnames";
import { withTranslation } from "react-i18next";

import FormDemo from "../../containers/Form/form-demo";
import Dropdown from "../elements/dropDown";
import Icon from "../elements/icon";
import Button from "../elements/button";
import Text from "../elements/text";
import Tabs from "../tabs/tabs";
import { search } from "../../utils";
import AddField from "./AddFeild";
import AddColumn from "../addColumn";
import { TYPES } from "../../containers/DataGrid/types";
import SimpleBar from "simplebar-react";
import { useRouteMatch } from "react-router-dom";

const StyledColumnSeparator = styled.div`
  .dropDown {
    position: static;
  }
  .dropDown__button {
    button {
      border-radius: 4px;
      margin-left: 5px;
      background-color: #e6e8ec;
      .ui__icon__wrapper {
        height: 15px;
        width: 15px;
        .icon-add-plus {
          height: 15px;
          width: 15px;
        }
      }
    }
  }
  .dropDown__body {
    z-index: 99;
    left: ${({ is_open_submenu, position }) => (is_open_submenu ? position.clientX - 320 : position.clientX - 570)}px !important;
    right: auto !important;
    z-index: 10 !important;
  }
  .dropdown {
    min-width: 215px;
    .tabs__list {
      padding: 10px;
      border-bottom: 1px solid #f4f5f6;
      min-height: 55px;
      .tabs__list__left {
        background-color: #fafafb;
      }
      .tabs__list__tab {
        background-color: #fafafb;
        color: #777e90;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        min-width: 105px;
        transition: 0.5s ease;
        justify-content: center;
        padding: 5px;
        height: 30px;
      }
      .active {
        background-color: #45b26b;
        color: #f4f5f6;
      }
    }
    .tabs__content {
      padding: 0;
    }
    .content__part {
      padding: 10px;
      overflow: auto;
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
      form {
        max-height: 35vh;
        overflow: auto;
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
        padding: 8px 10px;
        margin-bottom: 10px;
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
        cursor: pointer;
        padding: 8px 10px;
        border-radius: 4px;
        margin-bottom: 4px;
        transition: 0.4s ease;
        &.disabled {
          cursor: not-allowed;
        }
        .ui__icon__wrapper {
          margin-right: 5px;
          .icon {
            height: 16px;
            width: 16px;
            background-color: #353945;
          }
        }
        p {
          color: #353945;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .fields {
        h6 {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .show {
          border-bottom: 1px solid #f4f5f6;
          margin-bottom: 10px;
          padding-bottom: 6px;
          .option {
            background-color: #f6fbf8;
            justify-content: space-between;
            .ui__icon__wrapper {
              height: 16px;
              width: 16px;
              .icon-check2 {
                height: 13px;
                background-color: #45b26b;
              }
            }
            :hover {
              background-color: #f6fbf8;
              p {
                color: #45b26b;
              }
            }
            p {
              color: #45b26b;
              font-weight: 500;
            }
          }
        }
        .option {
          background-color: #fcfcfd;
          :hover {
            background-color: #f4f5f6;
            p {
              color: #353945;
              font-weight: 500;
            }
          }
          p {
            color: #777e90;
          }
        }
      }
      .add_new {
        max-height: 250px;
        .option {
          :hover {
            background-color: #fafafb;
          }
        }
      }
    }
  }

  .add-column {
    &-simplebar {
      max-height: 500px;
    }
    .dropDown {
      &__body {
        //left: auto !important;
        //right: 10px !important;
        left: ${({ is_open_submenu, position }) =>
          !is_open_submenu
            ? position.clientX - 1070
            : position.clientX - 660 < 300
            ? position.clientX - 60
            : position.clientX - 700}px !important;
        right: auto !important;
        min-width: 500px;
        max-height: 500px;
        overflow: inherit;
      }
    }
  }
`;

const ColumnSeparator = ({ t, fields = [], hideOrShowColumn = () => {}, is_open_submenu, addCustomField, ...rest }) => {
  const [columns, setColumns] = useState([]);
  const [position, setPosition] = useState({});
  const [addColumn, setAddColumn] = useState({ name: "", isOpen: false });

  const match = useRouteMatch();

  useEffect(() => {
    if (!isEmpty(fields)) {
      setColumns(fields);
    }
  }, [fields]);

  const addColumnClose = () => setAddColumn((s) => ({ ...s, isOpen: false, name: "" }));

  return (
    <StyledColumnSeparator position={position} is_open_submenu={is_open_submenu}>
      <Dropdown
        button={
          <Button onCLick={(e) => setPosition(e)}>
            <Icon icon="icon-add-plus" color="#777E90" />
          </Button>
        }
        isClose={addColumn.isOpen}
      >
        <div className="dropdown">
          <Tabs
            leftList={["Fields", "Add new"]}
            rightList={[]}
            leftContent={[
              <div className="content__part">
                <div className="search_part">
                  <input className="search" placeholder="Search" onChange={(e) => search(columns, e.target.value, "name")} />
                  <Icon icon="icon-search" />
                </div>
                <FormDemo>
                  <div className="fields">
                    <div className="show">
                      <h6>Show Fields</h6>
                      {columns &&
                        isArray(columns) &&
                        columns.map(
                          (column, index) =>
                            !get(column, "hidden", false) && (
                              <div
                                key={index + 1}
                                className={classNames("option", {
                                  disabled: get(column, "root", false),
                                })}
                                onClick={() => !get(column, "root", false) && hideOrShowColumn(get(column, "id"), false)}
                              >
                                <Text>{get(column, "name")}</Text>
                                <Icon icon="icon-check2" />
                              </div>
                            )
                        )}
                    </div>
                    <h6>Fields in the list</h6>
                    {columns &&
                      isArray(columns) &&
                      columns.map(
                        (column, index) =>
                          get(column, "hidden", false) && (
                            <div key={index + 1} className="option" onClick={() => hideOrShowColumn(get(column, "id"), true)}>
                              <Text>{get(column, "name")}</Text>
                            </div>
                          )
                      )}
                  </div>
                </FormDemo>
              </div>,
              <AddField {...{ t, setAddColumn }} />,
            ]}
          />
        </div>
      </Dropdown>

      <Dropdown className={"add-column"} active={addColumn.isOpen} onClose={addColumnClose}>
        {/*<SimpleBar className={"add-column-simplebar"}>*/}
        <AddColumn
          {...{
            name: get(addColumn, "name", ""),
            TYPES,
            cancel: addColumnClose,
            addCustomField,
            id: match.params.id,
            idKey: "viewId",
          }}
        />
        {/*</SimpleBar>*/}
      </Dropdown>
    </StyledColumnSeparator>
  );
};

const mapStateToProps = (state) => {
  return {
    is_open_submenu: get(state, "settings.is_open_submenu", true),
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, null)(memo(ColumnSeparator)));
