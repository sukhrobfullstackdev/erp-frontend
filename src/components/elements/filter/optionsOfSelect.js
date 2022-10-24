import React, { useState } from "react";
import { isArray } from "lodash";
import styled from "styled-components";
import Icon from "../icon";

const OptionsOfSelectStyled = styled.div`
  max-width: 200px;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  border-radius: 8px;
  overflow-y: hidden;
  margin-top: 20px;

  max-height: 0;
  border: 0px solid transparent;
  padding: 0;
  transition: 0.3s;
  &.active {
    padding: 14px 4px 12px 12px;
    max-height: 282px;
    border: 1px solid #e6e8ec;
  }

  .head {
    display: flex;
    justify-content: space-between;
    padding-right: 9px;
    &__title {
      font-weight: 600;
      font-size: 10px;
      line-height: 24px;
      color: #777e91;
    }
    &__queastion {
      width: 11.5px;
      height: 11.5px;
      .ui__icon__wrapper,
      .IconQestion {
        width: 100%;
        height: 100%;
      }
      .ui__icon__wrapper {
        .icon {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .main {
    max-height: 202px;
    overflow-y: auto;
    /* width */
    ::-webkit-scrollbar {
      width: 4px;
      height: 7px;
      border-radius: 12px;
      cursor: default;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      cursor: default;
      border-radius: 0 12px 12px 0;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(177, 181, 195, 0.8);
      border-radius: 12px;
      cursor: default;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(177, 181, 195, 1);
      border-radius: 12px;
      cursor: default;
    }
    &__search {
      background: #fafafb;
      border-radius: 6px;
      height: 26px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        font-weight: 500;
        font-size: 8px;
        line-height: 12px;
        color: #b1b5c4;
        padding: 7px 8px;
      }
    }
    &__body {
      margin-top: 10px;
      border-top: 1px solid #fafafb;
      padding-bottom: 10px;

      &__option {
        font-weight: 500;
        font-size: 8px;
        line-height: 12px;
        color: #353945;
        margin-bottom: 16px;
        cursor: pointer;
        padding: 5px 10px;
        transition: 0.3s;
        &:hover {
          background: #fafafb;
          border-radius: 6px;
        }
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
`;

export default function OptionsOfSelect({ title = "Add Filter", searchable = true, options = [], onClick = () => {}, ...props }) {
  const [searchValue, setSarcheValue] = useState("");
  const [optoinsValue, setOptions] = useState(options);
  const clickOption = (e) => {
    let index = e.target.getAttribute("data-index");
    onClick(options[index]);
  };
  const searchHandling = (e) => {
    let value = e.target.value;
    if (value == "") setOptions(options);
    else {
      let filter = optoinsValue.filter((val) => val.includes(value.toLowerCase()));
      setOptions(filter);
    }
    setSarcheValue(value);
  };
  return (
    <OptionsOfSelectStyled {...props}>
      <section className="head">
        <div className="head__title">{title}</div>
        <div className="head__queastion">
          <Icon icon="icon-question" mainClassName="IconQestion" />
        </div>
      </section>
      <main className="main">
        <section className="main__search">
          <input type="text" value={searchValue} onChange={searchHandling} placeholder="Tap to search..." />
        </section>
        <section className="main__body">
          {isArray(optoinsValue) &&
            optoinsValue &&
            optoinsValue.map((value, index) => (
              <div
                className="main__body__option"
                key={`${index + new Date().getTime()}`}
                data-index={index}
                onClick={clickOption}
              >
                {value.option}
              </div>
            ))}
        </section>
      </main>
    </OptionsOfSelectStyled>
  );
}
