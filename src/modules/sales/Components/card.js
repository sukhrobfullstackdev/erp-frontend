import React, { Children } from "react";
import styled from "styled-components";

const CardStyle = styled.div`
  width: 100%;
  background: ${(props) => (props.mode === "dark" ? "var(--dark)" : "var(--white)")};
  color: ${(props) => (props.mode === "dark" ? "var(--white)" : "var(--dark)")};
  border-radius: 16px;
  box-sizing: border-box;
  margin: 0;
  box-shadow: 0px 3.46875px 7.80469px -2.60156px rgba(24, 39, 75, 0.12), 0px 5.20312px 18.2109px -1.73438px rgba(24, 39, 75, 0.12);
`;

const Card = ({ className, mode, children }) => {
  return (
    <CardStyle mode={mode} className={className}>
      {children}
    </CardStyle>
  );
};

export default Card;
