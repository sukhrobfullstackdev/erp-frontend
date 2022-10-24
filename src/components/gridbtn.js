import React, { useState } from "react";
import styled from "styled-components";
import Icon from "./elements/icon";

const StyledGridbtn = styled.div`
  display: flex;
  margin-left: 10px;
  .search-form__style_icon {
    padding: 7px;
  }
  .search-form__style_icon-active {
    background: rgba(69, 179, 107, 0.1);
    border-radius: 7px;
    padding: 7px;
  }
`;

const Gridbtn = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleHandler = (index) => {
    setToggleState(index);
  };
  return (
    <StyledGridbtn>
      <div
        className={toggleState === 1 ? "search-form__style_icon-active" : "search-form__style_icon"}
        onClick={() => toggleHandler(1)}
      >
        {toggleState === 1 ? (
          <Icon icon="grid-style-icon" size="xmd" color="success" />
        ) : (
          <Icon icon="grid-style-icon" size="xmd" />
        )}
      </div>
      <div
        className={toggleState === 2 ? "search-form__style_icon-active" : "search-form__style_icon"}
        onClick={() => toggleHandler(2)}
      >
        {toggleState === 2 ? (
          <Icon icon="horizontal-grid-style-icon" size="xmd" color="success" />
        ) : (
          <Icon icon="horizontal-grid-style-icon" size="xmd" />
        )}
      </div>
    </StyledGridbtn>
  );
};

export default Gridbtn;
