import { TabsStyle } from "./tabs-style";
import { get, isArray, isEmpty, isNull } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Tabs = ({
  className,
  leftList = ["SUMMARY", "CALLS HISTORY", "MESSAGE", "TASKS", "ACTION HISTORY", "ACADEMIC PROFILE", "INVOICE"],
  rightList = ["ADMISSIONS", "GROUPS", "PDP INFO", "COURSE", "EXAM", "EVENTS", "FAQ"],
  leftContent = ["left 1", "left 2", "left 3", "left 4", "left 5", "left 6", "left 7"],
  rightContent = ["right 1", "right 2", "right 3", "right 4", "right 5", "right 6", "right 7"],
  leftListChild = "",
  rightListChild = "",
  tabsListChild = "",
  disabledLeft = false,
  disabledRight = false,
  setActiveTab = () => {},
  onChange = () => "",
  index = 0,
  dataList = "left",
  canChange = true,
  drag = false,
  changeOrder = () => {},
  afterLeftList,
}) => {
  const [active, setActive] = useState({
    value: dataList === "left" ? leftList[index] : rightList[index],
    index,
    dataList,
    leftList,
  });

  useEffect(() => {
    onChange(active.value);
    if (isEmpty(active))
      setActive({
        value: dataList === "left" ? leftList[index] : rightList[index],
        index,
        dataList,
      });
  }, [active.value]);

  useEffect(() => {
    setActive({
      value: dataList === "left" ? leftList[index] : rightList[index],
      index,
      dataList,
    });
  }, [index]);

  useEffect(() => {
    !isEmpty(leftList) && setActive((s) => ({ ...s, leftList }));
  }, [leftList]);

  const clickHandling = (e, ind, dataList) => {
    !isNull(index) &&
      canChange &&
      setActive((s) => ({
        ...s,
        value: e.target.innerText,
        index: ind,
        dataList: dataList,
      }));

    !isNull(index) && canChange && setActiveTab(ind);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (get(result, "destination.index") !== get(result, "source.index")) {
      let [res] = active.leftList.splice(get(result, "source.index"), 1);
      active.leftList.splice(get(result, "destination.index"), 0, res);

      const newPosition = {
        top: result.destination.index === 0 ? null : result.destination.index - 1,
        bottom: get(active, "leftList", []).length === result.destination.index + 1 ? null : result.destination.index + 1,
        index: get(result, "source.index"),
        id: get(res, "id"),
      };
      changeOrder(active.leftList, newPosition);
      setActive({ ...active });
    }
  };

  if (drag) {
    return (
      <TabsStyle className={`tabs ${className}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-tabs" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="tabs__list">
                <div className="tabs__list__left">
                  {isArray(leftList) &&
                    active.leftList.map((val, ind) => (
                      <Draggable key={ind.toString()} draggableId={ind.toString()} index={ind}>
                        {(provided) => (
                          <div
                            data-index={ind}
                            data-list="left"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={(e) => !disabledLeft && clickHandling(e, ind, "left")}
                            className={`tabs__list__tab ${active.index == ind && active.dataList === "left" ? "active" : ""}`}
                          >
                            {get(val, "name", "")}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
                {tabsListChild}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="tabs__content">{active.dataList === "left" ? leftContent[active.index] : rightContent[active.index]}</div>
      </TabsStyle>
    );
  }

  return (
    <TabsStyle className={`tabs ${className}`}>
      <div className="tabs__list">
        <div className="tabs__list__left">
          {isArray(leftList) &&
            leftList.map((val, ind) => (
              <div
                key={ind}
                data-index={ind}
                data-list="left"
                className={`tabs__list__tab ${active.index == ind && active.dataList === "left" ? "active" : ""}`}
                onClick={(e) => !disabledLeft && clickHandling(e, ind, "left")}
              >
                {val}
              </div>
            ))}
          {leftListChild}
        </div>
        {afterLeftList}
        <div className="tabs__list__right">
          {isArray(rightList) &&
            rightList.map((val, ind) => (
              <div
                key={ind}
                data-index={ind}
                data-list="right"
                className={`tabs__list__tab ${active.index == ind && active.dataList === "right" ? "active" : ""}`}
                onClick={(e) => !disabledRight && clickHandling(e, ind, "right")}
              >
                {val}
              </div>
            ))}
          {rightListChild}
        </div>
        {tabsListChild}
      </div>
      <div className="tabs__content">{active.dataList === "left" ? leftContent[active.index] : rightContent[active.index]}</div>
    </TabsStyle>
  );
};
export default memo(Tabs);
