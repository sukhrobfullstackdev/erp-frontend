import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { get, isEmpty } from "lodash";
import Icon from "components/elements/icon";
import Modal from "components/elements/modal";
import Title from "components/elements/title";
import NewCard from "components/newCard/newCard";
import { Container, DragableContainer, Style } from "./drop-style";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LessonItem from "./lessonItem";

const modalFormAttributes = [
  {
    title: "Test",
    name: "testCount",
  },
  {
    title: "Draging-Drop",
    name: "draggingDrop",
  },
  {
    title: "Multi test",
    name: "multiTest",
  },
  {
    title: "Input",
    name: "input",
  },
  {
    title: "Problem solving",
    name: "problemSolving",
  },
  {
    title: "Enter the answer to the question",
    name: "enterAnswer",
  },
];

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const Dropbox = ({
  item,
  deleteLesson = () => "",
  addPracticeOrExam = () => "",
  changeOrder = () => "",
  moveLessonItemToLesson = () => "",
}) => {
  const [state, setState] = useState({
    modal: false,
    item,
    currentIndex: null,
  });

  useEffect(() => {
    setState((s) => ({ ...s, item }));
  }, [item]);

  const addExam = useCallback((index) => {
    setState((s) => ({ ...s, modal: true, currentIndex: index }));
  }, []);

  const onDragEnd = (result) => {
    if (result.type === "lesson") {
      if (get(result, "destination.index") !== get(result, "source.index")) {
        let lessonId = get(state, `item.groupTypeLessons[${get(result, "source.index")}].id`);

        // Surgan Lesson ni o'chirib, o'chirgan qiymatni olayapman
        let [res] = state.item.groupTypeLessons.splice(get(result, "source.index"), 1);

        // o'chilgan qilymatni boshqa joyga qo'shayapman.
        state.item.groupTypeLessons.splice(get(result, "destination.index"), 0, res);

        const newPosition = {
          groupTypeLessonId: lessonId,
          // groupTypeLessonItemId: result.draggableId,
          groupTypeLessonItemId: null,
          top:
            result.destination.index === 0
              ? null
              : get(state, `item.groupTypeLessons[${get(result, "destination.index") - 1}].orderIndex`, null),
          bottom:
            get(state, "item.groupTypeLessons", []).length === result.destination.index + 1
              ? null
              : get(state, `item.groupTypeLessons[${get(result, "destination.index") + 1}].orderIndex`, null),
        };
        changeOrder([], newPosition);
        setState((s) => ({ ...s, item: state.item }));
      }
    } else if (result.type === "lessonItem") {
      if (result.destination?.droppableId === result.source?.droppableId) {
        let lessonId = get(state, `item.groupTypeLessons[${get(result, "source.index")}].id`);
        let [id, index] = result.draggableId.split("/");
        let [res] = state.item.groupTypeLessons[index].groupTypeLessonItems.splice(get(result, "source.index"), 1);
        state.item.groupTypeLessons[index].groupTypeLessonItems.splice(get(result, "destination.index"), 0, res);
        const newPosition = {
          // groupTypeLessonId: lessonId,
          groupTypeLessonItemId: get(res, "id"),
          top: result.destination.index === 0 ? null : result.destination.index - 1,
          bottom:
            get(state, `item.groupTypeLessons[${index}].groupTypeLessonItems`, []).length === result.destination.index + 1
              ? null
              : result.destination.index + 1,
        };

        changeOrder([], newPosition);
        setState((s) => ({ ...s, item: state.item }));
      } else {
        // droppableId ni ichida id va index keladi. split bilan index ni olamiz.
        let [, firstIndex] = result.source.droppableId.split("/");
        let [, secondIndex] = result.destination.droppableId.split("/");
        let lessonId = get(state, `item.groupTypeLessons[${secondIndex}].id`);
        // LessonItem ni ichidan item ni o'chiirb tashlaymiz.
        let [res] = state.item.groupTypeLessons[firstIndex].groupTypeLessonItems.splice(get(result, "source.index"), 1);
        // O'chirilgan LessonItem ni boshqa LessonItem ga qo'shamiz
        state.item.groupTypeLessons[secondIndex].groupTypeLessonItems.splice(get(result, "destination.index"), 0, res);

        let secondLesson = get(state, `item.groupTypeLessons[${secondIndex}].groupTypeLessonItems`, []);

        // agar LessonItem qolmagan bo'lsa Lesson ni o'chirib tashlaymiz.
        if (isEmpty(state.item.groupTypeLessons[firstIndex].groupTypeLessonItems))
          state.item.groupTypeLessons.splice(firstIndex, 1);

        const newPosition = {
          groupTypeLessonId: lessonId,
          groupTypeLessonItemId: get(res, "id"),
          top:
            result.destination.index === 0 ? null : get(secondLesson, `${get(result, "destination.index") - 1}.orderIndex`, null),
          bottom: secondLesson.length === result.destination.index + 1 ? null : result.destination.index + 1,
        };
        changeOrder([], newPosition, "move");
        setState((s) => ({ ...s, item: state.item }));
      }
    }
  };

  return (
    <Style>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="lesson">
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classNames("dropbox", {
                empty: isEmpty(get(state, "item.groupTypeLessons", [])),
              })}
            >
              {isEmpty(get(state, "item.groupTypeLessons", [])) ? (
                <span className={"empty__text"}>ADD TOPIC</span>
              ) : (
                get(state, "item.groupTypeLessons", []).map((value, index) => (
                  <Draggable index={index} key={String(value.id)} draggableId={String(value.id)}>
                    {(provided, snapshot) => (
                      <DragableContainer
                        {...provided.draggableProps}
                        className={`lesson__item__container ${snapshot.isDragging && "dragging"}`}
                        lessonItemCount={get(value, "groupTypeLessonItems", []).length}
                      >
                        <div className={`lesson__item ${snapshot.isDragging && "dragging"}`}>
                          <div ref={provided.innerRef} {...provided.dragHandleProps}>
                            <Icon icon={"icon-dots"} mainClassName={"dotsIcon"} />
                          </div>

                          <Title className="number">{index + 1}</Title>
                          <LessonItem
                            {...{
                              groupTypeLessonItems: get(value, "groupTypeLessonItems", []),
                              id: get(value, "id", ""),
                              addPracticeOrExam,
                              setState,
                              deleteLesson,
                              lessonIndex: index,
                              addExam,
                              moveLessonItemToLesson,
                            }}
                          />
                        </div>
                      </DragableContainer>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
              <Modal active={state.modal}>
                <NewCard
                  currentIndex={state.currentIndex}
                  lessonId={get(state, "item.id")}
                  addPracticeOrExam={addPracticeOrExam}
                  modalFormAttributes={modalFormAttributes}
                  modalActive={state.modal}
                  show={() =>
                    setState((s) => ({
                      ...s,
                      modal: false,
                    }))
                  }
                />
              </Modal>
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </Style>
  );
};

export default Dropbox;
