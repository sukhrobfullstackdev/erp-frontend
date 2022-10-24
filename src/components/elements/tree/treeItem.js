import { memo, useState } from "react";
import styled from "styled-components";
import Icon from "../icon";

const Style = styled.div`
  margin-left: 15px;
  padding: 10px;
  margin-top: 5px;

  .tree__item__header {
    display: flex;
    &__icon {
      margin-right: 5px;
      &.ui__icon__wrapper {
        &.md {
          .icon {
            width: 8px;
            height: 15px;
          }
        }
      }
    }
  }
  .tree__item__body {
    overflow: hidden;
  }
`;

const TreeItem = ({ header, children, onChange, headerData = {} }) => {
  const [show, setShow] = useState(false);

  return (
    <Style {...{ show }}>
      <div
        className={`tree__item__header`}
        onClick={() => {
          setShow((s) => !s);
          onChange({ label: header, ...headerData });
        }}
      >
        <Icon
          icon={"icon-arrow-right-radius"}
          className={"tree__item__header__icon"}
          style={{
            transform: show ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
        {header}
      </div>
      <div className="tree__item__body" style={{ height: show ? "auto" : 0 }}>
        {children}
      </div>
    </Style>
  );
};

export default memo(TreeItem);
