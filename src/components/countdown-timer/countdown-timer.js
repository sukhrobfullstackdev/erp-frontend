import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import Button from "../elements/button";
import reloadImg from "../../assets/icons/reload.svg";

const StyledCountdownTimer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .timer__text {
    margin-left: 15px;
    font-size: 16px;
    color: #b1b5c4;
  }
  /* div{
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #353945 !important;
} */
  .SendAgainButton {
    button {
      padding-left: 32px;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: linear-gradient(180deg, #01ac56 0%, #017e56 100%);
    }
  }
`;
const CountdownTimer = ({ defaultTime = 60, resend = () => {}, ...rest }) => {
  const [time, setTime] = useState(defaultTime);
  const restart = () => {
    resend();
    setTime(defaultTime);
  };
  return (
    <StyledCountdownTimer {...rest}>
      {time > 0 ? (
        <>
          <CountdownCircleTimer
            className="countdownCircleTimer"
            isPlaying
            duration={time}
            colors={"#45B36B"}
            strokeWidth={4}
            trailStrokeWidth={4}
            size={40}
            trailColor="#B1B5C4"
            onComplete={(e) => setTime(0)}
          >
            {({ remainingTime }) => (
              <span
                style={{
                  color: "#353945",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {remainingTime}
              </span>
            )}
          </CountdownCircleTimer>
          <span className={"timer__text"}> Send code again</span>
        </>
      ) : (
        <Button outline_success="1" className="SendAgainButton" center="1" onClick={restart} height="50">
          <img src={reloadImg} alt="reload" className="left-in-button" /> Send again
        </Button>
      )}
    </StyledCountdownTimer>
  );
};

export default CountdownTimer;
