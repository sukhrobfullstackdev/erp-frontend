import classNames from "classnames";
import styled from "styled-components";

const StyledIcon = styled.div`
  .ui__icon__wrapper {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: 0.2s linear;
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    overflow: hidden;

    &:active {
      transform: scale(0.9);
    }

    &.hover:hover {
      background-color: var(--icon--wrapper--bg);
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 22px;
      height: 22px;
      background-color: var(--icon--default);
      transition: 0.15s linear;
    }

    &.xs {
      width: 18px;
      height: 18px;

      .icon {
        width: 16px;
        height: 16px;
      }

      &.hover {
        width: 26px;
        height: 26px;
      }
    }

    &.sm {
      width: 20px;
      height: 20px;

      .icon {
        width: 18px;
        height: 18px;
      }

      &.hover {
        width: 28px;
        height: 28px;
      }
    }

    &.xmd {
      width: 22px;
      height: 22px;

      .icon {
        width: 20px;
        height: 20px;
      }

      &.hover {
        width: 30px;
        height: 30px;
      }
    }

    &.md {
      width: 24px;
      height: 24px;

      .icon {
        width: 22px;
        height: 22px;
      }

      &.hover {
        width: 42px;
        height: 42px;
      }
    }

    &.lg {
      width: 30px;
      height: 30px;

      .icon {
        width: 28px;
        height: 28px;
      }

      &.hover {
        width: 48px;
        height: 48px;
      }
    }

    &.xl {
      width: 38px;
      height: 38px;

      .icon {
        width: 36px;
        height: 36px;
      }

      &.hover {
        width: 56px;
        height: 56px;
      }
    }

    &.white {
      .icon {
        background-color: var(--white);
      }
    }

    &.dark {
      .icon {
        background-color: var(--icon--dark);
      }
    }

    &.green {
      .icon {
        background-color: var(--green);
      }

      &.hover:hover {
        background-color: var(--icon--wrapper--bg--green);
      }
    }

    &.info {
      .icon {
        background-color: var(--info);
      }

      &.hover:hover {
        background-color: var(--icon--wrapper--bg--info);
      }
    }

    &.success {
      .icon {
        background-color: var(--success);
      }

      &.hover:hover {
        background-color: var(--icon--wrapper--bg--success);
      }
    }

    &.warning {
      .icon {
        background-color: var(--warning);
      }

      &.hover:hover {
        background-color: var(--icon--wrapper--bg--warning);
      }
    }

    &.danger {
      .icon {
        background-color: var(--danger);
      }

      &.hover:hover {
        background-color: var(--icon--wrapper--bg--danger);
      }
    }

    &.disabled {
      pointer-events: none;

      .icon {
        background-color: var(--icon--disable);
      }
    }
    .icon {
      background-color: ${({ color }) =>
        color !== "white" &&
        color !== "dark" &&
        color !== "green" &&
        color !== "info" &&
        color !== "success" &&
        color !== "warning" &&
        color !== "danger"
          ? color
          : "var(--icon--default)"};
    }
  }
`;
const Icon = ({
  icon = "icon-settings",
  color = "",
  size = "md",
  hover = false,
  disabled = false,
  onClick = () => {},
  mainOnClick = () => {},
  className = "",
  mainClassName = "",
  iconClassName = "",
  ...rest
}) => {
  return (
    <StyledIcon className={mainClassName} onClick={mainOnClick} color={color}>
      <div
        className={classNames(`ui__icon__wrapper ${className}`, {
          xs: size === "xs",
          sm: size === "sm",
          xmd: size === "xmd",
          md: size === "md",
          lg: size === "lg",
          xl: size === "xl",
          hover,
          white: color === "white",
          dark: color === "dark",
          green: color === "green",
          info: color === "info",
          success: color === "success",
          warning: color === "warning",
          danger: color === "danger",
          disabled,
        })}
        onClick={(e) => {
          onClick(e);
        }}
        {...rest}
      >
        <div className={`icon ${icon} ${iconClassName}`} />
      </div>
    </StyledIcon>
  );
};

export default Icon;
