import React, { memo } from "react";
import styled, { css } from "styled-components";
import { withTranslation } from "react-i18next";
import { useFlexLayout, useResizeColumns, useTable } from "react-table";
import { get, head, isArray, isBoolean, isNull } from "lodash";
import Button from "../elements/button";
import Dropdown from "../elements/dropDown/dropdown";
import Icon from "../elements/icon";
import { formatDate } from "../../utils";
import resize from "../../assets/icons/ewResize.svg";

const TableStyle = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    width: 100%;

    .td,
    .th,
    .tr {
      flex-shrink: 1 !important;
      //min-width: auto !important;
    }

    .tr {
      background: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 10px;
      height: 40px;

      &:first-child {
        display: none !important;
      }

      background: #353945;
      padding: 5px;

      .th {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #f4f5f6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background: #23262f;
          border-radius: 4px;
        }
      }

      .th,
      .td {
        position: relative;
        display: flex !important;
        align-items: center;
        padding: 0 10px;
        justify-content: start;

        &:first-child {
          padding-left: 18px;
          justify-content: flex-start;
          font-weight: 600 !important;
          font-size: 14px !important;
          line-height: 21px !important;
          flex: 0 0 auto !important;
          //width: 40px !important;
        }

        :last-child {
          border-right: 0;
          padding-right: 24px;
          justify-content: flex-end;
        }

        .resizer {
          display: inline-block;
          width: 2px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(50%);
          z-index: 1;
          ${"" /* prevents from scrolling while dragging on touch devices */}
          touch-action: none;
          cursor: url(${resize}) 14 5, auto !important;

          &.isResizing {
            /* background: red; */
          }
        }
      }
    }

    div[role="rowgroup"] {
      .tr {
        background: #f9f9f9;
        display: flex !important;
        margin-bottom: 6px;

        .td {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:last-child {
            display: flex !important;
          }

          .statusBtn {
            button {
              border-radius: 5px;
              min-width: 70px;
              font-family: Poppins;
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 21px;
              text-align: center;
              color: #fcfcfd;
              padding: 4px 5px;
            }
          }

          .actionBtn {
            margin: 11px 15px;

            button {
              width: 100%;
              border: none;
              border-radius: 0px;
              background: transparent;
              padding: 0;
              display: flex;
              align-items: center;
              font-weight: normal;
              font-size: 14px;
              line-height: 21px;
              color: #777e91;

              .ui__icon__wrapper {
                margin-right: 15px;
              }

              &:hover {
                background: transparent;
                color: #777e91;
              }
            }
          }

          .edit {
            button {
              &:hover {
                color: #45b36b;

                .icon {
                  background-color: #45b36b;
                }
              }
            }
          }

          .delete {
            button {
              &:hover {
                color: #ef466f;

                .icon {
                  background-color: #ef466f;
                }
              }
            }
          }
        }
      }
    }
  }

  .dropDown {
    margin-right: 7px;

    &__button {
      &__icon {
        .icon {
          width: 30px !important;
        }
      }
    }
  }
`;

const getStatusValue = (cell) => {
  if ("status" in cell.column) {
    if ("customColumnTrue" in cell.column && "customColumnFalse" in cell.column)
      return get(cell, "value") ? get(cell, "column.customColumnTrue", "") : get(cell, "column.customColumnFalse", "");
    else
      return (
        <Button
          className="statusBtn"
          success={cell.render("Cell").props.value === "active" || cell.render("Cell").props.value}
          danger={cell.render("Cell").props.value === "in active" || !cell.render("Cell").props.value}
        >
          {`${cell.render("Cell").props.value}` || cell.render("Cell")}
        </Button>
      );
  }
};

const getActiveOrInactive = (cell) => {
  if (cell.render("Cell").props.value === "active" || cell.render("Cell").props.value === "in active") {
    return (
      <Button
        className="statusBtn"
        success={cell.render("Cell").props.value === "active" || cell.render("Cell").props.value}
        danger={cell.render("Cell").props.value === "in active" || !cell.render("Cell").props.value}
      >
        {`${cell.render("Cell").props.value}` || cell.render("Cell")}
      </Button>
    );
  }
};

const getDate = (cell) => {
  if (isBoolean(get(cell, "column.date")) && "format" in cell.column) {
    return <span className={"dateFormat"}>{formatDate(new Date(get(cell, "value")), get(cell, "column.format"))}</span>;
  }
  return <span>{cell.render("Cell")}</span>;
};

const CustomTable = ({ data = [], columns = [], customColumnKey = "customColumn", t, ...props }) => {
  const getAction = (cell, i) => {
    return (
      <Dropdown
        button={<Icon icon="icon-more-dots" mainClassName="dropDown__button__icon" />}
        options={[
          <Button
            className={"actionBtn edit"}
            onClick={() => {
              // get(hasModal, "update", false)
              //     ? update(get(data, `[${i}].id`, null))
              //     : history.push(`${get(redirect, "update", '')}/${get(data, `[${i}].id`, null)}`)
            }}
          >
            <Icon icon="icon-edit" color="#777E91" />
            Edit
          </Button>,
          <Button
            onCLick={() => {
              // remove(get(data, `[${i}].id`, null), isString(get(data, `[${i}].name`, '-'))
              //     ? get(data, `[${i}].name`, '-')
              //     : get(data, `[${i}].name.props.children`, '-'))
            }}
            className={"actionBtn delete"}
          >
            <Icon icon="icon-recycle" color="#777E91" />
            {t("delete") ?? "Delete"}
          </Button>,
        ]}
      />
    );
  };

  const getColumn = ({ cell, rowIndex }) => {
    if ("status" in cell.column) return getStatusValue(cell);
    else if ("customColumn" in cell.column) return cell.column.customColumn({ column: cell.column, cell, rowIndex });
    else if (cell.render("Cell").props.value === "active" || cell.render("Cell").props.value === "in active")
      return getActiveOrInactive(cell);
    else if (cell.render("Cell").props.value === "action") return getAction(cell, rowIndex);
    else if ("date" in cell.column) return getDate(cell);
    else if ("number" === cell.column.id) return rowIndex + 1;
    else return <span>{cell.render("Cell")}</span>;
  };

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 200,
      maxWidth: 500,
    }),
    []
  );

  // let items = data.map(({...row}, index) => ({
  //     ...row,
  //     number: index + 1,
  // }));

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useResizeColumns
  );

  return (
    <TableStyle length={columns.length} {...{ columnWidth: 200 }}>
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups &&
              isArray(headerGroups) &&
              headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {t(column.render("Header")) ?? column.render("Header")}
                      <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? "isResizing" : ""}`} />
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows &&
              isArray(rows) &&
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <div
                    {...row.getRowProps()}
                    className="tr"
                    onClick={() => {
                      if ("clickRow" in head(columns)) head(columns).clickRow(row.original);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <div {...cell.getCellProps()} className="td" data-for={"td"}>
                          {getColumn({ cell, rowIndex: i })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </TableStyle>
  );
};

export default withTranslation("pdp")(memo(CustomTable));
