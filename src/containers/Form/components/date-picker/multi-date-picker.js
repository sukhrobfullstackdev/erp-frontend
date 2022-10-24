import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { head, last } from "lodash";
import Label from "../../../../components/elements/label";
import InputMask from "react-input-mask";
import { DateRangePicker } from "react-date-range";

const StyledMultiDatePicker = styled.div``;
const MultiDatePicker = ({
  Controller,
  register,
  name,
  errors,
  params,
  label,
  property,
  defaultValue = new Date(),
  control,
  labelRequired,
  cols = [12, 12],
  ...rest
}) => {
  const [date, setDate] = useState(new Date());
  return (
    <StyledMultiDatePicker {...rest}>
      <Row>
        {label && (
          <Col xs={head(cols)}>
            <Label htmlFor={name} className="form-label">
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col xs={last(cols)}>
          <Controller
            as={InputMask}
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={params}
            render={({ field }) => <DatePicker {...register(name, params)} {...field} value={date} onChange={setDate} />}
          />
        </Col>
      </Row>
    </StyledMultiDatePicker>
  );
};

export default MultiDatePicker;
