import Icon from "components/elements/icon";
import React from "react";
import styled, { css } from "styled-components";

const Style = styled.div`
  min-width: 300px;
  width: 300px;
  border-radius: 12px;
  height: 180px;
  padding: 10px;
  padding: 15px;

  .config {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .config__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .config__icon {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      .icon {
        width: 15px;
        height: 15px;
      }
    }
    .title {
      font-weight: 500;
      font-size: 16px;
      margin: 0 8px;
      line-height: 16px;
      color: #ffffff;
      flex: 1;
    }
    .icon-delete {
      background: red;
      width: 40px;
    }
  }

  .config__body {
    margin-top: 15px;
    flex: 1;
    overflow: auto;
    .desc {
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
    }
  }

  .add_status_button {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fcfcfd;
    font-weight: 500;
    font-size: 16px;
    padding: 15px 20px;
    background: #4571b2;
    border-radius: 6px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    opacity: 0;
    visibility: collapse;
    transition: all 0.2s ease-in-out;

    .add_status_button_icon {
      font-size: 14px;
    }
  }

  ${({ active, colorCode }) =>
    active
      ? css`
          background: ${colorCode};
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          color: #fff;
        `
      : css`
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            .add_status_button {
              opacity: 1;
              visibility: visible;
            }
          }
        `}

  ${({ type }) =>
    type == "modal_item" &&
    css`
      .add_status_button {
        opacity: 1;
        visibility: visible;
        margin: 0 auto;
        margin-top: 20px;
      }
    `}
`;

const InvoiceStatusItem = ({
  id = null,
  config = null,
  icon,
  active,
  colorCode = "#4571b2",
  isEmpty = false,
  itemType = "",
  name = "",
  description = "",
  canAddConfig = true,
  remove = {
    deleteModal: () => {},
    deleteFunction: () => {},
  },
  addConfig = () => {},
  isHeadItem = false,
}) => {
  return (
    <Style colorCode={"#4571b2"} active={active} type={itemType}>
      {(active || isHeadItem) && (
        <div className="config">
          <div className="config__header">
            <div className="config__item">
              <Icon icon={`icon-${icon}`} color="#fff" />
            </div>
            <span className="title">{name}</span>
            {isHeadItem && (
              <Icon icon="icon-delete" onClick={() => remove.deleteModal({ id, name, deleteFunction: remove.deleteFunction })} />
            )}
          </div>
          <div className="config__body">
            <p className="desc">{description + itemType}</p>
            {itemType == "modal_item" && (
              <button className="add_status_button" onClick={() => addConfig(config)}>
                <Icon icon="icon-add-plus" mainClassName="add_status_button_icon" color="#fff" />
                Add config
              </button>
            )}
          </div>
        </div>
      )}

      {isEmpty && (
        <button disabled={!canAddConfig} className="add_status_button" onClick={() => canAddConfig && addConfig(id)}>
          <Icon icon="icon-add-plus" mainClassName="add_status_button_icon" color="#fff" />
          Add config
        </button>
      )}
    </Style>
  );
};

export default InvoiceStatusItem;
