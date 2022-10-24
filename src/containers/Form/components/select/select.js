import React, { useEffect, useState } from "react";
import styled, { withTheme, css } from "styled-components";
import { Col, Row } from "react-grid-system";
import { get, head, last } from "lodash";
import RSelect from "react-select";
import Label from "../../../../components/elements/label";
import Icon from "../../../../components/elements/icon";
import { colourStyles } from "./selectStyle";
import { ErrorMessage } from "@hookform/error-message";

const StyledSelect = styled.div`
  .Select__controller {
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: #777e91;
    //min-width: 260px;
    height: 42px;
  }

  .form-select {
    border: 1px solid #e6e8ec;
    background-color: #fff;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    min-width: 240px;
    margin-top: 8px;
    width: 94%;
    position: absolute;
    z-index: 999;
    border-bottom: none;
    .flag {
      width: 20px;
      margin-right: 10px;
    }
  }

  .Select__controller .hide {
    display: none;
  }

  .Select__controller .flag {
    width: 31px !important;
  }

  div[id] {
    margin-top: 0;
    left: -1px;
    right: -1px;
    width: unset;
  }
  ${({ lg }) =>
    lg &&
    css`
      .Select__controller {
        font-size: 18px;
      }
    `}
  .dropdown {
    /* min-width: 260px; */
  }
`;

const Button = ({ children, ...props }) => (
  <div className="Select__controller" {...props}>
    {" "}
    {children}{" "}
  </div>
);

const Menu = (props) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      css={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 0,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};
const Blanket = (props) => (
  <div
    css={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);
const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div className={"dropdown"} css={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);
const Svg = (p) => <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation" {...p} />;
const DropdownIndicator = () => (
  <div css={{ color: "black", height: 24, width: 32 }}>
    {/* <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg> */}
  </div>
);

const Select = ({
  t,
  options = [],
  defaultValue,
  name,
  Controller,
  register,
  params,
  errors,
  property,
  control,
  label,
  getValues,
  watch,
  searchIndicator = true,
  cols = [12, 12],
  labelRequired,
  placeholder = "Select",
  onchange = () => {},
  getValueFromField = () => {},
  theme,
  ...rest
}) => {
  const [state, setState] = useState({ isOpen: false, value: undefined });
  const toggleOpen = () => setState((state) => ({ ...state, isOpen: !state.isOpen }));

  const onSelectChange = (value) => {
    toggleOpen();
    setState((state) => ({ ...state, value }));
  };

  const { isOpen } = state;

  useEffect(() => {
    if (defaultValue) {
      setState((state) => ({ ...state, value: defaultValue }));
    }
  }, [defaultValue]);

  useEffect(() => {
    getValueFromField(getValues(name), name);
  }, [watch(name)]);
  return (
    <StyledSelect {...{ ...rest, isOpen }}>
      <Row>
        {label && (
          <Col xs={head(cols)}>
            <Label className="form-select-label" htmlFor={name}>
              {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
            </Label>
          </Col>
        )}
        <Col xs={last(cols)} className="form-body-select">
          <Controller
            name={name}
            control={control}
            defaultValue={get(defaultValue, "value")}
            render={({ field: { onChange, onBlur, value, ref, name } }) => {
              return (
                <Dropdown
                  isOpen={isOpen}
                  onClose={toggleOpen}
                  target={
                    <Button onClick={toggleOpen}>
                      {state.value ? state.value.label : placeholder}
                      <Icon icon="icon-bottom-arrow" mainClassName="bottom-arrow" />
                    </Button>
                  }
                >
                  <RSelect
                    autoFocus
                    backspaceRemovesValue={false}
                    components={{
                      DropdownIndicator: searchIndicator ? DropdownIndicator : null,
                      IndicatorSeparator: null,
                    }}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    menuIsOpen
                    options={options}
                    tabSelectsValue={false}
                    value={state.value}
                    styles={colourStyles}
                    name={name}
                    ref={ref}
                    {...register(name, params)}
                    onChange={(event) => {
                      onchange(name, event);
                      onChange(get(event, "value", ""));
                      onSelectChange(event);
                    }}
                    clearValue={""}
                    className="form-select"
                    isDisabled={get(property, "disabled", false)}
                    menuPlacement={"bottom"}
                    onBlur={onBlur}
                    placeholder={get(property, "placeholder", "Search...")}
                    defaultValue={defaultValue}
                    isSearchable={false}
                    theme={theme}
                    params={params}
                  />
                </Dropdown>
              );
            }}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages = `${label ?? name} is required` }) => {
              return <small className="form-control-feedback">{messages}</small>;
            }}
          />
        </Col>
      </Row>
    </StyledSelect>
  );
};

export default withTheme(Select);
