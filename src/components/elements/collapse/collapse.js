import React, { useState } from "react";
import styled, { css } from "styled-components";
import Flex from "../flex";
import Icon from "../icon";
import Title from "../title";

const CollapseStyled = styled.div`
  border-radius: 8px;
  .collapse {
    &__title {
      line-height: 24px;
      text-transform: uppercase;
      color: #23262f;
      display: flex;
      align-items: center;
      padding: 13px 15px;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background: #f4f5f6;
        border-radius: 8px;
      }
      &__bottom-arrow {
        margin-right: 17px;
        transition: 0.3s;
        ${({ isOpen }) =>
          isOpen &&
          css`
            transform: rotate(180deg);
          `}
        .ui__icon__wrapper {
          width: 28px;
          height: 28px;
          .icon-bottom-arrow {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
    &__body {
      height: 0;
      overflow: hidden;
      transform: scale(0);
      transition: transform 0ms;
    }
  }
  ${({ isOpen }) =>
    isOpen &&
    css`
      background: #f4f5f6;
      .collapse {
        &__body {
          border-top: 1px solid #e6e8ec;
          padding: 15px;
          transition: transform 150ms;
          transform: none;
          height: auto;
          overflow: auto;
        }
      }
    `}
`;
export default function Collapse({ children, title, active = false, arrow = true, arrowRight, className = "", ...props }) {
  const [isOpen, setIsOpen] = useState(!!active);

  const ArrowIcon = () => <Icon icon="icon-bottom-arrow" color="dark" mainClassName="collapse__title__bottom-arrow" />;

  return (
    <CollapseStyled {...{ isOpen, ...props }} className={`${className} ${isOpen && "active"}`}>
      <Title medium sm className="collapse__title" onClick={() => setIsOpen((state) => !state)}>
        {arrowRight ? (
          <Flex justify="space-between" align="center" className="w-100">
            {title}
            {arrow && <ArrowIcon />}
          </Flex>
        ) : (
          <>
            {arrow && <ArrowIcon />}
            {title}
          </>
        )}
      </Title>
      <div className={`collapse__body ${isOpen ? "active" : ""}`}>{children}</div>
    </CollapseStyled>
  );
}
