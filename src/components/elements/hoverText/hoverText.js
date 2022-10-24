import React from "react";
import styled from "styled-components";

const StyledHoverText = styled.div`
  position: relative;
  z-index: 0;
  .hover_div {
    transition: 0.5s ease;
    position: absolute;
    top: 150%;
    z-index: 9;
    background-color: #353945;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #fcfcfd;
    transform: scale(0, 0);
  }
  :hover {
    .hover_div {
      animation: mymove 2s 1;
      transform: scale(1, 1);
    }
  }
  @keyframes mymove {
    0% {
      transform: scale(0, 0);
    }
    70% {
      transform: scale(0, 0);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

const HoverText = ({ children, hoverText, type = "" }) => {
  const hoverHandling = (e) => {
    /*
         clientX: 1418
clientY: 43
pageX: 1418
pageY: 43
screenX: 1418
screenY: 146
        */
    // let hoverElement = document.createElement('div');
    // hoverElement.id = "hover-element";
    // hoverElement.style.position = "absolute";
    // hoverElement.style.top = "0px";
    // hoverElement.style.left = "0px";
    // hoverElement.style.transform = `translate(${e.clientX},${e.clientY})`;
    // hoverElement.style.background = `red`;
    // hoverElement.innerText = hoverText;
    //
    // if (e.type === 'mouseenter') {
    //     document.body.appendChild(hoverElement)
    // } else if (e.type === 'mouseleave') {
    //     const getItem = document.getElementById("hover-element");
    //     getItem.removeChild(getItem.lastChild);
    //     // myNode.removeChild(myNode.lastElementChild);
    // }
  };
  return (
    <StyledHoverText onMouseEnter={hoverHandling} onMouseLeave={hoverHandling}>
      {children}
      <div className="hover_div">{hoverText}</div>
    </StyledHoverText>
  );
};

export default HoverText;
