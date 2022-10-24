import { get, isArray, isEmpty, isNil, isString } from "lodash";
import React from "react";
import { memo } from "react";
import styled from "styled-components";

const AssignStyles = styled.div`

  .assign__body {
    min-width: 190px;
    max-width: 240px;
  }

  .assign_row {
    display: flex;
    align-items: center;
    justify-content: start;
  }


  .assign_row__img {
    border: 1px solid #23262f;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    position: relative;
  }

  .assign_row__name {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #353945;
  }

  .assign_row_img_name {
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    color: #ffffff;
    background: #ffb700;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .assign_humans {
    padding: 10px;
  }

  .assign_row__online {
    position: absolute;
    background: #5cca81;
    border: 1px solid #fcfcfd;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 0;
    right: 0;
  }
`;

const AssignSelect = ({
  options,
  selectHandling,
  selected,
  photoKey,
  firstName,
  lastName,
  action,
  nullable,
  searchValue,
  disabledSomeOptions,
  ignoreOption,
  valueKey,
  labelKey,
}) => {
  const render = ({ index, ...other }) => {
    let res = isArray(disabledSomeOptions) ? disabledSomeOptions.find((item) => get(item, valueKey, "") === other[valueKey]) : [];
    if (!isEmpty(ignoreOption)) {
      if (ignoreOption[other[valueKey]]) return "";
    }
    return (
      <AssignStyles
        key={
          other[valueKey] + isString(other[labelKey])
            ? other[valueKey] + isString(other[labelKey])
            : Math.floor(Math.random() * 9999)
        }
      >
        {nullable && !index && (
          <div className={`select__body__options__option nullable`}>
            <div className="content" onClick={() => selectHandling(null)}>
              -
            </div>
          </div>
        )}
        <div
          className={`select__body__options__option ${other[valueKey] === selected && "selected"} ${
            !isNil(res) ? "disabled" : ""
          }`}
          data-index={index}
        >
          <div className="content" onClick={() => isNil(res) && selectHandling(other)}>
            <div className="assign__body">
              <div className="assign_humans">
                <div className="assign_row">
                  <div className="assign_row__img">
                    {other[photoKey] ? (
                      // <img src={other[photoKey]} alt="userphoto" />
                      <span></span>
                    ) : (
                      <span className="assign_row_img_name">
                        {other.firstName.substring(0, 1)}
                        {other.lastName.substring(0, 1)}
                      </span>
                    )}
                  </div>
                 
                  <span className="assign_row__name">{other[labelKey]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AssignStyles>
    );
  };

  return isEmpty(options) ? (
    <div className="select__body__options__empty">
      { !isEmpty(searchValue) ? "Press Enter or click create button" : "Result not found"}{" "}
    </div>
  ) : (
    isArray(options) && options.map((val, index) => render({ ...val, index }))
    // : !selected.some((item) => get(item, valueKey) === val[valueKey]) && renderForMulti({ ...val, index })
  );
};

export default memo(AssignSelect);
