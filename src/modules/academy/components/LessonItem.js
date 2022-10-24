import React, { useState } from "react";
import styled from "styled-components";
import { get, hasIn, isNil } from "lodash";
import Title from "../../../components/elements/title";
import Button from "../../../components/elements/button";
import Icon from "../../../components/elements/icon";
import DropDown from "../../../components/elements/dropDown";
import Modal from "../../../components/elements/modal";
import NewCard from "../../../components/newCard/newCard";
import DragAndDrop from "../../../components/darg-and-drop/drag-and-drop";

const StyledItem = styled.div`
  background-color: #fcfcfd;
  width: 100%;
  min-height: 50px;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 14px 18px;

  .lesson__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info {
    display: flex;
    align-items: center;

    .number {
      font-size: 14px;
      font-weight: 500;
      position: relative;
      line-height: 21px;
      margin-right: 29px;

      ::after {
        content: " ";
        min-height: 22px;
        width: 1px;
        position: absolute;
        right: -10px;
        top: 0;
        background-color: #e6e8ec;
      }
    }

    .text {
      font-size: 18px;
      font-weight: 400;
      line-height: 27px;
    }
  }

  .action {
    height: 100%;
    padding-left: 8px;
    border-left: 1px solid #f4f5f6;
    display: flex;
    align-items: center;

    button {
      width: 108px;
      height: 34px;
      font-size: 12px;
      font-weight: 500;
      padding: 0;
      border-radius: 6px;
    }

    .purple {
      button {
        background-color: #9757d7;
        color: #fcfcfd;

        :hover {
          background-color: #8040d0;
        }
      }
    }

    .ui__icon__wrapper {
      transform-origin: center;
      transform: rotate(90deg);
      margin-left: 16px;

      .icon {
        background-color: #323232;
      }
    }

    .dropDown__body {
      width: 150px;
      border: 1px solid #e6e8ec;
      border-radius: 6px;
      box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);

      .option {
        height: 38px;
        width: 100%;
        padding: 10px;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        transition: 0.5s ease;
        color: #353945;
        cursor: pointer;

        :hover {
          background-color: #f4f5f6;
        }
      }
    }
  }

  .modal__body {
    padding: 0;
    border-radius: 12px;
  }
`;

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

const LessonItem = ({
  item = {},
  index = 0,
  canAdd = true,
  addLesson = () => {},
  options = [],
  deleteLesson = () => {},
  addPracticeOrExam = () => {},
}) => {
  const [modal, setModal] = useState(false);
  const ItemBody = ({ item, lessonId, itemIndex }) => (
    <div className={"lesson__item"}>
      <div className="info">
        <Title className="number">{index + 1}</Title>
        <Title className="text">{get(item, "name")}</Title>
      </div>
      <div className="action">
        {options && (
          <>
            {get(item, "coursePart") && (
              <Button bg={get(item, "coursePart.colorCode")} color={"#fff"}>
                {get(item, "coursePart.name")}
              </Button>
            )}
            <DropDown button={<Icon icon="icon-triple-dots" />}>
              <div className="option" onClick={() => setModal(true)}>
                Add Exam
              </div>
              <div
                className="option"
                onClick={() =>
                  addPracticeOrExam({
                    attributes: { type: "PRACTICE" },
                    lessonId,
                  })
                }
              >
                Add Practice
              </div>
            </DropDown>
            <Icon onClick={() => deleteLesson(get(item, "id"), lessonId)} icon="icon-exit" />
          </>
        )}
      </div>
    </div>
  );
  return (
    <StyledItem>
      {hasIn(item, "groupTypeLessonItems") ? (
        <DragAndDrop data={get(item, "groupTypeLessonItems", [])} lessonId={get(item, "id")} ItemBody={ItemBody} />
      ) : (
        <div className={"lesson__item"}>
          <div className="info">
            <Title className="number">{index + 1}</Title>
            <Title className="text">{get(item, "name")}</Title>
            {get(item, "tabName") && (
              <Button className={"ml-8"} color={"#fff"} bg={"#000"}>
                {get(item, "tabName")}
              </Button>
            )}
          </div>
          <div className="action">
            {canAdd && (
              <Button success disabled={!isNil(get(item, "tabName"))} onCLick={() => addLesson(item, index)}>
                Add Timetable
              </Button>
            )}
          </div>
        </div>
      )}
      <Modal active={modal} onClose={() => setModal(false)}>
        <NewCard
          lessonId={get(item, "id")}
          addPracticeOrExam={addPracticeOrExam}
          modalFormAttributes={modalFormAttributes}
          show={() => setModal(false)}
        />
      </Modal>
    </StyledItem>
  );
};

export default LessonItem;
