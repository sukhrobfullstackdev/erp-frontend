import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { checkTab } from "utils";
import LeadFormContainer from "../../containers/lead/addAndEditAndView";

const Style = styled.div`
  .callType {
    margin-left: 10px;
  }
  padding: 30px 38px;

  .select__header__content__placeholder {
    color: #ababab;
  }

  .form-label {
    color: rgba(53, 57, 69, 1);
    line-height: 12px;
    margin-bottom: 15px;
  }

  .collapse__title {
    background: #fcfcfd;
    border: 1px solid #f4f5f6;
    box-sizing: border-box;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;

    &:hover {
      background: #f4f5f6;
    }
  }

  .collapse {
    margin-bottom: 10px;
    transition: 0.1s;

    &.active {
      margin-top: 21px;

      .collapse__title {
        background: #353945;
        border-radius: 9px 9px 2px 2px;
        border: none;
        color: #fcfcfd;

        .ui__icon__wrapper {
          .icon {
            background: #fcfcfd;
          }
        }
      }
    }
  }

  .statusHistoryCollapse,
  .interestedCoursesHistory {
    &.active {
      .collapse__body {
        background: #f4f5f6;
        border: 1px solid #e6e8ec;
        border-radius: 0 0 10px 10px;
        border-top: 0;
        padding: 30px;

        .tableWrapper {
          max-height: 562px;
          background: #ffffff;
          box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.2);
          border-radius: 10px;
          overflow-y: auto;
          padding: 10px;
          padding-right: 5px;

          &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background: transparent;

            &-track,
            &-thumb {
              border: none;
              background: transparent;
            }

            &-button,
            &-track-piece,
            &-corner {
              display: none;
            }

            &-track {
              background: #fff;
              margin-top: 70px;
            }

            &-thumb {
              background: #e6e8ec;
              border-radius: 4px;
              background-clip: padding-box;

              &:vertical {
                border-left: 2px solid #eff1f3;
                border-right: 2px solid #eff1f3;
                box-sizing: border-box;
                border-radius: 8px;
              }

              &:hover {
                background: rgba(129, 136, 154, 1);
              }
            }
          }

          table {
            width: 100%;

            tr {
              th,
              td {
                width: 261px;

                &:first-child {
                  width: auto;
                }

                &:last-child {
                  width: 140px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const LeadFormPage = ({ location: { pathname }, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTab(dispatch, pathname, "Leads Form");
  }, []);

  return (
    <Style>
      <LeadFormContainer />
    </Style>
  );
};

export default LeadFormPage;
