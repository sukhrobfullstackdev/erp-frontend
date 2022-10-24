import React, { memo, useEffect, useState } from "react";
import Dropdown from "../../dropDown";
import Icon from "../../icon";
import styled, { css } from "styled-components";
import { get } from "lodash";
import ColorPicker from "../../colorPicker/colorPicker";
import OutsideClickHandler from "react-outside-click-handler";

const DropDownStyle = styled.div`
  .drop-down-dots {
    ${({ color = "rgba(69, 178, 107, 0.1)" }) =>
      color &&
      css`
        background: ${color};
        height: 100%;
        display: flex;
        align-items: center;
        border-radius: 5px 0 0 5px;
        opacity: 0.8;

        .ui__icon__wrapper {
          .icon {
            background-color: #fcfcfd;
          }
        }

        &:hover {
          opacity: 0.9 !important;
        }
      `}
  }
  .dropDown {
    &.isFixed {
      .dropDown__body {
        right: -20px;
        left: auto;
        top: auto;
        overflow: unset;
        width: 150px;
      }
    }
  }
`;

const CustomActionDropDownn = ({
  action,
  color,
  clickDelete,
  clickRename,
  clickChangeColor,
  optionsIndex,
  selectedIndex,
  isMulti,
  isFixed = false,
  options,
  value,
  label,
}) => {
  // const [clientXY, setClientXY] = useState({});
  const [state, setState] = useState({
    showColorPicker: false,
  });

  const colorSelectHandling = (color) => {
    clickChangeColor({ optionsIndex, selectedIndex, color });
  };

  return (
    <DropDownStyle color={color}>
      <Dropdown
        isFixed={isFixed}
        getXandY={(e) => ""}
        button={
          <div onClick={(e) => ""} className="drop-down-dots">
            <Icon icon="icon-more-dots" mainClassName="notClose" color="#353945" />
          </div>
        }
      >
        {action.delete && (
          <div className="dropdown__option" onClick={() => clickDelete({ optionsIndex, selectedIndex, options })}>
            <Icon icon="icon-recycle" color="#EF466F" mainClassName="notClose" /> Delete
          </div>
        )}

        {action.edit && (
          <div className="dropdown__option" onClick={() => clickRename({ optionsIndex, selectedIndex, options })}>
            <Icon icon="icon-edit" color="#777E90" mainClassName="notClose" /> Rename
          </div>
        )}

        {action.edit && isMulti && (
          <div className="dropdown__option" onClick={() => setState((s) => ({ showColorPicker: true }))}>
            <Icon icon="icon-change-color" color="#777E90" mainClassName="notClose" /> Change color
          </div>
        )}
        {get(action, "items", []).map((Item, index) => (
          <Item
            key={index + Math.floor(Math.random() * 999999)}
            options={options}
            optionsIndex={optionsIndex}
            {...{ value, label }}
          />
        ))}
      </Dropdown>

      <OutsideClickHandler onOutsideClick={() => state.showColorPicker && setState((s) => ({ showColorPicker: false }))}>
        {state.showColorPicker && (
          <ColorPicker
            handleChange={colorSelectHandling}
            colorPicker={state.showColorPicker}
            setColorPicker={(e) => setState((s) => ({ showColorPicker: e }))}
          />
        )}
      </OutsideClickHandler>
    </DropDownStyle>
  );
};

export default memo(CustomActionDropDownn);
