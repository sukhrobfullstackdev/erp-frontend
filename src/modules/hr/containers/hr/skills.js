import React, { memo } from "react";
import styled from "styled-components";
import Collapse from "../../../../components/elements/collapse";
import { get } from "lodash";
import AddButton from "../../components/addButton";
import Field from "../../../../containers/Form/field";
import { withTranslation } from "react-i18next";

const StyledSkills = styled.div`
  .sixthCollapse {
    &.active {
      margin-bottom: 50px;
    }
  }

  .task_list {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .task {
      button {
        position: absolute;
        bottom: -70px;
        background-color: #45b26b;
        border-radius: 50%;
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        .ui__icon__wrapper {
          width: 36px;
          height: 36px;

          .icon {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }

  .box {
    display: flex;
    flex-direction: column;

    form {
      width: 311px;
    }

    label {
      padding-left: 0;
    }

    .inputContainer,
    .dateInputContainer,
    .Select__controller,
    .form-input-container {
      width: 311px;
      height: 50px;
      /* border: 1px solid #E6E8EC; */
      border-radius: 10px;

      input {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #777e91;
      }
    }

    &.box-center {
      width: 100%;
    }

    &.box-end {
      .form-input-container {
        width: 311px;
      }
    }

    .boxInside {
      padding: 0 27px 0 40px;

      form {
        label {
          width: 100%;
        }
      }
    }

    .select-privilliges {
      padding-left: 40px;
      padding-right: 27px;
      position: relative;
      width: 100%;

      .Select__controller {
        /* position: absolute;
        top: 0;
        left: 0; */
        width: 100%;
      }

      .form-body-select,
      label {
        width: 100%;
      }
    }
  }

  .boxInsideFlex {
    width: 100%;

    .boxInsideBox {
      margin-right: 27px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .box-end {
    label {
      width: 100%;
    }
  }

  .infoContainer {
    display: flex;
    justify-content: space-between;
  }

  .sixthCollapse {
    position: relative;
    margin: 0 0px 10px 0px;

    .collapse__title {
      font-size: 18px;
      line-height: 24px;
      color: #23262f;
    }

    &.active {
      border-radius: 9px;

      .collapse__title {
        border-radius: 9px 9px 2px 2px;
        background: #353945;
        color: #fcfcfd;

        &__bottom-arrow {
          .icon {
            background-color: #fcfcfd;
          }
        }
      }
    }

    .selectContainer {
      .select__control {
        width: 311px;
        height: 50px;
      }
    }
  }

  .add-doc-container {
    position: absolute;
    left: 47%;
    bottom: -20px;
    padding: 9px;
    background: #45b36b;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }

  .sixthCollapse {
    .inputContainer {
      width: 100%;
    }

    .skills {
      width: 60%;

      .box {
        display: inline-block;
        width: ${() => window.innerWidth / 6}px;
      }
    }

    .clearBtn {
      position: absolute;
      bottom: 12px;
      right: 12px;
      min-width: 70px;
      height: 28px;
      font-size: 12px;
      line-height: 18px;
    }

    .selectContainer {
      width: 100%;
    }
  }

  .radioInput {
    padding-left: 12px !important;
  }

  @media (min-width: 1450px) {
    .sixthCollapse {
      &.active {
        .collapse__body {
          padding: 40px 37px 40px 42px;
        }
      }
    }
  }
  @media (max-width: 1449px) {
    .sixthCollapse {
      .selectContainer,
      .dateInputContainer,
      .inputContainer {
        width: auto;
      }
    }

    .box {
      width: 100%;
    }
  }

  .sixthCollapse {
    .skill_title {
      margin-bottom: 14px;
      display: block;
      color: #353945;
      font-weight: 600;
      font-size: 14px;
    }

    .select {
      &__control {
        width: 100% !important;
        padding: 5px 6px;
        height: max-content !important;
      }

      &__indicators {
        .select__clear-indicator {
          height: 40px;
          left: 1739px;
          font-size: 16px;
          top: 688px;
          border-radius: 6px;
          background: #3772ff;
          color: #fff;
          padding: 8px 15px;

          svg {
            display: none;
          }

          :after {
            content: "CLear all";
          }
        }

        .select__indicator-separator {
          display: none;
        }

        .select__dropdown-indicator {
          display: none;
        }
      }

      .select__multi-value__remove {
        padding-left: 15px;

        :hover {
          background: transparent;

          svg {
            color: #fff;
          }
        }
      }

      &__multi-value {
        background: #353945;
        color: #fff;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 6px;
      }

      &__multi-value__label {
        color: #fff;
      }
    }

    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto auto auto auto;
      /* padding: 10px; */

      .grid-item {
        /* padding: 20px; */
        list-style: inside;
        font-size: 18px;
        margin-bottom: 32px;
        text-align: start;
      }
    }

    &.active {
      .collapse__body {
        padding: 40px;

        label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 14px;
        }

        .inputStyle .inputContainer {
          padding: 5px 10px;
        }

        .dateInputContainer {
          input {
            padding: 7px 11px 7px 10px;
          }
        }

        .formWrapper {
          margin-bottom: 40px;
          text-align: bottom;

          .dropdown {
            .Select__controller {
              font-weight: 500;
              font-size: 16px;
            }
          }
        }

        .check_btn {
          button {
            display: flex;
            align-items: center;
            justify-content: start;
            width: 311px;
            height: 50px;
            background-color: #fcfcfd;
            border-radius: 10px;
            padding: 13px 16px;
            color: #777e90;

            div {
              margin: 0 19px 0 0;
              width: 15px;
              height: 28px;
            }
          }
        }

        .timetable {
          padding: 60px;
          background-color: #fff;
          border-radius: 10px;
          width: 1664px;
          height: 688px;
          display: flex;
          justify-content: space-between;

          .title {
            color: #777e90;
            font-size: 20px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 40px;
          }

          .work_day {
            .days {
              width: 340px;
              height: 60px;
              background: #f4f5f6;
              border-radius: 10px;
              padding: 18px 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 14px;

              :last-child {
                margin-bottom: 0;
              }

              label {
                margin: 0;
              }

              .title {
                margin: 0;
              }

              .formWrapper {
                margin: 0;
                width: 40px;
              }

              .bwLPty .box form {
                width: 40px;
              }
            }
          }

          .work_hour {
            width: 424px;
            margin: 0 150px;
          }

          .dinner {
            width: 480px;
          }
        }
      }
    }

    .select {
      height: auto;
    }
  }
`;
const Skills = ({
  skills,
  editable = false,
  multiSelectOptions = [],
  addBtn = false,
  active = "1",
  isRequire = false,
  optionHandling,
  options,
  t,
  ...props
}) => {
  const getValueById = (id) => {
    return get(skills, "options", []).find((item) => id === item.id);
  };
  return (
    <StyledSkills>
      <Collapse title={t("skills") ?? "SKILLS"} active={active} className="sixthCollapse">
        {editable ? (
          <div>
            <Field
              type={"custom-select"}
              name={`skill.skillsIdList`}
              options={options}
              maxShowSelected={12}
              label={t("employee-skill-label") ?? "SKILL"}
              isMulti
              isClearAll
              action={get(skills, "action", {})}
              getActionValue={optionHandling}
            />
          </div>
        ) : (
          <ul className="grid-container">
            {get(skills, "values", []).map((e, index) => (
              <li key={e} className="grid-item">
                {getValueById(e)?.name}
              </li>
            ))}
          </ul>
        )}
        {addBtn && <AddButton className="" />}
      </Collapse>
    </StyledSkills>
  );
};

export default withTranslation("pdp")(memo(Skills));
