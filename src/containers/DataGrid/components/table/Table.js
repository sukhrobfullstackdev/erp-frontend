import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useBlockLayout, useColumnOrder, useResizeColumns, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import { find, get, isEqual } from "lodash";
import ScrollbarWidth from "./TableScrollbar";
import { ContentLoader } from "../../../../components/loader";
import { withTranslation } from "react-i18next";
import ColumnSeparator from "../../../../components/columnSeparator/ColumnSeparator";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { toast } from "react-toastify";

const GridStyle = styled.div`
  .table {
    max-width: 98%;
    display: flex;
    max-height: 85vh;

    &::-webkit-scrollbar {
      width: 11px;
      height: 11px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(119, 126, 144, 1);
      border-radius: 2px;
      transition: 0.2s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(119, 126, 144, 0.8);
    }

    &.sticky {
      overflow: auto;
      overflow-y: hidden;
    }

    .tr {
      height: 30px;

      .td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.unsetOverflow {
          overflow: unset;
        }
      }
    }

    &-head {
      .tr {
        padding-right: 10px;
        background-color: #fafbfc;
      }
    }
    &-body {
      & > div {
        overflow: unset !important;
      }

      &-width {
        width: 100% !important;
      }

      .flexedSizeList {
        &::-webkit-scrollbar {
          width: 10px;
          height: 11px;
          &-track {
            background: #eff1f3;
            border-radius: 3px;
          }
          &-thumb {
            background: rgba(119, 126, 144, 1);
            border-radius: 3px;
            transition: 0.2s;
            &:hover {
              background: rgba(119, 126, 144, 0.8);
            }
          }
        }
      }

      .tr {
        border-bottom: 1px solid #e1e6ec;
        height: 30px !important;

        &:first-child {
          border-top: 1px solid #e6e8ec;
        }

        .td {
          background-color: #fff;
          //padding: 6px 12px;
          border-left: 1px solid #e1e6ec;
          color: #353945;
          font-size: 12px;
          font-weight: 400;
          display: flex !important;
          justify-content: space-between;
          align-items: center;

          .select__header__content,
          .datepicker__input {
            color: #353945;
            font-size: 12px !important;
            font-weight: 400 !important;
          }

          .open-row-item-container {
            width: 22px;
            height: 22px;
            background: #e2f5e9;
            border-radius: 4px;
            opacity: 0;
            overflow: hidden;
            transform: scale(0);
            margin-right: 5px;
            //animation: hideAnim 0.2s forwards;

            .ui_icon_wrapper {
              width: 14px !important;
              height: 14px !important;

              .icon {
                width: 100% !important;
                height: 100% !important;
              }
            }
          }

          input {
            border: none;
            outline: none;
            width: 100%;
          }

          &:last-child {
            border-right: 1px solid #e1e6ec;
          }

          &:hover {
            .open-row-item-container {
              animation: showAnim 0.2s forwards;
            }
          }
        }
      }
    }

    ${({ rowSize }) =>
      rowSize == "MEDIUM" &&
      css`
        &-body {
          .tr {
            height: 50px !important;
          }
        }
      `}
    ${({ rowSize }) =>
      rowSize == "LARGE" &&
      css`
        &-body {
          .tr {
            height: 80px !important;
          }
        }
      `}
    ${({ rowSize }) =>
      rowSize == "HUGE" &&
      css`
        &-body {
          .tr {
            height: 110px !important;
          }
        }
      `}
  }
`;

