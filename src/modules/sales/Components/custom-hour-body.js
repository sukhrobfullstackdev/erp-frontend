import styled from "styled-components";
import React, { memo, useState } from "react";
import SimpleBar from "simplebar-react";

const CustomBodyStyle = styled.div`
  .clockPicker {
    &__body {
      &__container {
        display: flex;
        justify-content: center;
        .simplebar-track {
          &.simplebar-vertical {
            width: 8px;
          }
        }
      }
      &__footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px 10px 0 10px;
      }

      &__hour,
      &__minutes {
        &__container {
          max-height: 300px;
          width: 50px;
          margin: 0 5px;
        }

        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #777e91;
          padding: 5px 10px;
          background: #ffffff;
          cursor: pointer;

          &.selected {
            color: #45b36b;
            background: #f6fbf8;
          }
        }
      }

      &__footer {
        button {
          width: 40px;
          height: 30px;
          border-radius: 4px;
          padding: 0;
        }
      }
    }
  }
`;

const generateNumber = (length) => [...new Array(length)];

const HourBody = ({ CustomFooterOfBody, submitHandling = () => "" }) => {
  const [timeData, setTimeData] = useState({
    hour: null,
  });

  return (
    <CustomBodyStyle className={"clockPicker__body__style"}>
      <div className="clockPicker__body__container">
        <SimpleBar className="clockPicker__body__hour__container">
          {generateNumber(24).map((i, ind) => (
            <div
              key={ind}
              className={`clockPicker__body__hour__item ${timeData.hour === ind && "selected"}`}
              onClick={() => setTimeData({ ...timeData, hour: ind })}
            >
              {ind}
            </div>
          ))}
        </SimpleBar>
      </div>

      <div className="clockPicker__body__footer">
        <CustomFooterOfBody
          {...{
            submitClick: () => submitHandling(timeData),
          }}
        />
      </div>
    </CustomBodyStyle>
  );
};

export default memo(HourBody);
