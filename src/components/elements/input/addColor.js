import React, { useState } from "react";
import styled from "styled-components";
import ColorPicker from "../../../modules/academy/components/colorPicker";
import pick from "../../../assets/icons/picker-color.svg";
import Field from "../../../containers/Form/field";
import Icon from "../icon";

const Styled = styled.div`
  .form-input-container {
    border: none;
    background: none;
    padding: 10px;
    input {
      padding: 0;
    }
  }
  .styled-input {
    border: 1px solid #e6e8ec;
    display: flex;
    align-items: center;
    border-radius: 8px;
    height: 38px;
    background: #fafafb;
    margin-bottom: 14px;
    .choose-color-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 20px;
      .add-color {
        margin-bottom: 0;
        margin-right: 12px;
        color: #a36bdc;
        border-bottom: 1px dashed #a36bdc;
        font-size: 12px;
        font-weight: 600;
      }
    }
    .choose-color {
      height: 30px;
      width: 3px;
      display: flex;
      /* background-color: red; */
      border-radius: 25%;
      margin: 4px;
      background: ${({ color }) => (color ? color : "transparent")};
    }
    .colorPickerBackground {
      div[title="#F4F5F6"] {
        &:after {
          content: url("${pick}");
          width: 12px;
          height: 12px;
          position: absolute;
          top: -2px;
          left: 0;
        }
      }
    }
  }
`;
const AddColor = () => {
  const [color, setColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleChange = (color) => {
    setColor(`${color}`);
    setShowColorPicker(false);
  };
  const closeColorPicker = (className) => {
    const clasName = className.split(" ");
    if (className == "colorPickerBackground" || className == "modal") {
      setShowColorPicker(false);
    }
  };
  return (
    <Styled color={color}>
      {showColorPicker && (
        <div className="colorPickerBackground">
          <ColorPicker myColor={color} handleChange={handleChange} />
        </div>
      )}
      <div className="styled-input">
        {color.length > 0 && <span className="choose-color" />}
        <Field type={"input"} name={"name"} hideLabel hideError params={{ required: true }} />
        <div className="choose-color-wrap">
          <span onClick={() => setShowColorPicker(true)} className="add-color">
            Add color{" "}
          </span>
          <Icon color={color.length > 0 ? "#EF466F" : "#777E90"} onClick={() => setColor("")} icon="icon-recycle" />
        </div>
      </div>
    </Styled>
  );
};

export default AddColor;
