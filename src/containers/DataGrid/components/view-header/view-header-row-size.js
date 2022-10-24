import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import { isArray, isEqual } from "lodash";
import ViewIcon from "../../../../assets/images/viewIcon.png";
import Dropdown from "../../../../components/elements/dropDown/dropdown";

const Style = styled.div`
  .resizer {
    .dropDown__body {
      margin-top: 10px;

      .options {
        margin: 4px 10px 0px 5px;
        padding: 7px 10px !important;
        background-color: #fcfcfd;
        min-width: 155px;
        border-radius: 6px;
        transition: 0.3s ease;
        cursor: pointer;
        font-size: 14px;

        :hover {
          background-color: #f4f5f6;
        }

        &:first-child {
          margin-top: 10px;
        }

        &:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }
`;
const ViewHeaderRowSize = ({ t, changeRowSize = () => {}, defaultRowSize = "SMALL", ...rest }) => {
  const [rowSize, setRowSize] = useState("SMALL");
  const rowSizes = useMemo(
    () => [
      { value: "SMALL", label: t("SMALL") ?? "SMALL" },
      { value: "MEDIUM", label: t("MEDIUM") ?? "MEDIUM" },
      { value: "LARGE", label: t("LARGE") ?? "LARGE" },
      { value: "HUGE", label: t("HUGE") ?? "HUGE" },
    ],
    []
  );
  useEffect(() => {
    if (defaultRowSize) {
      setRowSize(defaultRowSize);
    }
  }, [defaultRowSize]);
  return (
    <Style {...rest}>
      <Dropdown className={"resizer"} button={<img src={ViewIcon} />}>
        {isArray(rowSizes) &&
          rowSizes.map(({ value, label }, index) => (
            <div
              onClick={() => {
                setRowSize(value);
                changeRowSize(value);
              }}
              key={index + 1}
              className={classNames("options", {
                check: isEqual(rowSize, value),
              })}
            >
              {label}
            </div>
          ))}
      </Dropdown>
    </Style>
  );
};

export default withTranslation("pdp")(memo(ViewHeaderRowSize));
