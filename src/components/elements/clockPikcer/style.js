import styled, { css } from "styled-components";

export const Style = styled.div`
  position: relative;
  .clockPicker {
    &__header {
      background: #fcfcfd;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      border-radius: 6px;
      width: 100%;
      height: 40px;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      padding: 8px;
      position: relative;
      &__content {
        color: #353945;
      }
      &__placeholder {
        color: #b1b5c4;
      }
      &__icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    }
    &__body {
      width: 100px;
      min-width: 50px;
      z-index: 20;
      background: #ffffff;
      border: 1px solid #e6e8ec;
      box-sizing: border-box;
      box-shadow: 0px 8px 16px rgba(145, 158, 171, 0.24);
      border-radius: 8px;
      padding: 10px 0;
      ${({ defaultHideAnimation }) => (defaultHideAnimation ? "animation: hideAnim 0.15s forwards;" : "transform: scale(0);")}
      position: absolute;
      left: 0;
      ${({ position }) =>
        position?.bottom + 300 > window.innerHeight && window.innerHeight - position?.bottom < position?.top
          ? css`
              bottom: 50px;
            `
          : css`
              top: 50px;
            `}
    }
  }

  ${({ active }) =>
    active &&
    css`
      .clockPicker {
        &__body {
          animation: showAnim 0.15s forwards;
        }
      }
    `}
`;
