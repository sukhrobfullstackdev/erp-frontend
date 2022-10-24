import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/elements/button";
import { Select2 } from "../../../components/elements/select";
import SearchSelect from "../../../components/elements/select/searchSelect";
import Icon from "../../../components/elements/icon";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import FilterTemplates from "./filterTemplates";

const StyledFilter = styled.div`
  .filter {
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 40px 32px -24px rgb(15 15 15 / 12%);
    position: absolute;
    /* z-index: 99999999999999; */
    width: 520px;
    padding: 8px 12px;
    button {
      font-size: 12px;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      &__title {
        font-size: 14px;
        color: #777e91;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
          width: 20px !important;
          height: 20px !important;
        }
        button {
          padding: 7px 14px;
          line-height: 18px;
          border-radius: 6px;
          background: rgba(55, 114, 255, 0.05);
          color: rgba(55, 114, 255, 1);
          margin-right: 6px;
        }
      }
    }
    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .input-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .rs-picker-toggle-placeholder,
        .rs-picker-toggle-value {
          color: #777e90 !important;
        }
        .multi-select-wrapper {
          background: #f4f5f6;
          display: flex;
          margin-right: 10px;
          width: 180px;
          border: 1px solid #e6e8ec;
          border-radius: 8px;
          .select__control {
            border: none;
          }
          .any-all-select {
            width: 30px !important;
            margin-top: 4px;
            .rs-picker-toggle.rs-btn .rs-picker-toggle-caret {
              display: none;
            }
            .rs-picker-toggle-value {
              font-size: 10px;
              color: #353945;
              font-weight: 600px;
              display: flex;
              align-items: center;
              line-height: 23px;
              justify-content: center;
            }
            .rs-picker-toggle {
              height: 24px;
              padding: 0;
            }
            .select__control {
              min-height: 24px;
              height: 24px;
            }
            .select__indicator {
              display: none;
            }
          }
        }
        .second-child {
          width: 99px !important;
          .rs-picker-toggle.rs-btn {
            background-color: rgba(69, 178, 107, 0.07) !important;
          }
          .select__control {
            background: rgba(69, 178, 107, 0.07);
          }
        }
        .third-child {
          width: 69px !important;
        }
        .fourth-child {
          width: 180px !important;
        }
        .first-child {
          width: 68px !important;
          .select__single-value {
            color: #353945;
          }
        }
        .input-text {
          margin-right: 10px;
          font-size: 14px;
        }
        .select {
          height: 34px;
        }
        .select__single-value {
          font-size: 12px;
          color: rgba(53, 57, 69, 1);
        }
        .select__option {
          color: #9757d7;
          display: inline-block;
          border-radius: 2px 12px 12px 2px;
          width: 78px;
          padding: 4px 12px 2px 4px;
          height: 27px;
          background: rgba(151, 87, 215, 0.16);
          margin-right: 8px;
        }
        .select__option--is-selected {
          background: #f4f5f6;
          color: #000;
        }
        .selectContainer {
          width: 115px;
          margin-right: 10px;
        }

        .select__input-container {
          display: none;
        }
        .select__dropdown-indicator {
          svg {
            height: 15px;
            width: 15px;
            color: rgba(53, 57, 69, 1);
          }
        }
        .select__multi-value__remove {
          display: none;
          svg {
            height: 22px;
          }
          /* &:hover{
                    background-color: #3772FF;
                    color: #DE350B;
                    color: #fff;
                    border-radius: 2px 6px 6px 2px;
                    display: block;
                } */
        }
        .css-1okebmr-indicatorSeparator {
          display: none;
        }

        .multi-select-input {
          margin-right: 0;
          width: 140px !important;
          .select__multi-value {
            &:after {
              content: "5+";
              width: 22px;
              height: 22px;
              background-color: #b1b5c4;
              border-radius: 50%;
              text-align: center;
              color: #fff;
              font-size: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              right: 5px;
            }
          }
        }
        .select__clear-indicator,
        .select__indicator-separator {
          svg,
          span {
            display: none;
          }
        }
        .select__single-value {
          padding: 0;
        }
        .select__menu {
          overflow: hidden;
          background: #f4f5f6;
          margin: 8px 0 0 0;
          width: 250px;
          padding: 12px;
          border: 1px solid rgba(230, 232, 236, 1);
        }
        .select__menu-list {
          flex-wrap: wrap;
          width: 200px;
          display: inline-flex;
        }
        .select__multi-value {
          border-radius: 2px 6px 6px 2px;
          height: 22px;
          margin: 0;
          color: #3772ff;
          background: rgba(55, 114, 255, 0.16);
          width: 78px;
          &:hover {
            .select__multi-value__remove {
              background-color: #3772ff;
              color: #de350b;
              color: #fff;
              border-radius: 2px 6px 6px 2px;
              display: block;
            }
          }
        }
        .select__value-container {
          height: 22px;
        }
        .select__control {
          padding: 4px;
          height: 34px;
          min-height: 34px;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 8px;
          background: #f4f5f6;
        }
        .select__indicator {
          padding: 0;
        }
        .select__indicators {
          height: 24px;
        }
        .select__multi-value__label {
          font-size: 12px;
          color: #3772ff;
        }
        .ui__icon__wrapper {
          height: 34px;
          width: 34px;
          background: #f4f5f6;
        }
        .icon-x-close {
          width: 20px;
          height: 20px;
          /* background: #F4F5F6; */
        }
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        color: #45b36b;
        background: rgb(69 179 107 / 7%);
      }
      &__templates {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 12px;
        border: 1px solid rgba(230, 232, 236, 1);
        border-radius: 5px;
        color: ${({ isActive }) => (isActive ? "#fff" : "#353945")};
        background: ${({ isActive }) => (isActive ? "#45B36B" : "rgba(55, 114, 255, 0.05)")};
        padding: 5px 14px;
        .ui__icon__wrapper {
          margin-right: 8px;
        }
        .icon {
          background: ${({ isActive }) => (isActive ? "#fff" : "#353945")};
          width: 18px !important;
          height: 18px !important;
        }
      }
    }
  }
`;
const FilterDialog = () => {
  const [tempOpen, setTempOpen] = useState(false);
  return (
    <StyledFilter isActive={tempOpen}>
      <FormDemo>
        <div className="filter">
          <div className="filter__header">
            <span className="filter__header__title">Active Filters</span>
            <div>
              <Button>Clear all</Button>
              <Icon icon="icon-question" />
            </div>
          </div>
          <div className="filter__body">
            <div className="input-wrapper">
              <Select2 className="first-child" colourOptions={[{ value: "1", label: "What" }]} />
              {/* <Select2 className="second-child" colourOptions={[{ "value": "2", "label": "Filter 1" }]} /> */}
              <SearchSelect
                className="second-child selectContainer"
                defaultValue={"Filter 1"}
                data={[
                  { value: "31", label: "Filter 1" },
                  { value: "41", label: "Filter 2" },
                ]}
                style={{ width: 224 }}
              />
              <SearchSelect
                searchable={false}
                className="third-child selectContainer"
                data={[
                  { value: "3", label: "Is" },
                  { value: "4", label: "Is not" },
                ]}
              />
              <div className="multi-select-wrapper" style={{ display: "flex" }}>
                <Select2
                  className="fourth-child multi-select-input"
                  colourOptions={[
                    { value: "5", label: "Devoloper" },
                    { value: "6", label: "Designer" },
                  ]}
                  isMulti
                />
                <SearchSelect
                  menuClassName={"test11"}
                  searchable={false}
                  defaultValue={"All"}
                  className="ourth-child any-all-select"
                  data={[
                    { value: "51", label: "All" },
                    { value: "61", label: "Any" },
                  ]}
                />
              </div>
              <Icon icon="icon-x-close" color="#353945" />
            </div>
            <div className="input-wrapper">
              <span className="input-text" style={{ width: "68px" }}>
                Where
              </span>
              <SearchSelect
                className="second-child selectContainer"
                defaultValue={"Filter 1"}
                data={[
                  { value: "31", label: "Filter 1" },
                  { value: "41", label: "Filter 2" },
                ]}
                style={{ width: 224 }}
              />
              <SearchSelect
                searchable={false}
                className="third-child selectContainer"
                data={[
                  { value: "3", label: "Is" },
                  { value: "4", label: "Is not" },
                ]}
              />
              {/* <Select2 className="fourth-child" colourOptions={[{ "value": "swsqqw", "label": "Devoloper" }, { "value": "swsw", "label": "Designer" }]} /> */}
              <SearchSelect
                searchable={false}
                className="fourth-child selectContainer"
                data={[
                  { value: "swsqqw", label: "Devoloper" },
                  { value: "swsw", label: "Designer" },
                ]}
              />
              <Icon icon="icon-x-close" color="#353945" />
            </div>
          </div>
          <div className="filter__footer">
            <label htmlFor="add-filter">
              <SearchSelect
                name="add-filter"
                className="second-child selectContainer"
                defaultValue={"Filter 1"}
                data={[
                  { value: "31", label: "Filter 1" },
                  { value: "41", label: "Filter 2" },
                ]}
                style={{ width: 224 }}
              />
              <Button>+ Add filter</Button>
            </label>

            <div className="filter__footer__templates" onClick={() => setTempOpen(!tempOpen)}>
              <Icon icon="icon-magic-wand" />
              Templates
            </div>
          </div>
          {tempOpen && <FilterTemplates />}
        </div>
      </FormDemo>
    </StyledFilter>
  );
};

export default FilterDialog;
