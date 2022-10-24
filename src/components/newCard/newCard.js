import React, { useEffect, useState } from "react";
import { NewCardStyle } from "./newCardStyle";
import Button from "../elements/button";
import { get, isArray } from "lodash";
import Title from "../elements/title";
import FormDemo from "../../containers/Form/form-demo";
import Field from "../../containers/Form/field";

const NewCard = ({
  modalFormAttributes = [
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
  ],
  show = () => {},
  addPracticeOrExam = () => {},
  lessonId = null,
  currentIndex = 0,
  hideSubmit = false,
  modalActive = false,
}) => {
  const [total, setTotal] = useState(0);
  const getValueFromField = (data, name) => {
    setTotal((total) => (data ? parseInt(total) + parseInt(data) : total));
  };

  useEffect(() => {
    if (!modalActive) setTotal(0);
  }, [modalActive]);

  let temp = { resetData: {} };
  if (!modalActive) {
    modalFormAttributes.forEach((item) => {
      temp.resetData[get(item, "name")] = "";
    });
  }
  return (
    <>
      <NewCardStyle>
        <FormDemo
          {...temp}
          getValueFromField={getValueFromField}
          formRequest={(data) => {
            addPracticeOrExam({
              attributes: { ...get(data, "data"), type: "EXAM" },
              lessonId,
              currentIndex,
            });
            show();
          }}
        >
          <div className="card__Container">
            <Title className="title">ADD EXAM</Title>
            {isArray(modalFormAttributes) &&
              modalFormAttributes.map((data, index) => (
                <div className="card__row mb-30" key={index}>
                  <span className="text__name">{get(data, "title")}</span>
                  <Field
                    hideLabel
                    type={"input"}
                    name={get(data, "name")}
                    defaultValue={get(data, "value", "")}
                    property={{ type: "number" }}
                    className="card__inp"
                  />
                </div>
              ))}
          </div>
          <div className="card__footer">
            <span className="card__footer_text">Total number of questions: {total}</span>
            <span className="card__footer_button">
              <Button className="card__footer_button_sty" onCLick={() => show()} outlineDanger>
                Cancel
              </Button>
              {!hideSubmit && (
                <Button type={"submit"} success>
                  Save
                </Button>
              )}
            </span>
          </div>
        </FormDemo>
      </NewCardStyle>
    </>
  );
};
export default NewCard;
