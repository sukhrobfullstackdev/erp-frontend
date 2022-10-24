import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const ModalStyled = styled.div`
  ${({ className }) =>
    className === "modal" &&
    css`
      width: 0vw;
      height: 0vh;
      background: rgba(53, 57, 69, 0.2);
      z-index: -1000;
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 20ms;
      border-radius: 50%;
      //transform: translateY(120vh);
      .modal {
        &__body {
          min-width: 50px;
          background: #ffffff;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          box-shadow: 0px 40px 32px rgba(15, 15, 15, 0.12);
          border-radius: 8px;
          /* padding: 24px; */
          transition: 0.3s;
          transform: scale(0);
          min-height: 15vh;
        }
      }
      ${({ width }) =>
        width &&
        css`
          .modal {
            &__body {
              width: ${width}px;
            }
          }
        `}
      ${({ isActive }) =>
        isActive &&
        css`
          width: 100%;
          height: 100%;
          top: 0%;
          left: 0%;
          border-radius: 0%;
          transition: 0.2s;
          /* transform: translateY(0); */
          .modal {
            &__body {
              transform: scale(1);
            }
          }
          z-index: 1000;
        `}
    `}
`;

export default function AboutUser({ children, classNames = [], active = false, onClose = () => {}, ...props }) {
  let reff = useRef(null);
  return (
    <ModalStyled className="modal" onClick={() => onClose()} isActive={active} ref={reff} {...props}>
      <div className="modal__body">{children}</div>
    </ModalStyled>
  );
}
