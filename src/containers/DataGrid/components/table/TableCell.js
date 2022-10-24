import React, { memo, Profiler } from "react";
import styled, { css } from "styled-components";
import InputCell from "./cells/input-cell";
import CheckboxCell from "./cells/checkbox-cell";
import { useRouteMatch } from "react-router-dom";
import EmailCell from "./cells/email-cell";
import MoneyCell from "./cells/money-cell";
import RatingCell from "./cells/rating-cell";
import { get } from "lodash";
import NumberCell from "./cells/number-cell";
import LongText from "./cells/long-text-cell";
import DateCell from "./cells/date-cell";
import DropdownCell from "./cells/dropdown-cell";
import PhoneNumberCell from "./cells/phone-number-cell";
import FileCell from "./cells/file-cell";
import AssignCell from "./cells/assign-cell";
import TreeCell from "./cells/tree-cell";
import SpecialLabelCell from "./cells/special-label-cell";
import PriorityCell from "./cells/priority-cell";
import TImeCell from "./cells/time-cell";
import HasMessageCell from "./cells/hasMessage-cell";
import CommentCell from "./cells/comment-cell";
import CallTypeCell from "./cells/callType-cell";
import CallStatusCell from "./cells/callStatus-cell";

const StyledTableCell = styled.div`
  width: 100%;
  height: 100%;
  //padding: 6px 12px;
  padding: 0;
`;
const TableCell = ({
  value: initialValue,
  row: { index, original: { id: rowId } = {} },
  column: { id, editable, type, customField },
  updateItemRequest = () => "",
  setLoading = () => {},
  rowSize,
  ...rest
}) => {
  const match = useRouteMatch();
  const viewId = match.params.id;

  function onRenderCallback(
    id, // проп "id" из дерева компонента Profiler, для которого было зафиксировано изменение
    phase, // либо "mount" (если дерево было смонтировано), либо "update" (если дерево было повторно отрендерено)
    actualDuration, // время, затраченное на рендер зафиксированного обновления
    baseDuration, // предполагаемое время рендера всего поддерева без кеширования
    startTime, // когда React начал рендерить это обновление
    commitTime, // когда React зафиксировал это обновление
    interactions // Множество «взаимодействий» для данного обновления
  ) {
    // Обработка или логирование результатов...
    console.log(actualDuration);
  }

  return (
    <StyledTableCell type={type}>
      {((type) => {
        switch (type) {
          case "DATE":
            return (
              // <Profiler onRender={onRenderCallback} id="Navigation">
              <DateCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
              // </Profiler>
            );
          case "MONEY":
            return (
              <MoneyCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "NUMBER":
            return (
              <NumberCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "RATING":
            return (
              <RatingCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "DROPDOWN":
          case "ENUM_DROPDOWN":
            return (
              <DropdownCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "LABELS":
            return (
              <DropdownCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
                isMulti
              />
            );
          case "SHORT_TEXT":
            return (
              <InputCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "LONG_TEXT":
            return (
              <LongText
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "PHONE":
            return (
              <PhoneNumberCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "EMAIL":
            return (
              <EmailCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "FILES":
            return (
              <FileCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                  customField,
                }}
              />
            );
          case "CHECKBOX":
            return (
              <CheckboxCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "SPECIAL_LABEL":
            return (
              <SpecialLabelCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                  match,
                }}
              />
            );
          case "CALL_TYPE":
            return (
              <CallTypeCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "CALL_STATUS":
            return (
              <CallStatusCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "TIME":
            return (
              <TImeCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
          case "PRIORITY":
            return (
              <PriorityCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "TREE":
            return (
              <TreeCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                }}
              />
            );
          case "ASSIGN_LABEL":
            return (
              <AssignCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                  rowSize,
                }}
              />
            );
          case "HAS_MESSAGE":
            return (
              <HasMessageCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                  rowSize,
                }}
              />
            );
          case "COMMENTS":
            return (
              <CommentCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                  typeConfig: get(rest, "cell.column.typeConfig"),
                  rowSize,
                }}
              />
            );
          default:
            return (
              <InputCell
                {...{
                  initialValue,
                  id,
                  editable,
                  rowId,
                  index,
                  updateItemRequest,
                  setLoading,
                  viewId,
                }}
              />
            );
        }
      })(type)}
    </StyledTableCell>
  );
};

export default memo(TableCell);
