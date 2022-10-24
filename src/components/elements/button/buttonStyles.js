import styled, { css } from "styled-components";
export const ButtonStyeld = styled.div`
  button,
  a {
    background: none;
    border: none;
    outline: none;
    /* width: inherit;
    min-width: inherit;
    max-width: inherit;
    min-height: inherit;
    max-height: inherit;
    height: inherit;
    color: inherit; */
    /* padding: inherit; */
    /* cursor: inherit;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit; */
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #353945;
    text-align: center;
    text-transform: capitalize;
    background: #f4f5f6;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    min-width: ${({ minWidth }) => minWidth + "px" || "auto"};
    transition: 0.3s ease;
    position: relative;
    display: inline-block;
    /* min-width: 215px; */

    &:hover {
      background: #31a659;
      color: #fff;

      .icon-left-arrow {
        background-color: #fff !important;
      }
    }
  }

  .img-space-right {
    margin-right: 7px;
  }

  ${({ success }) =>
    success &&
    css`
      button,
      a {
        background-color: #45b36b;
        color: #fff;
      }
    `}
  ${({ primary }) =>
    primary &&
    css`
      button,
      a {
        background-color: rgba(55, 114, 255, 0.05);
        color: rgba(55, 114, 255, 1);

        &:hover {
          background-color: rgba(55, 114, 255, 0.1);
          color: rgba(55, 114, 255, 1);
        }
      }
    `}
  ${({ outline_success }) =>
    outline_success &&
    css`
      button,
      a {
        background: rgba(69, 179, 107, 0.1);
        border: 1px solid #45b36b;
        color: #01ac56;

        &:hover {
          background: rgba(69, 179, 107, 0.3);
          color: #01ac56;
        }
      }
    `}
  ${({ light_success }) =>
    light_success &&
    css`
      button,
      a {
        background: rgba(69, 179, 107, 0.1);
        color: #01ac56;

        &:hover {
          background: rgba(69, 179, 107, 0.3);
          color: #01ac56;
        }
      }
    `}
  ${({ edit, plus }) =>
    (edit || plus) &&
    css`
      button,
      a {
        display: flex;
        align-items: center;
        margin-right: 5px;
      }
    `}
  ${({ outlineDanger }) =>
    outlineDanger &&
    css`
      button,
      a {
        background: rgba(239, 70, 111, 0.1);
        color: #ef466f;

        &:hover {
          background: rgba(239, 70, 111, 0.2);
          color: #ef466f;
        }
      }
    `}
  ${({ danger }) =>
    danger &&
    css`
      button,
      a {
        background: rgba(239, 70, 111, 1);
        color: #fcfcfd;

        &:hover {
          background: rgba(239, 70, 111, 0.9);
        }
      }
    `}
  
  ${({ lightButton }) =>
    lightButton &&
    css`
      button,
      a {
        background: rgba(252, 252, 253, 1);
        border: 1px solid #f4f5f6;
        color: #353945;
        font-size: 16px;
        line-height: 24px;
        transition: 0.2s;

        &:hover {
          background: rgba(245, 245, 245, 1);
        }
      }
    `}
  ${({ lightSmBorder }) =>
    lightSmBorder &&
    css`
      button,
      a {
        border: 0.5px solid #e6e8ec;
      }
    `}
  ${({ theme: { mode }, outlineDanger }) =>
    mode === "dark" &&
    outlineDanger &&
    css`
      button,
      a {
        background: rgba(239, 70, 111, 0.2);

        &:hover {
          background: rgba(239, 70, 111, 0.3);
        }
      }
    `}
  ${({ bg }) =>
    bg &&
    css`
      button,
      a {
        background: ${bg};
      }
    `}
  ${({ hover }) =>
    hover &&
    css`
      button,
      a {
        :hover {
          background: ${hover};
        }
      }
    `}
  ${({ hoverColor }) =>
    hoverColor &&
    css`
      button,
      a {
        :hover {
          color: ${hoverColor};
        }
      }
    `}
  ${({ color }) =>
    color &&
    css`
      button,
      a {
        color: ${color};
      }
    `}
  ${({ xs }) =>
    xs &&
    css`
      button,
      a {
        font-size: 12px;
      }
    `}
  ${({ sm }) =>
    sm &&
    css`
      button,
      a {
        font-size: 14px;
      }
    `}
  ${({ regular }) =>
    regular &&
    css`
      button,
      a {
        font-size: 16px;
      }
    `}
  ${({ md }) =>
    md &&
    css`
      button,
      a {
        font-size: 18px;
      }
    `}
  ${({ lg }) =>
    lg &&
    css`
      button,
      a {
        font-size: 24px;
      }
    `}
  ${({ xl }) =>
    xl &&
    css`
      button,
      a {
        font-size: 36px;
      }
    `}
  ${({ xxl }) =>
    xxl &&
    css`
      button,
      a {
        font-size: 48px;
      }
    `}
  ${({ light }) =>
    light &&
    css`
      button,
      a {
        color: #fff;
      }
    `}
  ${({ thin }) =>
    thin &&
    css`
      button,
      a {
        font-weight: 100;
      }
    `}
  ${({ medium }) =>
    medium &&
    css`
      button,
      a {
        font-weight: 500;
      }
    `}
  ${({ semiBold }) =>
    semiBold &&
    css`
      button,
      a {
        font-weight: 600;
      }
    `}
  ${({ bold }) =>
    bold &&
    css`
      button,
      a {
        font-weight: 700;
      }
    `}
  ${({ extraBold }) =>
    extraBold &&
    css`
      button,
      a {
        font-weight: 900;
      }
    `}
  ${({ flex }) =>
    flex &&
    css`
      button,
      a {
        display: flex;
        justify-content: ${({ justify }) => justify || "flex-start"};
        align-items: ${({ align }) => align || "flex-start"};
      }
    `}
  ${({ center }) =>
    center &&
    css`
      button,
      a {
        display: flex;
        justify-content: center;
        align-items: center;

        .left-in-button {
          position: absolute;
          left: 16px;
        }
      }
    `}
  ${({ height }) =>
    height &&
    css`
      button,
      a {
        height: ${height}px;
      }
    `}
  ${({ width }) =>
    width &&
    css`
      button,
      a {
        width: ${width}px;
      }
    `}
  button, a {
    padding-top: ${({ pt }) => pt || 6}px;
    padding-bottom: ${({ pb }) => pb || 6}px;
    padding-left: ${({ pl }) => pl || 10}px;
    padding-right: ${({ pr }) => pr || 10}px;
  }

  ${({ check }) =>
    check &&
    css`
      button,
      a {
        background: ${({ checkDisable }) => (checkDisable ? "#E6E8EC" : "#45B36B")};
        border-radius: 12px;
        width: 44px;
        height: 44px;

        .checkIcon {
          width: 25px !important;
          height: 25px !important;

          .icon {
            width: 20px !important;
            background-color: ${({ checkDisable }) => (checkDisable ? "#B1B5C4" : "white")};
          }
        }
      }
    `}
  ${({ bg }) =>
    bg &&
    css`
      button,
      a {
        background-color: ${bg};
      }
    `}
  ${({ color }) =>
    color &&
    css`
      button,
      a {
        color: ${color};
      }
    `}
  ${({ borderR }) =>
    borderR &&
    css`
      button,
      a {
        border-radius: ${borderR}px;
      }
    `}
  button, a {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 0%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      transition: 20ms;
      border-radius: 8px;
    }

    ${({ hideClickAnimation }) =>
      hideClickAnimation
        ? ""
        : css`
            &:active:after {
              width: 100%;
              left: 0;
              transition: 90ms;
            }
          `}
  }
  ${({ disabled }) =>
    disabled &&
    css`
      button,
      a {
        color: #b1b5c4;
        font-size: 16px;
        line-height: 24px;
        background: #fcfcfd;
        border: 1px solid #f4f5f6;
        cursor: default;

        &:hover {
          background: #fcfcfd;
          color: #b1b5c4;
        }
      }
    `}
`;
