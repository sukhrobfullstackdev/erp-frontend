import React, { useState } from "react";
import { isEmpty } from "lodash";
import styled, { css } from "styled-components";
import Button from "../button/button";
import Icon from "../icon";
import Modal from "../modal";

const ImgStyled = styled.div`
  .imgContainer,
  .imgContainerInModal {
    position: relative;
    transition: 0.3s;
    border-radius: 8px;
    overflow: hidden;
    transition: 0.3s;
    &__options {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      z-index: 2;
      &__button {
        padding: 0;
        width: 50%;
        height: 100%;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: rgba(244, 245, 246, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 0px 0px 0px 0px;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          text-transform: uppercase;
          &:hover {
            color: #f53a68;
          }
        }
        &:first-child {
          button {
            border-radius: 0px 0px 0px 8px;
            border-right: 1px solid #b1b5c4;
            &:hover {
              color: #33d26a;
            }
          }
        }
      }
    }
    &__zoom {
      width: 42px;
      height: 42px;
      position: absolute;
      bottom: 15px;
      right: 15px;
      background: rgba(244, 245, 246, 0.1);
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      transform: translate(50px, 50px);
      z-index: 3;
      &__ui {
        width: 100% !important;
        height: 100% !important;
        .icon {
          width: 90% !important;
          height: 90% !important;
        }
      }
      &:hover {
        .icon {
          opacity: 0.7;
        }
      }
    }

    ${({ src }) =>
      src &&
      css`
        background-image: url(${src});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .imgContainerInModal {
          background-image: url(${src});
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      `}

    ${({ width, height }) => css`
      width: ${width ? width + "px" : "auto"};
      height: ${height ? height + "px" : "auto"};
    `}
  }

  .imgContainer {
    position: relative;
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      ${({ src }) =>
        src &&
        css`
          background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url(${src});
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        `}
      transition: 0.3s;
      opacity: 0;
    }
    &:hover {
      .imgContainer__zoom,
      .imgContainerInModal__zoom {
        transform: translate(0px, 0px);
      }
      &:after {
        opacity: 1;
      }
      ${({ src, isEditable }) =>
        src &&
        isEditable &&
        css`
          .imgContainer__zoom,
          .imgContainerInModal__zoom {
            transform: translate(50px, 50px);
          }
        `}
    }
  }
  ${({ src }) =>
    !src &&
    css`
      .imgContainer {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: #777e91;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #45b36b;
        background: #e2f5e9;
        box-sizing: border-box;
        div {
          font-weight: 500;
          font-size: 24px;
          line-height: 24px;
          color: #45b26b;
          margin-bottom: 12px;
        }
        &__defaultImg {
          width: 120px;
          height: 120px;
          margin-bottom: 23px !important;
          div {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }
        }
        &__options {
          display: none;
        }
      }
    `}

  ${({ isZoom }) =>
    isZoom &&
    css`
      .imgContainerInModal {
        width: 720px;
        height: 720px;
        border-radius: 6px;
        &__zoom {
          width: 30px;
          height: 30px;
          padding: 3px;
        }
      }
      @media (max-height: 635px) {
        .imgContainerInModal {
          width: 600px;
          height: 600px;
        }
      }
    `}
    .modal {
    background: rgba(53, 57, 69, 0.6);
  }
  .modal__body {
    padding: 0;
    border: none;
    overflow: hidden;
  }
`;

export default function Img({
  src,
  options = { zoom: true, edit: () => {}, del: () => {} },
  width = null,
  height = 325,
  isEditable = false,
  clickUpload = () => {},
  ...props
}) {
  const [isZoom, setIsZoom] = useState(false);
  return (
    <ImgStyled {...{ width, height, isZoom, src, isEditable }}>
      <div className="imgContainer">
        {!isEmpty(options) && (
          <div className="imgContainer__options">
            {options.edit && isEditable && (
              <Button xs="1" success="1" className="imgContainer__options__button" onClick={() => options.edit()}>
                Edit photo
              </Button>
            )}
            {options.del && isEditable && (
              <Button xs="1" danger="1" className="imgContainer__options__button" onClick={() => options.del()}>
                Delete
              </Button>
            )}
          </div>
        )}
        {src && options.zoom && (
          <Icon
            icon={"icon-magnifier"}
            color="white"
            mainClassName="imgContainer__zoom"
            className="imgContainer__zoom__ui"
            onClick={() => setIsZoom((state) => !state)}
          />
        )}
        {!src && (
          <>
            <Icon icon={"icon-upload2"} color="#45B36B" mainClassName="imgContainer__defaultImg" onClick={clickUpload} />
            <div>Upload image</div>
            image size 800x800
          </>
        )}
      </div>
      <Modal active={isZoom} onClose={() => setIsZoom((state) => !state)}>
        <div className="imgContainerInModal">
          {/* <Icon icon="icon-exit-full-screen" color="white" mainClassName='imgContainerInModal__zoom' className='imgContainer__zoom__ui' onClick={() => setIsZoom(state => !state)} /> */}
        </div>
      </Modal>
    </ImgStyled>
  );
}
