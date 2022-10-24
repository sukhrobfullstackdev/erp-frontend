import { memo, useState } from "react";
import { get } from "lodash";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Title from "../../../../../../components/elements/title";
import Button from "../../../../../../components/elements/button";
import DropDown from "../../../../../../components/elements/dropDown";
import Icon from "../../../../../../components/elements/icon";
import infoImg from "assets/icons/info.svg";
import NewCard from "../../../../../../components/newCard";

const LessonItem = ({
  groupTypeLessonItems,
  addPracticeOrExam,
  setState,
  deleteLesson,
  id,
  lessonIndex,
  addExam,
  moveLessonItemToLesson,
}) => {
  const [data, setData] = useState({
    showDropDown: true,
  });
  id = String(id);

  return (
    <div className="groupTypeLessonItemContainer" style={{ minHeight: `auto` }}>
      <Droppable droppableId={`${id}/${lessonIndex}`} type="lessonItem">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {groupTypeLessonItems?.map((item, index) => (
              <div key={id + index}>
                <Draggable index={index} draggableId={`${id}.${index}/${lessonIndex}`}>
                  {(provided, snapshot) => (
                    <div className={`groupTypeLessonItem ${snapshot.isDragging && "dragging"}`} {...provided.draggableProps}>
                      <div ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Icon icon={"icon-dots"} mainClassName={"dotsIcon"} />
                      </div>
                      <Title className="text">{get(item, "name", "")}</Title>
                      {groupTypeLessonItems?.length > 1 && (
                        <Icon
                          icon={"icon-add-doc"}
                          mainClassName={"addDoc"}
                          mainOnClick={() => moveLessonItemToLesson(get(item, "id", ""))}
                        />
                      )}
                      <div className="action">
                        {get(item, "coursePart") && (
                          <Button bg={get(item, "coursePart.colorCode")} color={"#fff"}>
                            {get(item, "coursePart.name")}
                          </Button>
                        )}

                        {get(item, "lessonType", "") === "EXAM" && (
                          <DropDown
                            className={"infoExam"}
                            button={<img src={infoImg} />}
                            active={data[item.id]}
                            onChange={(e) =>
                              setData((s) => ({
                                ...s,
                                [item.id]: e,
                              }))
                            }
                          >
                            <NewCard
                              hideSubmit
                              lessonId={id}
                              addPracticeOrExam={addPracticeOrExam}
                              show={() =>
                                setData((s) => ({
                                  ...s,
                                  [item.id]: false,
                                }))
                              }
                              modalFormAttributes={[
                                {
                                  title: "Test",
                                  name: "testCount",
                                  value: get(item, "testCount", ""),
                                },
                                {
                                  title: "Draging-Drop",
                                  name: "draggingDrop",
                                  value: get(item, "draggingDrop", ""),
                                },
                                {
                                  title: "Multi test",
                                  name: "multiTest",
                                  value: get(item, "multiTest", ""),
                                },
                                {
                                  title: "Input",
                                  name: "input",
                                  value: get(item, "input", ""),
                                },
                                {
                                  title: "Problem solving",
                                  name: "problemSolving",
                                  value: get(item, "problemSolving", ""),
                                },
                                {
                                  title: "Enter the answer to the question",
                                  name: "enterAnswer",
                                  value: get(item, "enterAnswer", ""),
                                },
                              ]}
                            />
                          </DropDown>
                        )}

                        <DropDown
                          active={data[index]}
                          onChange={(v) => setData((s) => ({ ...s, [index]: v }))}
                          button={<Icon icon="icon-triple-dots" />}
                        >
                          <div className="option" onClick={() => addExam(lessonIndex)}>
                            Add Exam
                          </div>
                          <div
                            className="option"
                            onClick={() => {
                              setData((s) => ({ ...s, [index]: false }));
                              addPracticeOrExam({
                                attributes: {
                                  type: "PRACTICE",
                                },
                                lessonId: id,
                                currentIndex: lessonIndex,
                              });
                            }}
                          >
                            Add Practice
                          </div>
                        </DropDown>
                        <Icon onClick={() => deleteLesson(get(item, "id"), id)} icon="icon-exit" />
                      </div>
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(LessonItem);
