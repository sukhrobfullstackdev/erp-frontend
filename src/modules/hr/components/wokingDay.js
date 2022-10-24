import React, { memo, useEffect, useState } from "react";
import Title from "../../../components/elements/title";
import Field from "../../../containers/Form/field";
import styled from "styled-components";
const WorkingDayStyle = styled.div`
  .days {
    width: 100%;
    height: 80px;
    background: #fcfcfd;
    border-radius: 10px;
    padding: 0px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px !important;
    border: 1px solid #e6e8ec;
    transition: 0.4s ease;
    box-sizing: border-box;
    .title {
      font-size: 20px;
    }
    :hover {
      background-color: #f4f5f6;
    }
    .rc-checkbox-inner {
      background: #f4f5f6;
    }
    .rc-checkbox-checked {
      .rc-checkbox-inner {
        background: #45b26b;
      }
    }
    :last-child {
      margin-bottom: 0;
    }
    label {
      margin: 0;
    }
    .title {
      margin: 0;
    }
    form {
      width: 40px;
    }
    .bwLPty .box form {
      width: 40px;
    }
  }
  .checkon {
    border: none;
    background: #f2fbf5;
    .title {
      color: #45b26b;
    }
  }
`;

const WorkingDay = ({ title = "", changeWorkDayActive, id, active = false, name, editable }) => {
  const [checked, setChecked] = useState(active);
  useEffect(() => {
    setChecked(active);
    if ((id, active)) changeWorkDayActive(id, active);
  }, [active]);
  return (
    <WorkingDayStyle>
      <div className={`days ${checked && "checkon"}`}>
        <Title className="title">{title}</Title>
        <Field
          type={"switch"}
          name={name}
          label={""}
          defaultValue={active}
          disabled={!editable}
          onChange={() => {
            changeWorkDayActive(id, !checked);
            setChecked((s) => !s);
          }}
        />
      </div>
    </WorkingDayStyle>
  );
};
export default memo(WorkingDay);
