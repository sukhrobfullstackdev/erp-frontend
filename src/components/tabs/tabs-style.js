import styled from "styled-components";

export const TabsStyle = styled.div`
  .tabs {
    &__list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background: #fcfcfd;

      &__left,
      &__right {
        display: flex;
      }

      &__left {
      }

      &__right {
      }

      &__tab {
        font-weight: 600;
        font-size: 14px;
        /* line-height: 22px; */
        display: flex;
        align-items: center;
        text-align: center;
        color: #777e91;
        border-radius: 6px;
        padding: 8px 15px;
        transition: 0.2s;
        height: 38px;
        margin: 0 4px;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background: #f4f5f6;
        }

        &.active {
          background: #353945;
          color: #fcfcfd;
          font-weight: 500;
        }
      }
    }

    &__content {
      padding: 5px;
    }
  }
`;