const Table = ({
  t,
  isSticky = false,
  isResizable = false,
  isColumnMove = false,
  isRowMove = false,
  isFullWidth = false,
  sortFromView = () => {},
  data = [],
  columns = [],
  permissions = {},
  type = "",
  className = "",
  updateItemRequest = () => {},
  hideOrShowColumn = () => {},
  pinOrUnpinColumn = () => {},
  sorting,
  rowSize = "SMALL",
  fields = [],
  redirectUrl = "",
  isNextPageLoading,
  loadNextPage,
  page = 0,
  count = 1,
  itemCount,
  startItemIndex = 0,
  addCustomField,
  setEntityOne,
  entityName,
  viewId,
  ...rest
}) => {
  const currentColOrder = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const listRef = React.createRef();
  const [listRef, setListRef] = useState(React.createRef());

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(startItemIndex);
    }
  }, [data]);

  columns = useMemo(
    () =>
      columns
        .map(
          ({
            name,
            id,
            hidden,
            pinned,
            type,
            width = 200,
            enabled = false,
            sortable = false,
            customField = false,
            root = false,
            typeConfig = {},
          }) => ({
            Header: name,
            accessor: id,
            sticky: pinned ? "left" : "",
            pinned,
            width,
            type: type ?? "",
            editable: get(permissions, "canEnterData", false) && enabled,
            hidden,
            sortable,
            customField,
            sortingIndex: get(
              find(sorting, (item) => isEqual(get(item, "field"), id)),
              "orderIndex",
              -1
            ),
            sortingDirection: get(
              find(sorting, (item) => isEqual(get(item, "field"), id)),
              "direction",
              1
            ),
            root,
            typeConfig,
          })
        )
        .filter(({ hidden }) => !hidden),
    [sorting, columns]
  );

  const defaultColumn = React.useMemo(
    () => ({
      Cell: TableCell,
      minWidth: 30,
      width: 200,
      maxWidth: 500,
    }),
    []
  );

  const scrollBarSize = useMemo(() => ScrollbarWidth(), []);

  const openRowItem = useCallback(
    (rowId) => {
      if (get(redirectUrl, "itemOpen")) {
        history.push(get(redirectUrl, "itemOpen") + rowId);
      }
    },
    [redirectUrl]
  );

  // data = data.filter((item) => item);
  if (data[0] === undefined) toast.error(t("data ni tekshirib ko'ring id kelmagan bo'lishi mumkin"));
  // ORADA ARRAYNING MALUMOTLARIN UNDEFINED BO'LAYAPTI BUGA SABAB ENTITYDA MALUMOT KELMASDAN MALUMOTNI DENORMILIZE QILAYAPTI SHUNI HISOBIDAN ARRAY UNDEFINDED BO'LAYAPTI
  data = data[0] === undefined ? [] : data;


  const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow, flatColumns, setColumnOrder } =
    useTable(
      {
        updateItemRequest,
        columns,
        data,
        defaultColumn,
        rowSize,
      },
      useColumnOrder,
      useResizeColumns,
      useBlockLayout
      // useSticky
    );
  return (
    <GridStyle rowSize={rowSize} className={className} {...rest}>
      <ReactTooltip id="foo" />
      <ReactTooltip id="errorToolTip" />
      {/* {(loading || !isNextPageLoading) && <ContentLoader />} */}
      {data.length == 0 ? (
        <p style={{ textAlign: "center", margin: 20 }}>No Data</p>
      ) : (
        <div {...getTableProps()} className="table sticky">
          <div>
            <TableHead
              {...{
                headerGroups,
                flatColumns,
                setColumnOrder,
                currentColOrder,
                isResizable,
                isColumnMove,
                setLoading,
                sortFromView,
                hideOrShowColumn,
                pinOrUnpinColumn
              }}
            />
            <div {...getTableBodyProps()} className="table-body">
              <TableBody
                {...{
                  data,
                  totalColumnsWidth,
                  listRef,
                  rowSize,
                  loadNextPage,
                  rows,
                  prepareRow,
                  scrollBarSize,
                  openRowItem,
                  itemCount
                }}
              />
            </div>
          </div>
          <ColumnSeparator {...{ addCustomField, fields, hideOrShowColumn }} />
        </div>
      )}
    </GridStyle>
  );
};

export default withTranslation("pdp")(memo(Table));
