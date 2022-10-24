import styled, { css } from "styled-components";

export const TabsStyles = styled.div`
  .tabs {
    overflow-x: auto;
    /* width */
    ::-webkit-scrollbar {
      width: 4px;
      height: 7px;
      border-radius: 12px;
      cursor: default;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      cursor: default;
      border-radius: 0 12px 12px 0;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(177, 181, 195, 0.8);
      border-radius: 12px;
      cursor: default;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(177, 181, 195, 1);
      border-radius: 12px;
      cursor: default;
    }
    &__tab-list {
      display: flex;
      list-style: none;
      background: #ffffff;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      border-radius: 14px;
      padding: 5px;
      width: fit-content;
    }
    &__tab {
      font-weight: 500;
      font-size: 10px;
      line-height: 15px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #777e91;
      padding: 10px 14px;
      border-radius: 12px;
      margin: 0 2px;
      text-transform: capitalize;
      cursor: pointer;
      transition: 0.2s;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #45b36b;
        background: rgba(69, 179, 107, 0.2);
      }
      &--selected {
        font-weight: 600;
        color: #45b36b;
        background: rgba(69, 179, 107, 0.1);
      }
    }
    &__tab-panel {
      margin: 10px 0 0;
    }
    ${({ theme: { mode } }) =>
      mode == "dark" &&
      css`
        &__tab-list {
          background: #23262f;
          border: 1px solid #353945;
        }
        &__tab {
          color: #b1b5c4;
          &:hover {
            background: rgba(84, 189, 121, 0.25);
            color: #54bd79;
          }
          &--selected {
            background: rgba(84, 189, 121, 0.15);
            color: #54bd79;
          }
        }
      `}
  }
`;
