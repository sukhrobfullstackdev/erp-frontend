import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { isArray } from "lodash";

const DropdownStyle = styled.div`
  position: relative;
  display: inline-block;
  .dropDown {
    &__button {
      cursor: pointer;
    }
    &__body {
      background: #ffffff;
      box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.3);
      border-radius: 8px;
      position: absolute;
      top: 32px;
      right: 0;
      transition: 0.3s;
      overflow: hidden;
      z-index: 10;
      &__option {
        /* padding: 6px 15px; */
      }
    }
  }
  &.dropDown {
    &.active {
      .dropDown__body {
        min-width: 140px;
        /* &__option {
          height: 100%;
        } */
      }
    }
  }
  ${({ horizontal }) =>
    horizontal &&
    css`
      .dropDown {
        &__body {
          min-width: 0px;
          width: 0;
        }
      }
      .dropDown {
        &.active {
          .dropDown__body {
            min-width: 140px;
          }
        }
      }
    `}
  ${({ bounce }) =>
    bounce &&
    css`
      .dropDown {
        &__body {
          /* display: none;
        opacity: 0; */
          animation-duration: 4s;
          animation-name: bounce-in;
        }
      }
      .dropDown {
        &.active {
          .dropDown__body {
            width: 140px;
            height: auto;
            animation-name: bounce-out;
            /* opacity: 1; */
          }
        }
      }
    `}
  @keyframes bounce-in {
    from {
      display: block;
      opacity: 1;
      transform: scale(0.7);
    }
    to {
      transform: scale(1);
      opacity: 0.3;
    }
  }
  @keyframes bounce-out {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.7);
      opacity: 1;
      display: none;
    }
  }
`;

export default function CustomDropdown({ button, options, horizontal = false, vertical = false, bounce = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  function eventFunc(e) {
    let temp = [];
    for (let i = 0; 5 > i; i++) {
      e.path[i].classList.forEach((val) => val === "dropDown" && temp.push("dropDown"));
    }
    if (temp.length === 0 && isOpen) onClose();
    if (!isOpen) e.stopPropagation();
  }
  useEffect(() => {
    isOpen && document.addEventListener("click", eventFunc);
    return () => document.removeEventListener("click", eventFunc);
  }, [isOpen]);
  return (
    <DropdownStyle className={`dropDown ${isOpen ? "active" : ""}`} {...{ horizontal, vertical, bounce }}>
      <div className="dropDown__button" onClick={() => setIsOpen((state) => !state)}>
        {button}
      </div>
      <div className="dropDown__body">
        {isArray(options) &&
          options.map((val, ind) => (
            <div key={ind + new Date().getTime()} className="dropDown__body__option">
              {" "}
              {val}{" "}
            </div>
          ))}
      </div>
    </DropdownStyle>
  );
}
