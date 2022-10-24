import React from "react";
import { ButtonStyeld } from "./buttonStyles";
import Icon from "../icon";
import plusImg from "./../../../assets/icons/plus.svg";
import { isString } from "lodash";
import classNames from "classnames";

export default function Button({
  children,
  type,
  edit,
  plus,
  link = "",
  className = "",
  check = "",
  checkDisable = "",
  onCLick = () => {},
  disabled = false,
  hideClickAnimation = false,
  attr = {},
  ...props
}) {
  return (
    <ButtonStyeld
      className={classNames("", {
        [className]: className,
        disabled,
      })}
      {...{
        edit,
        plus,
        check,
        checkDisable,
        disabled,
        hideClickAnimation,
        ...props,
      }}
    >
      {isString(link) && link.length ? (
        <a href={link} {...attr}>
          {edit ? <Icon icon="icon-edit" color="white" /> : plus && <img src={plusImg} alt="plus" className="img-space-right" />}{" "}
          {children}
        </a>
      ) : (
        <button onClick={(e) => !disabled && onCLick(e)} type={type ? type : "button"} disabled={disabled} {...attr}>
          {edit ? (
            <Icon icon="icon-edit" color="white" />
          ) : check ? (
            <Icon icon="icon-check2" size="xs" color={"white"} className="checkIcon" />
          ) : (
            plus && <img src={plusImg} alt="plus" className="img-space-right" />
          )}{" "}
          {children}
        </button>
      )}
    </ButtonStyeld>
  );
}
