import React, { memo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { get, toLower } from "lodash";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import Icon from "../../../../components/elements/icon";
import Sort from "../../../../components/elements/sort";
import resize from "../../../../assets/icons/ewResize.svg";
import slugify from "react-slugify";

const Styled = styled.div`
  &.table-head {
    display: flex;

    .react-contextmenu {
      position: fixed !important;
      z-index: 9;
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
      border-radius: 6px;
      border: 1px solid #f4f5f6;
      background-color: #fff;
      padding: 6px 5px;
      min-width: 190x;
      display: flex;
      flex-direction: column;
    }

    .menu__footer {
      border-top: 1px solid #f4f5f6;
      padding-top: 5px;
    }

    .react-contextmenu-item {
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      transition: 0.3s ease;
      margin-bottom: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .ui__icon__wrapper {
        margin-right: 10px;
        height: 16px;
        width: 16px;
        border-radius: 0;

        .icon {
          height: 16px;
          width: 16px;
          -webkit-mask-size: contain;
          mask-size: contain;

          :hover {
            background-color: #353945;
          }
        }
      }

      :hover {
        background-color: #f4f5f6;
      }
    }

    .tr {
      border-top: 1px solid #e1e6ec;

      .th {
        display: flex !important;
        align-items: center;
        color: #9da3b6;
        font-size: 12px;
        font-weight: 500;
        background-color: #fafbfc;
        border-left: 1px solid #e1e6ec;
        cursor: pointer;

        .react-contextmenu-wrapper {
          display: flex;
          padding: 6px 13px;
          height: 100%;
          width: 100%;
          justify-content: space-between;

          .sort {
            visibility: hidden;
          }

          :hover {
            .sort {
              visibility: visible;
            }
          }

          .active {
            visibility: visible;
          }

          .ui__icon__wrapper {
            width: 20px;
            height: 20px;

            .icon-pin {
              width: 20px;
              height: 20px;
            }
          }

          .d-flex {
            display: flex;
            width: 100%;

            .header_text {
              width: 70%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          .headerIcon {
            margin-right: 6px;

            .ui__icon__wrapper {
              .icon {
                background-color: #9da3b6;
              }
            }
          }

          :hover {
            background-color: #e6e8ec;
            color: #777e90;

            .ui__icon__wrapper {
              .icon {
                background-color: #777e90;
              }
            }
          }

          .sort {
            display: flex;
            margin-left: 10px;

            .up,
            .down {
              margin-left: auto;
              margin-right: auto;

              &.active {
                .icon {
                  background-color: #f4f5f6;
                }
              }
            }
          }

          .resizer {
            display: inline-block;
            width: 4px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(50%);
            z-index: 1;
            touch-action: none;
            cursor: url(${resize}) 14 5, auto !important;

            &.isResizing {
              background: #45b36b;
            }
          }

          &:last-child {
            border-right: 1px solid #e1e6ec;
          }
        }
      }
    }
  }
`;
const TableHead = ({
  t,
  sortFromView = () => {},
  hideOrShowColumn = () => {},
  pinOrUnpinColumn = () => {},
  headerGroups = [],
  isColumnMove = false,
  currentColOrder,
  flatColumns,
  setColumnOrder,
  isResizable,
  totalColumnsWidth,
  ...rest
}) => {
  return (
    <Styled className={"table-head"} style={{ width: totalColumnsWidth }}>
      {headerGroups.map((headerGroup) => (
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column) =>
            isColumnMove ? (
              <DragDropContext
                onDragStart={() => {
                  currentColOrder.current = flatColumns.map((o) => o.id);
                }}
                onDragUpdate={(dragUpdateObj, b) => {
                  const colOrder = [...currentColOrder.current];
                  const sIndex = dragUpdateObj.source.index;
                  const dIndex = dragUpdateObj.destination && dragUpdateObj.destination.index;

                  if (typeof sIndex === "number" && typeof dIndex === "number") {
                    colOrder.splice(sIndex, 1);
                    colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                    setColumnOrder(colOrder);
                  }
                }}
              >
                <Droppable droppableId="droppable" direction="horizontal">
                  {(droppableProvided, snapshot) => (
                    <div {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef} className="tr">
                      {headerGroup.headers.map((column, index) => (
                        <Draggable key={column.id} draggableId={column.id} index={index} isDragDisabled={!column.accessor}>
                          {(provided, snapshot) => {
                            return (
                              <div {...column.getHeaderProps()} className="th">
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  {column.render("Header")}
                                  {isResizable && (
                                    <div
                                      {...column.getResizerProps()}
                                      className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div {...column.getHeaderProps()} className="th">
                <ContextMenuTrigger id={get(column, "id")} HoldToDisplay={"-1"}>
                  <div className="d-flex">
                    <Icon size="sm" mainClassName="headerIcon" icon={`icon-${slugify(column.render("type"))}`} />
                    <div
                      className="header_text"
                      data-tip={column.render("Header")}
                      data-place={"bottom"}
                      data-effect={"solid"}
                      data-for={"foo"}
                    >
                      {column.render("Header")}
                    </div>
                    <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? "isResizing" : ""}`} />
                    {column.sortable && (
                      <Sort
                        className="sort"
                        number={column.sortingIndex}
                        sortFromView={sortFromView}
                        data-tip={"Sort"}
                        data-place={"top"}
                        data-effect={"solid"}
                        data-for={"foo"}
                        column={{
                          field: column.id,
                          direction: column.sortingDirection,
                          fieldType: column.type,
                          customField: column.customField,
                        }}
                      />
                    )}
                  </div>
                  {get(column, "pinned", false) && <Icon icon="icon-pin" color="#B1B5C3" />}
                </ContextMenuTrigger>
                <ContextMenu id={get(column, "id")}>
                  <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
                    <Icon icon="icon-move-start-arrow" color="#353945" />
                    {t("Move to start") ?? "Move to start"}
                  </MenuItem>
                  <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
                    <Icon icon="icon-move-end-arrow" color="#353945" />
                    {t("Move to end") ?? "Move to end"}
                  </MenuItem>
                  <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
                    <Icon icon="icon-insert-left" color="#353945" />
                    {t("Insert left") ?? "Insert left"}
                  </MenuItem>
                  <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
                    <Icon icon="icon-insert-right" color="#353945" />
                    {t("Insert right") ?? "Insert right"}
                  </MenuItem>
                  <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
                    <Icon icon="icon-autosize-arrow" color="#353945" />
                    {t("Autosize this column") ?? "Autosize this column"}
                  </MenuItem>
                  {get(column, "pinned", false) ? (
                    <MenuItem data={{ foo: "bar" }} onClick={() => pinOrUnpinColumn(get(column, "id"), false)}>
                      <Icon icon="icon-pin" color="#353945" />
                      {t("Pin column") ?? "Unpin column"}
                    </MenuItem>
                  ) : (
                    <MenuItem data={{ foo: "bar" }} onClick={() => pinOrUnpinColumn(get(column, "id"), true)}>
                      <Icon icon="icon-pin" color="#353945" />
                      {t("Pin column") ?? "Pin column"}
                    </MenuItem>
                  )}

                  <div className="menu__footer">
                    {!get(column, "root", false) && (
                      <MenuItem data={{ foo: "bar" }} onClick={() => hideOrShowColumn(get(column, "id"), false)}>
                        <Icon icon="icon-hide-eye" color="#353945" />
                        {t("Hide column") ?? "Hide column"}
                      </MenuItem>
                    )}
                  </div>
                </ContextMenu>
              </div>
            )
          )}
        </div>
      ))}
    </Styled>
  );
};

export default withTranslation("pdp")(memo(TableHead));
