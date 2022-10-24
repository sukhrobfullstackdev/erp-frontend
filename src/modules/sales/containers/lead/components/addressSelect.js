import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Field from "../../../../../containers/Form/field";
import Icon from "../../../../../components/elements/icon";
import classNames from "classnames";
import { head, last, isArray, get } from "lodash";
const Styled = styled.div`
  .option-wraper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      padding: 10px 0;
      width: 88%;
      min-height: 60px;
    }
    &.block {
      display: block;
    }
    .ui__icon__wrapper.md {
      position: absolute;
      right: 0;
      top: 10px;
      transform: rotate(-90deg);
      &.active {
        transform: rotate(0deg);
      }
      .icon {
        width: 30px !important;
        height: 30px !important;
      }
    }
  }
`;
const AddressSelect = ({ options, label, placeholder, addressList, editable, defaultValue }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [defaultVal, setDefaultVal] = useState("");
  useEffect(() => {
    getDefaultValue(defaultValue);
  }, [defaultValue]);
  const getDefaultValue = (value) => {
    if (value?.length) {
      if (value.length == 1) {
        for (var i = 0; i < addressList.length; i++) {
          if (addressList[i].id == value[0]) {
            setDefaultVal(addressList[i].name);
          }
        }
      } else if (value.length == 2) {
        for (var i = 0; i < addressList.length; i++) {
          for (var j = 0; j < addressList[i].children.length; j++) {
            if (addressList[i].children[j].id == value[1]) {
              setDefaultVal(addressList[i].children[j].name);
            }
          }
        }
      } else if (value.length == 3) {
        for (var i = 0; i < addressList.length; i++) {
          for (var j = 0; j < addressList[i].children?.length; j++) {
            for (var k = 0; k < addressList[i].children[j].children.length; k++) {
              if (addressList[i].children[j].children[k].id == value[2]) {
                setDefaultVal(addressList[i].children[j].children[k].name);
              }
            }
          }
        }
      }
    }
  };
  const selectAdress = (address) => {
    setSelectedAddress(address);
  };
  return (
    <Styled>
      <Field
        customHeader={({ selected, placeholder, clickHeader }) => (
          <div className="select__header__content" onClick={clickHeader}>
            {defaultVal.length > 0 ? (
              defaultVal
            ) : selected?.label ? (
              selected.label
            ) : (
              <div className="select__header__content__placeholder">{placeholder}</div>
            )}
          </div>
        )}
        customOption={({ selectHandling }) => {
          return (
            <>
              {isArray(options) &&
                options.map(({ value, label, ...other }, index) => {
                  return (
                    <div className={`select__body__options__option`} key={value}>
                      <div className="content">
                        <div className="option-wraper">
                          <span
                            className="labelsmy"
                            onClick={() => {
                              setDefaultVal("");
                              selectHandling({
                                value: [value],
                                label,
                                ...other,
                              });
                            }}
                          >
                            {label}
                          </span>{" "}
                          {isArray(get(addressList[index], "children")) && (
                            <Icon
                              onClick={() => (selectedAddress[0] == label ? selectAdress([""]) : selectAdress([label]))}
                              className={classNames({
                                active: selectedAddress[0] == label,
                              })}
                              icon="icon-bottom-arrow"
                            />
                          )}
                        </div>
                        <div
                          className={classNames("region", {
                            open: selectedAddress == label || head(selectedAddress) == label,
                          })}
                        >
                          {isArray(get(addressList[index], "children")) &&
                            get(addressList[index], "children", []).map((e, i) => (
                              <div key={i} className="option-wraper block">
                                <span
                                  onClick={() => {
                                    setDefaultVal("");
                                    selectHandling({
                                      value: [value, e.id],
                                      label: e.name,
                                      ...other,
                                    });
                                  }}
                                >
                                  {e.name}
                                </span>
                                <Icon
                                  onClick={() =>
                                    selectAdress(
                                      selectedAddress.length == 1
                                        ? [...selectedAddress, e.name]
                                        : selectedAddress[1] == e.name
                                        ? [selectedAddress[0]]
                                        : [selectedAddress[0], e.name]
                                    )
                                  }
                                  className={classNames({
                                    active: selectedAddress[1] == e.name,
                                  })}
                                  icon="icon-bottom-arrow"
                                />
                                <div
                                  className={classNames("region", {
                                    open: last(selectedAddress) == e.name,
                                  })}
                                >
                                  {isArray(get(e, "children")) &&
                                    e.children.map((d, j) => (
                                      <>
                                        <span
                                          className="labelsmy"
                                          onClick={() => {
                                            setDefaultVal("");
                                            selectHandling({
                                              value: [value, e.id, d.id],
                                              label: d.name,
                                              ...other,
                                            });
                                          }}
                                          key={j}
                                        >
                                          {d.name}
                                        </span>
                                      </>
                                    ))}
                                </div>
                              </div>
                            ))}
                          <div></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          );
        }}
        name="address"
        options={options}
        label={label}
        placeholder={placeholder}
        // defaultValue={defaultValue}
        type="custom-select"
        editable={editable}
      />
    </Styled>
  );
};

export default AddressSelect;
