import { isArray } from "lodash";
import React, { useState, useEffect } from "react";
import { DefaultCustomTableStyled } from "./customTableStyles";

let temp = { dataWidth: {}, headAndBody: 0 };

const getRefValue = (e) => {
  if (e) {
    let dataIndex = e.getAttribute("data-index");
    // let width = e.clientWidth;
    let width = e.offsetWidth + 2;
    if (!temp[dataIndex]) temp[dataIndex] = width;
    if (temp[dataIndex] < width) temp[dataIndex] = width;
  }
};

const getRefValueBody = (e) => {
  if (e) {
    let className = e.getAttribute("class");
    let width = e.offsetWidth + 10;
    if (temp.headAndBody < width) temp.headAndBody = width;
    e.childNodes.forEach((value) => {
      value.childNodes.forEach((val) => {
        let dataIndex = val.getAttribute("data-index");
        let width = val.offsetWidth + 2;
        if (!temp.dataWidth[dataIndex]) temp.dataWidth[dataIndex] = width;
        if (temp.dataWidth[dataIndex] < width) temp.dataWidth[dataIndex] = width;
      });
    });
  }
};

export const TRow = ({ children, className = "", ...props }) => (
  <div className={`tr ${className}`} {...props}>
    {children}
  </div>
);

export const Column = ({ children, className = "", reff = () => {}, ...props }) => (
  <div className={`td ${className}`} ref={reff} {...props}>
    {children}
  </div>
);

export const Tbody = ({ children, className = "", reff = getRefValueBody, ...props }) => (
  <div className={`tbody ${className}`} ref={reff}>
    {children}
  </div>
);

export const Thead = ({ children, className = "", reff = getRefValueBody, ...props }) => (
  <div className={`thead ${className}`} ref={reff}>
    {children}
  </div>
);

export default function CustomTable({ children, columns = [], data = [], ...props }) {
  const [maxWidth, setMaxWidth] = useState({});
  temp = { dataWidth: {}, headAndBody: 0 };

  useEffect(() => {
    setMaxWidth(temp);
  }, []);
  return (
    <DefaultCustomTableStyled className="table" {...{ ...props, maxWidth }}>
      {isArray(columns) && columns.length > 0 && (
        <Thead reff={data.length ? null : getRefValueBody}>
          <TRow>
            {columns.map(({ title, dataIndex }, index) => (
              <Column reff={data.length ? getRefValue : null} key={`${index}${new Date().getTime()}`} data-index={dataIndex}>
                {" "}
                {title}{" "}
              </Column>
            ))}
          </TRow>
        </Thead>
      )}

      {isArray(data) && data.length > 0 && (
        <Tbody reff={data.length ? null : getRefValueBody}>
          {isArray(data) &&
            data.length > 0 &&
            data.map((value, index) => (
              <TRow key={value.key}>
                {isArray(columns) &&
                  columns.length &&
                  columns.map(({ dataIndex, key }) => (
                    <Column reff={data.length ? getRefValue : null} key={key} data-index={dataIndex}>
                      {" "}
                      {value[dataIndex]}{" "}
                    </Column>
                  ))}
              </TRow>
            ))}
        </Tbody>
      )}
      {children}
    </DefaultCustomTableStyled>
  );
}
