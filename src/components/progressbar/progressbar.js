import React from "react";
import { Circle, Line } from "rc-progress";
import { isEqual } from "lodash";
import styled from "styled-components";

const StyledProgressbar = styled.div``;
const Progressbar = ({ type = "line", strokeWidth = "1", trailWidth = "1", strokeColor = "#45B36B", percent = 0, ...props }) => {
  return (
    <StyledProgressbar {...props}>
      {isEqual(type, "circle") ? (
        <Circle percent={percent} strokeWidth={strokeWidth} strokeColor={strokeColor} trailWidth={trailWidth} />
      ) : (
        <Line percent={percent} strokeWidth={strokeWidth} strokeColor={strokeColor} trailWidth={trailWidth} />
      )}
    </StyledProgressbar>
  );
};

export default Progressbar;
