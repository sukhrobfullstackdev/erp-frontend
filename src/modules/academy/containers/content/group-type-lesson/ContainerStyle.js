import styled, { css } from "styled-components";

const ContainerStyle = styled.div`
  .tabs {
    &__list {
      background-color: #fff;
      margin-bottom: 20px;
      /* position: sticky;
      top: 0;
      z-index: 2; */
      &__tab {
        position: relative;
        margin-right: 10px;
        min-width: 90px;
        display: flex;
        justify-content: center;
        .lessonsCount {
          min-width: 20px;
          height: 18px;
          font-size: 12px;
          padding: 0 3px;
          background: var(--green-back);
          position: absolute;
          top: -6px;
          right: -6px;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--white);
        }
        .exit {
          position: absolute;
          top: -6px;
          left: -6px;
          border-radius: 50%;

          background: var(--dark--danger);
          animation: hideAnim 0.2s forwards;
          .ui__icon__wrapper {
            &.md {
              width: 20px;
              height: 20px;
              .icon {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
        &:hover {
          .exit {
            animation: showAnim 0.2s forwards;
          }
        }
      }
    }
  }

  button {
    border-radius: 8px;
  }
  .modal__body {
    .form-label {
      margin-bottom: 6px;
    }
    .select {
      &__header {
        height: 38px;
        border-radius: 6px;
      }
    }
    .cancelBtn {
      margin-right: 10px;
    }
    .cancelBtn,
    .addBtn {
      button {
        border-radius: 6px;
        font-style: normal;
        font-size: 12px;
        line-height: 18px;
        min-width: 63px;
      }
    }
  }
  .deleteModal {
    .modal__body {
      padding: 0;
      border: none;
      border-radius: 12px;
    }
  }

  /* ${({ isSticky }) =>
    isSticky &&
    css`
      .tabs {
        &__content {
          height: 0;
          overflow: hidden;
          padding: 0;
        }
      }
      .tab-container {
        position: sticky;
        top: 0;
        z-index: 2;
        padding: 30px 0 20px;
      }
    `} */
`;

export default ContainerStyle;
