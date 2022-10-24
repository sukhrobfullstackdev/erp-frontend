import { memo } from "react";
import Icon from "../../../../../components/elements/icon";
import styled from "styled-components";
import classNames from "classnames";

const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
.message{
    width: min-content;
    margin: auto;
    background: #E6E8EC;
    border-radius: 6px;
    position: relative;
    .icon{
        color: #777E91
    }
    &.has_Message{
        background: #FFD166;
        .icon{
            color: #353945;
        }
.inidicator{
       width: 8px;
    height: 8px;
    background: #45B36B;
    display: block;
    border-radius: 50%;
    position: absolute;
    top: -3px;
    right: -2px;
}
}
    }

}
`;
const HasMessageCell = ({
  updateItemRequest = () => {},
  setLoading = () => {},
  initialValue = "",
  rowId = null,
  id = null,
  editable = false,
  t,
  defaultValue,
  viewId,
  typeConfig,
  rowSize,
  ...rest
}) => {
  return (
    <Styled>
      <div className={classNames("message", { has_Message: initialValue })}>
        <Icon icon="icon-comment" />
        <span className="inidicator"></span>
      </div>
    </Styled>
  );
};

export default memo(HasMessageCell);
