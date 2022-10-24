import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Dropdown from "components/elements/dropDown/dropdown";
import Icon from "components/elements/icon";
import ColorPicker from "components/elements/colorPicker/colorPicker";

const Style = styled.div`
  background: #ffffff;
  width: 300px;
  min-width: 300px;
  border: 1px solid #e6e8ec;
  border-radius: 8px;
  padding: 8px 15px 8px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  .title {
    display: block;
    font-weight: 500;
    color: #353945;
    font-size: 14px;
    flex: 1;
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    line-height: 34px;
  }

  .color {
    width: 4px;
    min-width: 4px;
    height: 44px;
    border-radius: 2px;
    background: ${(props) => props.color || "#E6E8EC"};
  }
  .dropdown__menu {
    min-width: 150px;
    padding: 8px;

    .dropdown__menu__item {
      cursor: pointer;
      padding: 8px 0;
      font-size: 14px;
      display: flex;
      color: #777e91;
      gap: 12px;
      align-items: center;

      &.edit,
      &.edit .menu_item_icon {
        opacity: ${(props) => (props.canEdit ? 1 : 0.5)};
        cursor: ${(props) => (props.canEdit ? "pointer" : "default")};
      }

      &.delete,
      &.delete .menu_item_icon {
        opacity: ${(props) => (props.canDelete ? 1 : 0.5)};
        cursor: ${(props) => (props.canDelete ? "pointer" : "default")} !important;
      }
    }
  }

  .action_buttons {
    display: flex;
    align-items: center;
    gap: 10px;

    .action__btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;

      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      background: #e2f5e9;
      display: flex;
      align-items: center;
      justify-content: center;

      .ui__icon__wrapper.md .icon-check2 {
        width: 14px;
        height: 14px;
      }

      &.exit {
        background-color: #fff1f5;
      }
    }
  }

  .color_buttons {
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;

    .action__btn {
      color: #fff;
      padding: 5px 12px;
      font-size: 14px;
      background: #45b36b;
      border-radius: 4.98462px;

      &.cencel {
        background: #f4f5f6;
        color: #777e91;
      }
    }
  }
`;

const InvoiceHeaderCard = ({
  colorCode = "#E6E8EC",
  id,
  name = "",
  canEdit = false,
  canDelete = false,
  placeholder = "STATUS NAME",
  editStatus = () => {},
  remove = {
    deleteModal: () => {},
    deleteFunction: () => {},
  },
}) => {
  const [colorPicker, setColorPicker] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(name || "");
  const [color, setColor] = useState(colorCode);
  const InputRef = useRef(null);

  const edited = useCallback(() => {
    setIsEdit(true);
    InputRef.current.focus();
  }, [InputRef, setIsEdit]);

  const clickCancel = useCallback(() => {
    setIsEdit(false);
    setValue(name);
    setColor(colorCode);
  }, []);

  const clickSave = () => {
    setIsEdit(false);
    editStatus(id, { name: value, colorCode: color });
  };

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.keyCode === 13) {
        clickSave();
      }
    },
    [value, color, clickSave]
  );

  return (
    <Style color={color} canEdit={canEdit} canDelete={canDelete}>
      <span className="color" />
      <div>
        <input
          ref={InputRef}
          className="title"
          readOnly={!isEdit}
          placeholder={placeholder}
          onKeyUp={handleClick}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {isEdit && (
        <div className="action_buttons">
          <button className="action__btn" onClick={clickSave}>
            <Icon icon="icon-check2" color="#45B36B" />
          </button>

          <button className="action__btn" onClick={clickCancel}>
            <Icon icon="icon-exit" color="#EF466F" />
          </button>
        </div>
      )}

      <Dropdown
        onClose={() => {
          setColorPicker(false);
        }}
        button={<Icon icon={"icon-more-dots"} color={"#777E91"} mainClassName={"dotsIcon"} />}
      >
        <div className="dropdown__menu">
          {colorPicker ? (
            <>
              <ColorPicker handleChange={(color) => setColor(color)} />
              {color !== colorCode && (
                <div className="color_buttons">
                  <button className="action__btn cencel" onClick={clickCancel}>
                    Cencel
                  </button>

                  <button className="action__btn" onClick={clickSave}>
                    Save
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="dropdown__menu__item edit" onClick={() => canEdit && edited()}>
                <Icon icon="icon-edit" mainClassName="menu_item_icon" />
                Rename
              </div>
              <div className="dropdown__menu__item edit" onClick={() => canEdit && setColorPicker(true)}>
                <Icon icon="icon-change-color" mainClassName="menu_item_icon" />
                Change color
              </div>

              <div
                className="dropdown__menu__item delete"
                onClick={() => canDelete && remove.deleteModal({ id, name, deleteFunction: remove.deleteFunction })}
              >
                <Icon icon="icon-delete" color="#ff0000" mainClassName="menu_item_icon delete_icon" />
                Remove
              </div>
            </>
          )}
        </div>
      </Dropdown>
    </Style>
  );
};

export default InvoiceHeaderCard;
