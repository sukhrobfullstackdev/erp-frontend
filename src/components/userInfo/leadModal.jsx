import { get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import Icon from "../elements/icon";
import ApiActions from "../../services/api/actions";
import { DebounceInput } from "react-debounce-input";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

const Card = styled.div`
  ${({ className }) =>
    className === "leadModal" &&
    css`
      width: 0vw;
      height: 100vh;
      z-index: 2000;
      position: fixed;
      top: -300px;
      left: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 20ms;
      background: rgba(53, 57, 69, 0.2);
      border-radius: 50%;
      .leadModal {
        &__body {
          min-width: 460px;
          background: #ffffff;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          /* box-shadow: 0px 40px 32px rgba(15, 15, 15, 0.12); */
          border-radius: 8px;
          padding: 24px;
          transition: 0.3s;
          transform: scale(0) translateY(500px);
          min-height: 298px;
        }
      }
      ${({ width }) =>
        width &&
        css`
          .leadModal {
            &__body {
              width: ${width}px;
            }
          }
        `}
      ${({ isActive }) =>
        isActive &&
        css`
          width: 100%;
          height: 100%;
          top: 0%;
          left: 0%;
          border-radius: 0%;
          transition: 0.2s;
          transform: translateY(0);
          .leadModal {
            &__body {
              transform: scale(1) translateY(-200px);
              padding: 16px;
              top: 80%;
              input {
                width: 100%;
                height: 50px;
                background: #f4f5f6;
                border-radius: 8px;
                border: none;
                outline: none;
                padding: 0 0 0 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #353945;
                font-weight: 500;
                font-size: 14px;
                line-height: 34px;
                position: relative;
                ::-webkit-search-cancel-button {
                  display: none;
                }
              }
              .icon {
                -webkit-mask-size: 100%;
                mask-size: 100%;
              }
              .icon.icon-user-check {
                width: 15px;
                background-color: #b1b5c4;
              }
              .icon-checked {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #e6e8ec;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                position: absolute;
                top: 26px;
                right: 27px;
              }

              .inputBody {
                margin-top: 16px;
                width: 428px;
                height: 200px;
                background-color: #f4f5f6;
                border-radius: 8px;
                padding: 10px;
                .numItems {
                  overflow-y: scroll;
                  height: 100%;
                  padding-right: 15px;
                  &::-webkit-scrollbar {
                    width: 7px;
                    height: 11px;
                    padding: 5px;
                  }

                  &::-webkit-scrollbar-track {
                    /* display: none; */
                    padding: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                    background: rgba(119, 126, 144, 1);
                    padding: 5px;
                    border-radius: 5px;
                    transition: 0.2s;
                  }

                  &::-webkit-scrollbar-thumb:hover {
                    background: rgba(119, 126, 144, 0.8);
                  }
                }
              }
            }
          }
          z-index: 11000;
        `}
    `}

  .green {
    color: #45b26b;
  }

  .item {
    color: #353945;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    padding: 10px 0;
    letter-spacing: 1px;
  }
  .itemContnainer {
    display: flex;
    border-bottom: 1px solid #e6e8ec;

    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .error {
    border: 1px solid red !important;
  }
`;

function LeadModal({
  getSearchLeadPhoneNumber,
  children,
  leadState,
  setLeadState,
  showLeadModal = () => {},
  searchLeadNumber,
  firstTime = false,
  setSeachField = () => {},
  action,
  onLeadClose = () => {},
  ...props
}) {
  const [value, setValue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  let reff = useRef(null);
  const checkRegEx = (action) => {
    const rg = new RegExp(leadState.numberRegex);
    if (rg && rg.test(value)) {
      history.push("/sales/sales/lead/add");
      showLeadModal();
      setLeadState((s) => ({ ...s, active: false }));
      setHasError(false);
      setValue("");
      setLeadState((s) => ({ ...s, canCreate: true }));

      if (value == leadState.searchDefaultValue?.number || leadState.searchDefaultValue?.main != true || firstTime) {
        setSeachField(true);
      } else {
        setSeachField(false);
      }
    } else {
      setHasError(true);
    }
  };
  function eventLeadFunc(e) {
    if (reff.current === e.target) if (get(leadState, "isOpenSearchModal")) onLeadClose();
    if (!get(leadState, "isOpenSearchModal")) e.stopPropagation();
  }
  useEffect(() => {
    if (get(leadState, "searchDefaultValue")?.main == true) {
      setValue(leadState.searchDefaultValue?.number);
    } else {
      setValue("");
    }
    get(leadState, "isOpenSearchModal") && document.addEventListener("click", eventLeadFunc);
    return () => document.removeEventListener("click", eventLeadFunc);
  }, [get(leadState, "isOpenSearchModal")]);

  const onChangeHandling = ({ target: { value } }) => {
    if (value.length > 0) {
      setLoader(true);
      setValue(value);
      setLeadState((s) => ({
        ...s,
        searchDefaultValue: { number: value, main: true },
      }));

      if (value.length >= 4) {
        getSearchLeadPhoneNumber({
          attributes: { phoneNumber: value, like: true },
          cb: {
            success: (res) => {
              setLoader(false);
            },
            fail: (res) => {
              setLoader(false);
            },
          },
        });
      }
    }
  };
  const handlingKye = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      checkRegEx(action);
    }
  };
  return (
    <Card className="leadModal" isActive={get(leadState, "isOpenSearchModal")} ref={reff} {...props}>
      <div className="leadModal__body">
        <DebounceInput
          minLength={4}
          debounceTimeout={1000}
          value={value}
          handlingKye={handlingKye}
          className={classNames("search_input", { error: hasError })}
          placeholder="+998 (90) 000 00 00"
          type={"search"}
          onChange={(e) => onChangeHandling(e)}
        />
        <button
          className="icon-checked"
          onClick={(e) => {
            e.preventDefault();
            checkRegEx(action);
          }}
        >
          <Icon icon="icon-user-check" />
        </button>
        <div className="inputBody">
          <div className="numItems">
            {!loader
              ? searchLeadNumber.map((item, ind) => {
                  if (item.phoneNumber.includes(value)) {
                    let index = item.phoneNumber.indexOf(value);
                    let length = item.phoneNumber.length;
                    let valL = value.length;
                    let first = item.phoneNumber.substring(0, index);
                    let last = item.phoneNumber.substring(index + valL, length);
                    return (
                      <div
                        className="itemContnainer"
                        onClick={(e) => {
                          showLeadModal();
                          setValue("");
                          setLeadState((s) => ({
                            ...s,
                            active: false,
                          }));
                          history.push(`/sales/sales/lead/edit/${item.id}`);
                        }}
                      >
                        <div className="item">
                          {first}
                          <span className="green">{value}</span>
                          {last}
                        </div>
                        <div className="name">{item.firstName}</div>
                      </div>
                    );
                  }
                  return false;
                })
              : "loading..."}
          </div>
        </div>
      </div>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    searchLeadNumber: get(state, "api.lead-part-search-number.data.result.data", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchLeadPhoneNumber: ({ attributes, formMethods, cb }, id) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          config: attributes,
          formMethods,
          cb,
          storeName: "lead-part-search-number",
          url: `sales/v1/lead/search-lead-by-part-phone-number`,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LeadModal);
